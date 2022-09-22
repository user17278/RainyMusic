<template>
  <div class="lyric-show" ref="lyricShow">
    <MusicCenterLyricScroll
      class="lyric-show-box"
      :data="currentLyric && currentLyric.lines"
      ref="lyricList"
    >
      <ul class="content">
        <li
          v-for="(line, index) in currentLyric.lines"
          :key="index"
          :line="line"
          ref="lyricLine"
          :class="{ current: currentLineNum === index }"
        >
          {{ line.txt }}
        </li>
      </ul>
    </MusicCenterLyricScroll>
    <div class="lyric-show-layer"></div>
  </div>
</template>

<script>
import Lyric from "lyric-parser";
import MusicCenterLyricScroll from "./MusicCenterLyricScroll.vue";
export default {
  name: "MusicCenterLyric",
  components: { MusicCenterLyricScroll },
  data() {
    return {
      // currentLyric: null,
      currentLyric: {
        lyricLine: 0,
        lines: 0,
        lrc: [],
      },
      currentLineNum: 0,
      currentSongId: null,
      playingStatus: false,
    };
  },
  methods: {
    handleLyric: function ({ lineNum, txt }) {
      if (lineNum) {
        //v-for循环，所以this.$refs.lyricLine是一个数组，从而获取相应DOM
        // let lyricEl = this.$refs.lyricLine[lineNum];
        //调用scroll组件API
        // this.$refs.lyricList.scrollToElement(lyricEl, 1000);
        let lineEl = this.$refs.lyricLine[lineNum];
        if (this.$refs.lyricList) {
          this.$nextTick(() => {
            this.$refs.lyricList.scrollToElement(lineEl, 1000);
          });
        }
      } else {
        if (this.$refs.lyricList) {
          this.$nextTick(() => {
            this.$refs.lyricList.scrollTo(0, 0, 1000);
          });
        }
      }
      this.currentLineNum = lineNum;
    },
  },
  mounted() {
    var that = this;
    this.$nextTick(() => {
      this.$bus.$on("toCurrentLyric", (lyric, songId) => {
        this.currentLyric = null; //清空原歌词
        this.currentLineNum = 0; //切歌恢复当前行
        this.currentSongId = songId;
        this.currentLyric = new Lyric(lyric, this.handleLyric);
        this.currentLyric.play();
      });
      // 点击暂停按钮暂停歌词滚动
      this.$bus.$on("getPlayingStatusToLyric", (songIsPlay) => {
        this.playingStatus = songIsPlay.playingStatus;
        if (!songIsPlay.playingStatus) {
          that.currentLyric.stop();
        } else {
          // 拖动进度条歌词同步
          that.currentLyric.seek(songIsPlay.currentTime * 1000);
        }
      });
    });
  },
  beforeDestroy() {
    this.$bus.$off("toCurrentLyric");
    this.$bus.$off("getPlayingStatusToLyric");
  },
};
</script>

<style scoped>
.lyric-show {
  display: flex;
  position: relative;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background: royalblue;
  overflow: hidden;
  transition: 0.8s cubic-bezier(0.27, -0.01, 0.34, 1);
}

.lyric-show-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
    0deg,
    rgba(65, 105, 225, 1) 20%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0) 60%,
    rgba(65, 105, 225, 1) 80%
  );
}

.lyric-show-box {
  width: 100%;
  height: 50%;
  font-size: 16px;
}

.content {
  height: 50%;
}

li {
  margin: 0px 45px;
  margin-bottom: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.357);
  font-size: 16px;
  line-height: 18px;
  transition: 0.5s;
}

.current {
  color: white;
  transform: scale(1.2);
}
</style>
