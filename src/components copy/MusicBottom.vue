<template>
  <div class="bottom">
    <MusicBottomPlayer @toControlPlayOrPause="controlPlayOrPause" @toControlVolume="controlVolume"
      :playingStatus="playingStatus" :videoUrl="videoUrl" />
    <audio :src="musicUrl" ref="audio" @pause="onPause" @play="onPlay" @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata" @ended="ended"></audio>
  </div>
</template>

<script>
import MusicBottomPlayer from "./MusicBottomPlayer.vue";
export default {
  name: "MusicBottom",
  components: { MusicBottomPlayer },
  props: ["cookie"],
  data() {
    return {
      playingStatus: false, //播放状态 true暂停 false播放
      musicUrl: null,
      nextSongUrl: null,
      musicId: null,//目前music
      mvId: null,//目前mv
      videoUrl: null,
      currentTime: null,
      isVideoPlaying: false,
    };
  },
  methods: {
    //控制播放or暂停
    controlPlayOrPause: function () {
      if (!this.isVideoPlaying) {
        // console.log(" controlPlayOrPause被执行", this.playingStatus);

        if (this.musicUrl != null) {
          //有musicUrl才可以控制播放暂停
          return this.playingStatus ? this.pause() : this.play();
        }
      }

    },
    //播放音频
    play: function () {
      this.$refs.audio.play();
    },
    // 暂停音频
    pause: function () {
      this.$refs.audio.pause();
    },
    //控制音量大小
    controlVolume: function (volumeNum) {
      this.$refs.audio.volume = volumeNum * 0.01;
    },
    // 监听是否播放
    onPlay: function () {
      this.playingStatus = true;
      this.$bus.$emit("playOrPause", this.playingStatus);
    },
    // 监听是否暂停
    onPause: function () {
      this.playingStatus = false;
      this.$bus.$emit("playOrPause", this.playingStatus);
    },
    changeCurrentTime: function (index, maxTime) {
      const formatIndex = index * 0.01 * maxTime;
      this.$refs.audio.currentTime = formatIndex;
    },
    onLoadedmetadata(res) {
      this.$bus.$emit("getPlayingMaxTime", res.target.duration);
    },
    // 播放进度
    onTimeupdate(res) {
      this.$bus.$emit("playOrPause", this.playingStatus); //播放后在添加播放状态跟随改变
      this.$bus.$emit("getPlayingCurrentTime", res.target.currentTime);
      this.currentTime = res.target.currentTime;
    },
    // 播放结束
    ended() {
      console.log(1);
      this.musicUrl = this.nextsongUrl
    }
  },
  computed: {
    // 根据 playingStatus, currentTime 判断是否在播放
    isSongPlaying() {
      const { playingStatus, currentTime } = this;
      return { playingStatus, currentTime };
    },
  },
  watch: {
    // 监听musicUrl是否发生变化
    musicUrl: {
      handler(newValue, oldValue) {
        if (newValue != oldValue) {
          //musicUrl更新才会再次获取新歌词
          var that = this
          this.$axios
            .get("https://music.cyrilstudio.top/lyric?id=" + this.musicId)
            .then((res) => {
              this.$bus.$emit(
                "toCurrentLyric",
                res.data.lrc.lyric,
                this.musicId,
                this.playingStatus
              );
              this.$axios.get("https://music.cyrilstudio.top/mv/url?id=" + this.mvId)//开始获取mv地址
                .then((res) => {
                  that.$bus.$emit('getMusicVideoUrl', res.data.data.url)
                  that.videoUrl = res.data.data.url
                  if (res.data.data.url == null) {
                    console.log('无法找到视频地址');
                  }
                })
            })
            .then(() => {
              if (!this.isVideoPlaying) this.$refs.audio.play(); //歌词显示后再播放
            });
        }
      },
    },
    // 监听音乐是否在播放
    isSongPlaying: {
      handler(newValue, oldValue) {
        this.$bus.$emit("toPlayingStatus", newValue, this.currentTime);
      },
    },
    // 监听MV是否在播放
    isVideoPlaying: {
      handler(newValue, oldValue) {
        return newValue ? this.pause() : this.play()
      }
    }
  },
  mounted() {
    this.$refs.audio.volume = 0.5; //默认音量
    this.$bus.$on("getCurrentTimeIndex", (index, maxTime) => {
      this.changeCurrentTime(index, maxTime);
    });
    this.$bus.$on("getPlayingMusicDetail", (item) => {
      this.controlPlayOrPause();
      this.musicId = item.id;
      this.mvId = item.mvid
    });
    this.$bus.$on("getPlayingMusicUrl", (item) => {
      this.musicUrl = item;
    });
    this.$bus.$on('controlVideoShow', (status) => {
      this.isVideoPlaying = status
    })
    this.$bus.$on('getNextSongId', (nextSongId) => {
      var that = this;
      //获取音乐Url
      this.$axios
        .get(
          "https://music.cyrilstudio.top/song/url?cookie=" +
          that.cookie +
          "&id=" +
          nextSongId
        )
        .then(function (res) {
          that.musicUrl = res.data.data[0].url;
        });
    })
  },
  beforeDestroy() {
    this.$bus.$off("getCurrentTimeIndex");
    this.$bus.$off("getPlayingMusicDetail");
    this.$bus.$off("getPlayingMusicUrl");
    this.$bus.$off('controlVideoShow')
    this.$bus.$off('getNextSongUrl')
  },
};
</script>

<style scoped>
.bottom {
  display: flex;
  flex: 0 0 auto;
  height: 69px;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>