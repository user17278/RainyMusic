<template>
  <div class="lyric-show" ref="lyricShow">
    <MusicCenterLyricScroll class="lyric-show-box" v-if="currentLyric" :data="currentLyric && currentLyric.lines"
      ref="lyricList">
      <ul class="content">
        <li v-for="(line, index) in currentLyric.lines" :key="index" :line="line" ref="lyricLine"
          :class="{ current: currentLineNum === index }">
          {{ line.txt }}
        </li>
      </ul>
    </MusicCenterLyricScroll>
    <div class="lyric-show-layer"></div>
  </div>
</template>

<script>
// import BScroll from "better-scroll";
import Lyric from "lyric-parser";
import MusicCenterLyricScroll from "./MusicCenterLyricScroll.vue";
// import MusicCenterLyricContent from "./MusicCenterLyricContent.vue";
export default {
  name: "MusicCenterLyric",
  components: { MusicCenterLyricScroll },
  // components: { MusicCenterLyricContent },
  data() {
    return {
      currentLyric: null,
      currentLineNum: 0,
      currentSongId: null,
    };
  },
  methods: {
    handleLyric: function ({ lineNum, txt }) {
      if (lineNum > 0) {
        //v-for循环，所以this.$refs.lyricLine是一个数组，从而获取相应DOM
        let lyricEl = this.$refs.lyricLine[lineNum];
        //调用scroll组件API
        this.$refs.lyricList.scrollToElement(lyricEl, 1000);
      } else {
        // 如果小于5，则滚动制顶部
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
      this.currentLineNum = lineNum;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$bus.$on("toCurrentLyric", (lyric, songId, playingStatus) => {
        this.currentSongId = songId;
        this.currentLyric = new Lyric(lyric, this.handleLyric);
        this.currentLyric.play();
      });
      this.$bus.$on("toPlayingStatus", (songIsPlay) => {
        if (!songIsPlay.playingStatus) {
          this.currentLyric.stop();
        } else {
          this.currentLyric.seek(songIsPlay.currentTime * 1000);
        }
      });
    });
  },
  beforeDestroy() {
    this.$bus.$off("toCurrentLyric");
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
  transition: 1s;
}

.lyric-show-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(0deg,
      rgba(65, 105, 225, 1) 20%,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0) 60%,
      rgba(65, 105, 225, 1) 80%);
  /* z-index: 9;   */
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
  margin: 20px 30px;
  text-align: center;
  color: rgb(135, 164, 253);
  font-size: 16px;
  line-height: 18px;
  transition: 0.5s;
}

.current {
  color: white;
  transform: scale(1.2);
}
</style>