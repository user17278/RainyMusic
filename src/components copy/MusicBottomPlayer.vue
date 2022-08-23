<template>
  <div class="player">
    <div class="player-btn">
      <div class="player-btn-box">
        <i class="fa fa-step-backward" aria-hidden="true"></i>
      </div>
      <div class="player-btn-box">
        <!-- <i :class="playingStatus ? 'fa fa-pause' : 'fa fa-play'" aria-hidden="true"
          @click="sendToControlPlayOrPause"></i> -->
        <input type="checkbox" id="toggler" :checked="playingStatus" ref="btnCheck"
          v-on:click="sendToControlPlayOrPause">
        <label for="toggler">
          <div class='play-btn'>
            <span class="sideLeft"></span>
            <span class='sideRight'>
              <span class="sideRight1"></span>
              <span class="sideRight2"></span>
            </span>
          </div>
        </label>
      </div>
      <div class="player-btn-box">
        <i class="fa fa-step-forward" aria-hidden="true" v-on:click="nextSong"></i>
      </div>
      <div class="player-btn-box">
        <i class="fa fa-volume-up" aria-hidden="true" v-on:click="showVolumeBar"></i>
        <div class="volume-bar-num" :class="{ 'volume-bar-num-hide': isShowVolumeBar == 2 }" ref="volumeBarNum">
          {{ volumeProgress }}
        </div>
      </div>
    </div>
    <MusicBottomProgressBar />
    <div class="player-btn">
      <div class="player-btn-box" id="random-box">
        <i class="fa fa-th-list" aria-hidden="true"></i>
      </div>
      <div class="player-btn-box" id="mv-box">
        <i class="fa fa-film" aria-hidden="true" v-on:click="getMv" v-show="this.videoUrl"></i>
      </div>
      <div class="player-btn-box" id="unused-box">
        <!-- <i class="fa fa-stack-exchange" aria-hidden="true"></i> -->
      </div>
      <div class="player-btn-box" id="lyric-box">
        <i class="fa fa-stack-exchange" aria-hidden="true"></i>
      </div>
    </div>
    <div class="next-song-list">
      <div class="next-song-list-trash"><i class="fa fa-trash-o" aria-hidden="true"> 清空</i></div>
      <ul>
        <li v-for="item in this.nextSongList" :key="item.id" :item="item">
          <div class="next-song-list-box">
            <img :src="item.picUrl" alt="封面" />
            <div class="next-song-list-detail">
              <div class="next-song-list-detail-musicName">{{ item.name }}</div>
              <div class="next-song-list-detail-musicAuthor">{{ item.artists[0].name }}</div>
            </div>
            <div class="control-btn">
              <div class="remove">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </div>
              <div>
                <span class="add-fav">
                  <i class="fa fa-heart-o" aria-hidden="true" v-on:click="favMusic(item)"></i>
                </span>
                <span class="play-now">
                  <i class="fa fa-play" :class="[
                    isPlayId == item.id && playingStatus
                      ? 'fa fa-pause'
                      : 'fa fa-play',
                  ]" aria-hidden="true" v-on:click="playMusic(item.id)"></i>
                </span>
              </div>

            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="volume-bar-mask" v-on:click.self="clickOtherAreaVolumeHide" ref="volumeBarMask"></div>
    <div class="volume-bar" :class="[
      isShowVolumeBar == 1 ? 'volume-bar-show' : '',
      isShowVolumeBar == 2 ? 'volume-bar-hide' : '',
    ]" ref="volumeBar" v-on:mousedown="volumeBarDown">
      <div class="volume-bar-line" :class="isTransition ? 'ontransistion' : 'offtransistion'"
        :style="{ width: volumeProgress + '%' }"></div>
      <div class="volume-bar-drag" :class="isTransition ? 'ontransistion' : 'offtransistion'"
        :style="{ left: volumeProgress + '%' }" v-on:mousedown.stop="readyToDrag"></div>
    </div>


  </div>

</template>

<script>
import MusicBottomProgressBar from "./MusicBottomProgressBar.vue";
export default {
  name: "MusicBottomPlayer",
  components: { MusicBottomProgressBar },
  props: ["musicUrl", "playingStatus", 'videoUrl'],
  data() {
    return {
      isTransition: true, //拖拽按钮是否延迟
      isPlaying: false,
      volumeProgress: 50, //音量条位置
      isShowVolumeBar: 0,
      showVolumeNum: false,
      numShowTimer: null,
      videoIsPlaying: false,//false没播放 true播放中
      nextSongList: [],//播放列表数组
      isPlayId: null,//正在播放歌曲的Id
      favStatus: true,
      playingSongIndex: null,
    };
  },
  methods: {
    nextSong: function () {
      this.playingSongIndex = this.nextSongList.findIndex((item) => {
        return item.id == this.isPlayId
      })
      console.log('当前播放第', this.playingSongIndex, '+ 2首');
      // console.log('共有', this.nextSongList.length);
      if (this.nextSongList.length != 1 && this.playingSongIndex < this.nextSongList.length - 1) {
        console.log('前', this.playingSongIndex);
        this.$bus.$emit('getNextSongId', this.nextSongList[(this.playingSongIndex + 1) % this.nextSongList.length].id)//下一首
        this.nextSongList.unshift(this.nextSongList.splice(this.playingSongIndex + 1, 1)[0])//阻止添加导致出现重复歌曲z
        console.log('后', this.playingSongIndex);
      } else if (this.nextSongList.length == 1) {
        console.log('无法下一首');
      }
      if (this.playingSongIndex == 2) {
        this.playingSongIndex = 0
        console.log('执行');
      }
    },
    sendToControlPlayOrPause: function () {
      if (!this.musicUrl) {
        this.isPlaying = !this.isPlaying; //图标切换
      }
      this.$emit("toControlPlayOrPause");
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
      this.$emit("toControlVolume", this.volumeProgress);
      clearTimeout(this.numShowTimer);
      this.numShowTimer = setTimeout(() => {
        this.$refs.volumeBarNum.style.opacity = 0;
      }, 5000);//音量数字消失
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

        document.onmouseup = (e) => {
          this.isTransition = true;
          this.$refs.volumeBar.onmousemove = null;
          clearTimeout(this.numShowTimer);
          this.numShowTimer = setTimeout(() => {
            this.$refs.volumeBarNum.style.opacity = 0;
          }, 5000);//音量数字消失
        };
        this.$refs.volumeBar.onmouseleave = () => {
          this.$refs.volumeBar.onmousemove = null;
        };
      };
    },
    showVolumeBar: function () {
      if (this.isShowVolumeBar == 0) {
        this.isShowVolumeBar = 1;
        this.$refs.volumeBarMask.style.display = 'block'
      } else if (this.isShowVolumeBar == 1) {
        this.isShowVolumeBar = 2;
        this.$refs.volumeBarMask.style.display = 'none'
      } else if (this.isShowVolumeBar == 2) {
        this.isShowVolumeBar = 1;
        this.$refs.volumeBarMask.style.display = 'block'
      }
    },
    clickOtherAreaVolumeHide: function (e) {
      this.isShowVolumeBar = 2;
      this.$refs.volumeBarMask.style.display = 'none'
    },
    getMv: function () {
      this.videoIsPlaying = !this.videoIsPlaying
      this.$bus.$emit('videoBtnClick');//点击收回Fav栏
      this.$bus.$emit('controlVideoShow', this.videoIsPlaying)//控制video是否显示
    },
    playMusic(id) {
      this.$bus.$emit("toPlayListId", id); //判断样式
      this.$bus.$emit("getPlayingMusicDetail", this.favSongItem);
    },
    //收藏当前音乐
    favMusic(item) {
      if (this.favStatus) {
        this.$bus.$emit("getFavMusicDetail", item, this.favStatus); //收藏
        this.favStatus = false;
        console.log("添加");
      } else {
        this.$bus.$emit("getFavMusicDetail", item, this.favStatus); //取消收藏
        this.favStatus = true;
      }
    },
  },
  watch: {
    volumeProgress: {
      handler(newValue, oldValue) {
        this.$refs.volumeBarNum.style.opacity = 1;
      },
    },
  },
  mounted() {
    //添加到播放列表
    this.$bus.$on("getPlayingMusicDetail", (item) => {
      const index = this.nextSongList.findIndex(nextSongListItem => {
        return nextSongListItem.id == item.id
      })
      if (index == -1) {
        this.nextSongList.unshift(item)
      } else {
        this.nextSongList.unshift(this.nextSongList.splice(index, 1)[0])//阻止添加导致出现重复歌曲
      }



    });
    this.$bus.$on("toPlayListId", (id) => {
      this.isPlayId = id;
      // console.log('正在播放Id', this.isPlayId);
    });

  },
};
</script>

<style scoped lang='scss'>
#toggler {
  display: none;
}

label {
  margin: 0 auto;
}

.play-btn {
  display: block;
  width: 26px;
  height: 20px;
  text-align: center;
  margin: 0 auto;
  transform: rotate(-90deg);
  cursor: pointer;
  transition: .3s;

}


.play-btn:hover {
  transform: scale(1.2) rotate(-90deg);
}


.play-btn .sideLeft {
  display: block;
  height: 5px;
  background-color: #d6d6d6;
  position: relative;
  top: 0px;
  border-radius: 5px;
  animation: sideLeftBack .5s forwards;

}

.play-btn .sideRight {
  display: block;
  position: relative;
}

.play-btn .sideRight span {
  position: relative;
  border-radius: 5px;
  width: 26px;
  height: 5px;
  top: 0px;
  background-color: #d6d6d6;

}

.play-btn .sideRight span:nth-child(1) {
  position: absolute;
  top: 6px;
  left: 6px;
  transform: rotate(-60deg);
  animation: sideRightBack1 .5s forwards;

}

.play-btn .sideRight span:nth-child(2) {
  position: absolute;
  top: 6px;
  right: 6px;
  transform: rotate(60deg);
  animation: sideRightBack2 .5s forwards;

}

//开始播放
#toggler:checked+label .play-btn .sideLeft {
  // top: 11px;
  animation: sideLeftMove .5s forwards;

}

#toggler:checked+label .play-btn .sideRight span:nth-child(1) {
  // top: -6px;
  // left: 0px;
  // transform: rotate(0deg);
  animation: sideRightMove1 .5s forwards;
}

#toggler:checked+label .play-btn .sideRight span:nth-child(2) {
  // top: -6px;
  // right: 0px;
  // transform: rotate(0deg);
  animation: sideRightMove2 .5s forwards;
}

@keyframes sideLeftBack {

  0% {
    top: 11px
  }

  100% {
    top: 0px;
  }
}

@keyframes sideLeftMove {

  0% {
    top: 0px
  }

  100% {
    top: 11px;
  }
}

@keyframes sideRightBack1 {
  0% {
    top: -6px;
    left: 0px;
    transform: rotate(0deg)
  }

  50% {
    left: 15px;
    transform: rotate(90deg)
  }

  100% {
    top: 6px;
    left: 6px;
    transform: rotate(120deg)
  }
}

@keyframes sideRightBack2 {
  0% {
    top: -6px;
    right: 0px;
    transform: rotate(0deg)
  }

  50% {
    right: 15px;
    transform: rotate(-90deg)
  }

  100% {
    top: 6px;
    right: 6px;
    transform: rotate(-120deg)
  }
}

@keyframes sideRightMove1 {

  0% {
    top: 6px;
    left: 6px;
    transform: rotate(120deg)
  }

  50% {
    left: 15px;
    transform: rotate(90deg)
  }

  100% {
    top: -6px;
    left: 0px;
    transform: rotate(0deg)
  }
}

@keyframes sideRightMove2 {

  0% {
    top: 6px;
    right: 6px;
    transform: rotate(-120deg)
  }

  50% {
    right: 15px;
    transform: rotate(-90deg)
  }

  100% {
    top: -6px;
    right: 0px;
    transform: rotate(0deg)
  }
}

.volume-bar-mask {
  content: '';
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: -100vh;
  display: none;
}

.ontransistion {
  transition: 0.5s;
}

.offtransistion {
  transition: 0s;
}

.player {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 69px;

  .player-btn {
    display: flex;
    flex-direction: row;
    flex: 1;
    position: relative;
    z-index: 1;

    .player-btn-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      position: relative;
      text-align: center;
      box-sizing: border-box;
      background-color: white;

      .volume-bar-num {
        position: absolute;
        left: 50%;
        bottom: 266px;
        transform: translate(-50%);
        color: white;
        user-select: none;
        transition: 0.3s;
        opacity: 0;
      }
    }

    i {

      color: #d6d6d6;
      font-size: 26px;
    }

    i:before {
      cursor: pointer;
    }
  }

  .volume-bar {
    position: absolute;
    left: 25%;
    transform: translate(-50%) rotate(270deg);
    border: solid 0.3px #d6d6d6;
    border-radius: 16px;
    background-color: white;
    overflow: hidden;
    bottom: 35px;

    .volume-bar-line {
      width: 20px;
      height: 100%;
      background-color: royalblue;
    }

    .volume-bar-drag {
      position: absolute;
      top: 0;
      width: 2px;
      height: 40px;
      left: 20px;
      box-shadow: 0px 0px 0px 0.5px #d6d6d6;
      background-color: white;
      cursor: pointer;

      &:active {
        background-color: #d6d6d6;
      }
    }
  }



  .volume-bar-show {
    animation: volumeShow 1s cubic-bezier(0, 1.63, 0.74, 1.49) forwards;
  }

  .volume-bar-hide {
    animation: volumeHide 1s cubic-bezier(0, 1.63, 0.74, 1.49) forwards;
  }

  .volume-bar-num-hide {
    animation: volumeNumHide 1s cubic-bezier(0, 1.63, 0.74, 1.49) forwards;
  }

  .volume-bar:hover .volume-bar-drag {
    transform: scaleX(5);
  }
}

@keyframes volumeShow {

  0%,
  100% {
    height: 40px;
  }

  0% {
    bottom: 30px;
    width: 180px;
    transform: translate(-50%) rotate(270deg) scaleX(0);
  }

  25% {
    bottom: 200px;
    width: 180px;
    transform: translate(-50%) rotate(270deg) scaleX(1);
  }

  50% {
    bottom: 150px;
    width: 170px;
    transform: translate(-50%) rotate(270deg) scaleX(1);
  }

  70% {
    bottom: 160px;
    transform: translate(-50%) rotate(270deg) scaleX(1);
    width: 180px;
  }

  90%,
  100% {
    bottom: 150px;
    width: 180px;
    transform: translate(-50%) rotate(270deg) scaleX(1);
  }
}

@keyframes volumeHide {

  0%,
  100% {
    width: 180px;
    height: 40px;
  }

  0% {
    bottom: 150px;
    transform: translate(-50%) rotate(270deg) scale(1);
  }

  50% {
    bottom: 150px;
    height: 20px;
    transform: translate(-50%) rotate(270deg) scale(1);
  }

  55% {
    height: 20px;
    transform: translate(-50%) rotate(270deg) scale(0);
  }

  100% {
    bottom: 30px;
    height: 0px;
    transform: translate(-50%) rotate(270deg) scale(0);
  }
}

@keyframes volumeNumHide {

  0% {
    bottom: 266px;
  }

  20% {
    bottom: 270px;
  }

  50% {
    bottom: 270px;
  }

  100% {
    bottom: 0px;
  }
}

.next-song-list {
  position: absolute;
  bottom: 80px;
  left: 73%;
  width: 300px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  overflow: auto;
  scrollbar-width: none; //Firefox 
  -ms-overflow-style: none; // IE 10+

  .next-song-list-trash {
    text-align: right;
    margin-right: 20px;

    i {
      cursor: pointer;
      font-size: 16px;
      color: #d6d6d6;
    }
  }
}

::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}

.next-song-list-box {
  display: flex;
  align-items: flex-start;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: royalblue;


  img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
  }

  .next-song-list-detail {
    flex: 1;
    margin: 0 10px;

    .next-song-list-detail-musicName {
      margin-bottom: 5px;
      font-size: 16px;
      color: white;
    }

    .next-song-list-detail-musicAuthor {
      font-size: 12px;
      color: white;
    }
  }

  .control-btn {
    display: flex;
    flex-direction: column;
    color: white;
    text-align: right;

    .remove {
      width: 60px;

      i {
        font-size: 18px;
        cursor: pointer;
      }
    }

    div:nth-child(2) {
      width: 60px;
      margin-top: 10px;

      span:nth-child(1) {
        margin-right: 16px;
      }

      span i {
        width: 18px;
        height: 18px;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
}
</style>