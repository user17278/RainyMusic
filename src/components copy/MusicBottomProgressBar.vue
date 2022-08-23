<template>
  <div class="player-progressBar">
    <span class="current-time time">{{ currentTime | formatSecond }}</span>
    <span class="max-time time">{{ maxTime | formatSecond }}</span>
    <div
      class="player-progressBar-box"
      ref="progressBar"
      v-on:mousedown="isDown"
      v-on:mouseup="isUp"
    >
      <div
        class="player-progessBar-box-line"
        :class="isTransition ? 'onTransition' : 'offTransition'"
        :style="{ width: isTransition ? progress : progressRate + '%' }"
        v-show="currentTime"
      >
        <div
          class="player-progressBar-box-drag"
          :class="isTransition ? 'onTransition' : 'offTransition'"
          :style="{ left: isTransition ? progress : progressRate + '%' }"
          v-on:mousedown="isMove"
          v-on:mouseup="isUp"
          ref="drag"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicBottomProgressBar",
  data() {
    return {
      currentTime: 0,
      maxTime: 0,
      progressRate: null,
      dragRate: null,
      isTransition: true,
    };
  },
  methods: {
    // 按下鼠标选择进度
    isDown: function (e) {
      if (this.currentTime != 0) {
        // 获取点击处距屏幕边界距离
        const pageX = e.pageX;
        // 获取被点击元素距页面边界距离
        const progressX = this.$refs.progressBar.getBoundingClientRect().x;
        this.progressRate =
          ((pageX - progressX) / this.$refs.progressBar.clientWidth) * 100;
        if (this.progressRate <= 0) {
          this.progressRate = 0;
        } else if (this.progressRate >= 100) {
          this.progressRate = 100;
        }
      }
    },
    // 鼠标拖拽选择进度
    isMove: function (e) {
      this.isTransition = false;
      // 拖拽时不离开进度条

      this.$refs.progressBar.onmousemove = (e) => {
        // 拖拽时中途离开
        this.$refs.progressBar.onmouseleave = () => {
          this.progressRate = (this.currentTime / this.maxTime) * 100;
          // 中途离开后鼠标抬起，取消拖拽，恢复原来进度
          document.onmouseup = () => {
            this.isTransition = true;
            document.onmouseup = null;
          };
          this.$refs.progressBar.onmouseleave = null;
        };

        //拖拽没离开时进度条
        this.progressRate =
          ((e.pageX - this.$refs.progressBar.getBoundingClientRect().x) /
            this.$refs.progressBar.clientWidth) *
          100;
        if (this.progressRate <= 0) {
          this.progressRate = 0;
        } else if (this.progressRate >= 100) {
          this.progressRate = 100;
        }
      };
    },

    // 松开鼠标开始跳转到对应进度
    isUp: function () {
      this.isTransition = true;
      this.$refs.progressBar.onmousemove = this.$refs.progressBar.onmousedown =
        null;
      this.$bus.$emit("getCurrentTimeIndex", this.progressRate, this.maxTime);
    },
  },
  computed: {
    progress: {
      get() {
        const progressWidth = (this.currentTime / this.maxTime) * 100;
        return progressWidth + "%";
      },
    },
  },
  filters: {
    formatSecond(second = 0) {
      return realFormatSecond(second);
    },
  },
  mounted() {
    this.$bus.$on("getPlayingMaxTime", (maxTime) => {
      this.maxTime = maxTime;
    });
    this.$bus.$on("getPlayingCurrentTime", (currentTime) => {
      this.currentTime = currentTime;
    });
  },
  beforeDestroy() {
    this.$bus.$off("getPlayingMaxTime");
    this.$bus.$off("getPlayingCurrentTime");
  },
};
function realFormatSecond(second) {
  var secondType = typeof second;
  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);
    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mintues = Math.floor(second / 60);
    second = second - mintues * 60;
    return ("0" + mintues).slice(-2) + ":" + ("0" + second).slice(-2);
  } else {
    return "00:00";
  }
}
</script>

<style  scoped lang="scss">
.onTransition {
  transition: 0.5s;
}
.offTransition {
  transition: 0s;
}
.player-progressBar {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1.5;
  .time {
    position: absolute;
    margin-top: 50px;
    color: #d6d6d6;
    font-size: 16px;
  }
  .player-progressBar-box {
    position: relative;
    width: 96%;
    height: 30px;
    border: solid 0.3px #d6d6d6;
    border-radius: 12px;
    overflow: hidden;
    .player-progessBar-box-line {
      width: 0%;
      height: 30px;
      background-color: royalblue;
      .player-progressBar-box-drag {
        position: absolute;
        margin-left: -2px;
        left: 0%;
        width: 2px;
        height: 30px;
        box-shadow: 0px 0px 0px 0.5px #d6d6d6;
        background-color: white;
        user-select: none;
        &:active {
          background-color: #d6d6d6;
        }
      }
    }
  }
  .player-progressBar-box:hover .player-progressBar-box-drag {
    transform: scale(3);
  }
}
.current-time {
  left: 2%;
}
.max-time {
  right: 2%;
}
</style>