<template>
  <div class="player">
    <div class="player-btn">
      <div class="player-btn-box">
        <input
          type="checkbox"
          id="back-btn"
          :checked="playingStatus"
          v-on:click="backSong"
        />
        <label for="back-btn">
          <div class="back-btn">
            <div class="back-btn-left4"></div>
            <div class="back-btn-left3"></div>
            <div class="back-btn-left2"></div>
            <div class="back-btn-left1"></div>
            <div class="back-btn-right"></div>
          </div>
        </label>
      </div>
      <div class="player-btn-box">
        <input
          type="checkbox"
          id="toggler"
          ref="playCheck"
          :checked="playingStatus"
          v-on:click="sendToControlPlayOrPause"
          :disabled="!this.nextSongList.length"
        />
        <label for="toggler">
          <div class="play-btn">
            <div class="sideLeft"></div>
            <div class="sideRight1"></div>
            <div class="sideRight2"></div>
          </div>
        </label>
      </div>
      <div class="player-btn-box">
        <input
          type="checkbox"
          id="next-btn"
          :checked="playingStatus"
          v-on:click="nextSong"
        />
        <label for="next-btn">
          <div class="next-btn">
            <div class="next-btn-right1"></div>
            <div class="next-btn-right2"></div>
            <div class="next-btn-right3"></div>
            <div class="next-btn-right4"></div>
            <div class="next-btn-left"></div>
          </div>
        </label>
      </div>
      <div class="player-btn-box">
        <i
          :class="[
            { 'fa fa-volume-off': volumeProgress == 0 },
            {
              'fa fa-volume-down': volumeProgress <= 50 && volumeProgress != 0,
            },
            { 'fa fa-volume-up': volumeProgress > 50 },
          ]"
          aria-hidden="true"
          v-on:click="showVolumeBar"
        ></i>
        <div
          class="volume-bar-num"
          :class="{ 'volume-bar-num-hide': isShowVolumeBar == 2 }"
          ref="volumeBarNum"
        >
          {{ volumeProgress }}
        </div>
      </div>
    </div>
    <MusicBottomProgressBar />
    <div class="player-btn">
      <div class="player-btn-box" id="next-song-list-box">
        <i
          class="fa fa-th-list"
          aria-hidden="true"
          v-on:click="nextSongListShow"
        ></i>
        <div
          class="next-song-list-num"
          v-show="nextSongList.length && nextSongList.length <= 2"
        >
          {{ nextSongList.length }}
        </div>
        <div
          class="next-song-list-num-more"
          v-show="nextSongList.length && nextSongList.length > 2"
        >
          99+
        </div>
      </div>
      <div class="player-btn-box" id="mv-box">
        <i
          class="fa fa-film"
          aria-hidden="true"
          v-on:click="getMv"
          v-show="this.videoUrl"
        ></i>
      </div>
      <div class="player-btn-box" id="unused-box">
        <!-- <i class="fa fa-stack-exchange" aria-hidden="true"></i> -->
      </div>
      <div class="player-btn-box" id="lyric-box">
        <!-- <i class="fa fa-stack-exchange" aria-hidden="true"></i> -->
      </div>
    </div>
    <div
      class="next-song-list-mask"
      v-on:click.self="clickOtherAreaNextSongListHide"
      ref="nextSongListMask"
    ></div>
    <div
      class="next-song-list"
      :class="[
        isShowNextSongList == 1 ? 'next-song-list-show' : '',
        isShowNextSongList == 2 ? 'next-song-list-hide' : '',
      ]"
    >
      <div class="next-song-list-trash">
        <i
          class="fa fa-trash-o"
          aria-hidden="true"
          v-on:click="trashAllSong"
        ></i>
      </div>
      <ul>
        <MusicBottomPlayerList
          v-for="item in this.nextSongList"
          :key="item.id"
          :item="item"
          :nextSongIdWhenPlaying="nextSongIdWhenPlaying"
        />
      </ul>
    </div>
    <div
      class="volume-bar-mask"
      v-on:click.self="clickOtherAreaVolumeHide"
      ref="volumeBarMask"
    ></div>
    <div
      class="volume-bar"
      :class="[
        isShowVolumeBar == 1 ? 'volume-bar-show' : '',
        isShowVolumeBar == 2 ? 'volume-bar-hide' : '',
      ]"
      ref="volumeBar"
      v-on:mouseenter="showVolumeNum"
      v-on:mousedown="volumeBarDown"
    >
      <div
        class="volume-bar-line"
        :class="isTransition ? 'ontransistion' : 'offtransistion'"
        :style="{ width: volumeProgress + '%' }"
      ></div>
      <div
        class="volume-bar-drag"
        :class="isTransition ? 'ontransistion' : 'offtransistion'"
        :style="{ left: volumeProgress + '%' }"
        v-on:mousedown.stop="readyToDrag"
      ></div>
    </div>
  </div>
</template>

<script>
import MusicBottomProgressBar from "./MusicBottomProgressBar.vue";
import MusicBottomPlayerList from "./MusicBottomPlayerList.vue";
export default {
  name: "MusicBottomPlayer",
  components: { MusicBottomProgressBar, MusicBottomPlayerList },
  props: ["musicUrl", "playingStatus", "videoUrl"],
  data() {
    return {
      isTransition: true, //拖拽按钮是否延迟
      volumeProgress: 10, //音量条位置,
      isShowVolumeBar: 0,
      isShowVolumeNum: false,
      numShowTimer: null,
      videoIsPlaying: false, //false没播放 true播放中
      nextSongList: [], //播放列表数组
      isPlayingId: null, //正在播放歌曲的Id
      favStatus: true,
      playingSongIndex: null,
      nextSongIdWhenPlaying: null, //点击下一首歌曲后的Id
      isShowNextSongList: 0,
    };
  },
  methods: {
    // 上一首歌曲
    backSong: function () {
      this.playingSongIndex = this.nextSongList.findIndex((item) => {
        return item.id == this.isPlayingId;
      });
      if (
        this.nextSongList.length != 1 &&
        this.playingSongIndex < this.nextSongList.length - 1
      ) {
        this.nextSongList.unshift(
          this.nextSongList.splice(this.playingSongIndex + 1, 1)[0]
        );
      } else {
        this.nextSongList.unshift(
          this.nextSongList.splice(
            this.playingSongIndex - this.nextSongList.length,
            1
          )[0]
        );
        this.isPlayingId = this.nextSongList[this.playingSongIndex].id; //最后一首歌返回到第一首循环
      }
    },
    // 下一首歌曲
    nextSong: function () {
      this.playingSongIndex = this.nextSongList.findIndex((item) => {
        return item.id == this.isPlayingId;
      });
      if (
        this.nextSongList.length != 1 &&
        this.playingSongIndex < this.nextSongList.length - 1
      ) {
        this.nextSongList.unshift(
          this.nextSongList.splice(this.nextSongList.length - 1, 1)[0]
        );
      } else {
        this.nextSongList.unshift(
          this.nextSongList.splice(
            this.playingSongIndex - this.nextSongList.length,
            1
          )[0]
        );
        this.isPlayingId = this.nextSongList[this.playingSongIndex].id; //最后一首歌返回到第一首循环
      }
    },
    nextSongListShow: function () {
      if (this.isShowNextSongList == 0) {
        this.isShowNextSongList = 1;
        this.$refs.nextSongListMask.style.display = "block";
      } else if (this.isShowNextSongList == 1) {
        this.isShowNextSongList = 2;
        this.$refs.nextSongListMask.style.display = "none";
      } else if (this.isShowNextSongList == 2) {
        this.isShowNextSongList = 1;
        this.$refs.nextSongListMask.style.display = "block";
      }
    },
    sendToControlPlayOrPause: function () {
      if (this.nextSongList) {
        this.$emit("toControlPlayOrPause");
      }
    },
    showVolumeNum: function () {
      this.isShowVolumeNum = true;
      this.$refs.volumeBar.onmouseleave = () => {
        this.isShowVolumeNum = false;
      };
    },
    volumeBarDown: function (e) {
      //点击音量框
      this.isTransition = true;
      // 获取点击处距屏幕边界距离
      const pageY = e.pageY;
      // 获取被点击元素距页面边界距离
      const volumeBarY = this.$refs.volumeBar.getBoundingClientRect().y;
      this.volumeProgress = Math.ceil(
        100 - ((pageY - volumeBarY) / this.$refs.volumeBar.clientWidth) * 100
      );
      if (this.volumeProgress <= 0) {
        this.volumeProgress = 0;
      } else if (this.volumeProgress >= 100) {
        this.volumeProgress = 100;
      }
      // 控制音量
      this.$emit("toControlVolume", this.volumeProgress);
    },
    readyToDrag: function () {
      this.isTransition = false;
      this.$refs.volumeBar.onmousemove = (e) => {
        // 获取点击处距屏幕边界距离
        const pageY = e.pageY;
        // 获取被点击元素距页面边界距离
        const volumeBarY = this.$refs.volumeBar.getBoundingClientRect().y;
        this.volumeProgress = Math.ceil(
          100 - ((pageY - volumeBarY) / this.$refs.volumeBar.clientWidth) * 100
        );
        if (this.volumeProgress <= 0) {
          this.volumeProgress = 0;
        } else if (this.volumeProgress >= 100) {
          this.volumeProgress = 100;
        }
        // 控制音量
        this.$emit("toControlVolume", this.volumeProgress);
        document.onmouseup = (e) => {
          this.isTransition = true;
          this.$refs.volumeBar.onmousemove = null;
          // 移出音量框
          this.$refs.volumeBar.onmouseleave = () => {
            this.isShowVolumeNum = false;
          };
        };
        this.$refs.volumeBar.onmouseleave = () => {
          this.$refs.volumeBar.onmousemove = null;
        };
      };
    },
    showVolumeBar: function () {
      if (this.isShowVolumeBar == 0) {
        this.isShowVolumeBar = 1;
        this.$refs.volumeBarMask.style.display = "block";
      } else if (this.isShowVolumeBar == 1) {
        this.isShowVolumeBar = 2;
        this.$refs.volumeBarMask.style.display = "none";
      } else if (this.isShowVolumeBar == 2) {
        this.isShowVolumeBar = 1;
        this.$refs.volumeBarMask.style.display = "block";
      }
    },
    clickOtherAreaVolumeHide: function () {
      this.isShowVolumeBar = 2;
      this.$refs.volumeBarMask.style.display = "none";
    },
    clickOtherAreaNextSongListHide: function () {
      this.isShowNextSongList = 2;
      this.$refs.nextSongListMask.style.display = "none";
    },
    getMv: function () {
      this.videoIsPlaying = !this.videoIsPlaying;
      this.$bus.$emit("videoBtnClick"); //点击收回Fav栏
      this.$bus.$emit("controlVideoShow", this.videoIsPlaying); //控制video是否显示
    },
    trashAllSong: function () {
      this.nextSongList = [];
    },
  },
  watch: {
    isShowVolumeNum: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.$refs.volumeBarNum.style.opacity = 1;
        } else {
          this.$refs.volumeBarNum.style.opacity = 0;
        }
      },
    },
  },
  created() {
    document.onkeyup = (e) => {
      if (e.key == " " || e.code == "Space") {
        this.sendToControlPlayOrPause();
      }
    };
  },
  mounted() {
    // 从Top获取id后，获取歌曲详细，将图片歌名添加
    this.$bus.$on("getPlayingMusicId", (id) => {
      this.isPlayingId = id;
      var that = this;
      const index = this.nextSongList.findIndex((nextSongListItem) => {
        return nextSongListItem.id == id;
      });
      that.$axios
        .get("https://music.cyrilstudio.top/song/detail?ids=" + id)
        // 歌曲详细，添加到nextSongList数组中
        .then(function (res) {
          if (index == -1) {
            that.nextSongList.unshift(res.data.songs[0]);
          } else {
            that.nextSongList.unshift(that.nextSongList.splice(index, 1)[0]); //阻止添加导致出现重复歌曲
          }
        });
      this.$bus.$on("removeSongFromNextSongPlayerList", (id) => {
        this.nextSongList = this.nextSongList.filter((nextSongList) => {
          return nextSongList.id !== id;
        });
      });
    });
    // 下一首歌曲
    this.$bus.$on("addNextSongReadyToPlay", (id) => {
      var that = this;
      const index = this.nextSongList.findIndex((nextSongListItem) => {
        return nextSongListItem.id == id;
      });
      that.$axios
        .get("https://music.cyrilstudio.top/song/detail?ids=" + id)
        // 歌曲详细，添加到nextSongList数组中
        .then(function (res) {
          if (index == -1) {
            that.nextSongList.push(res.data.songs[0]);
          } else {
            that.nextSongList.push(that.nextSongList.splice(index, 1)[0]); //阻止添加导致出现重复歌曲
          }
        });
    });
  },
  beforeUpdate() {
    if (this.nextSongList.length) {
      const url =
        "https://music.163.com/song/media/outer/url?id=" +
        this.nextSongList[0].id +
        ".mp3";
      this.nextSongIdWhenPlaying = this.nextSongList[0].id; //点击下一首歌曲后的Id
      this.$bus.$emit("nextSongIdWhenPlaying", this.nextSongList[0].id); //判断播放状态修改播放按钮样式
      this.$bus.$emit("getPlayingMusicDetailToCenter", this.nextSongList[0]); //添加新的播放，MusicCenter组件中间内容同步
      this.$bus.$emit(
        "getPlayingMusicUrlToBottom",
        url,
        this.nextSongList[0].id
      ); //添加新的播放，MusicBottom组件audio正在播放的url同步
      this.$bus.$emit("changeLyric", this.playingStatus);
    } else {
      this.nextSongList = [
        {
          name: "-- -- -- -- -- -- -- -- --",
          ar: [{ name: "-- -- -- -- -- --" }],
          al: "",
        },
      ];
      this.$bus.$emit("getPlayingMusicDetailToCenter", this.nextSongList[0]); //添加新的播放，MusicCenter组件中间内容同步
      this.$bus.$emit("getPlayingMusicUrlToBottom", "", ""); //添加新的播放，MusicBottom组件audio正在播放的url同步
      this.$bus.$emit("getPlayingMaxTime", 0);
      this.nextSongList = [];
    }
  },
};
</script>

<style lang="scss" scoped src="../assets/css/playbtn.scss"></style>
<style lang="scss" scoped src="../assets/css/nextsonglist.scss"></style>
<style lang="scss" scoped src="../assets/css/nextbtn.scss"></style>
<style scoped lang="scss">
input {
  display: none;
}

label {
  margin: 0 auto;
}

.next-song-list-mask {
  content: "";
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: -100vh;
  display: none;
}
</style>
