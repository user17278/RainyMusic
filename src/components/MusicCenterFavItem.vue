<template>
  <li>
    <div class="fav-list-box">
      <div class="img-box" v-on:mouseenter="showImgMask" ref="imgBox">
        <div
          class="img-mask"
          v-show="
            (nextSongIdWhenPlaying == favSongItem.id && playingStatus) || isMove
          "
        >
          <i
            :class="[
              nextSongIdWhenPlaying == favSongItem.id && playingStatus
                ? 'fa fa-pause'
                : 'fa fa-play',
            ]"
            aria-hidden="true"
          ></i>
        </div>
        <img :src="favSongItem.al.picUrl" alt="" />
      </div>
      <div class="fav-list-song" ref="outBox">
        <div class="fav-list-song-musicName box">
          <span>{{ favSongItem.al.name }} </span>
        </div>
        <div class="fav-list-song-musicAuthor box">
          <span>{{ favSongItem.ar[0].name }}</span>
        </div>
      </div>
      <div class="control-btn">
        <div class="add-next">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </div>
        <div class="heart-fav">
          <i
            class="fa fa-heart"
            :style="{ color: '#ff8282' }"
            aria-hidden="true"
            v-on:click="moveFromFav(favSongItem.id)"
          ></i>
        </div>
        <div class="play-now" v-on:click="playMusic(favSongItem.id)">
          <i
            class="fa fa-play"
            :class="[
              nextSongIdWhenPlaying == favSongItem.id && playingStatus
                ? 'fa fa-pause'
                : 'fa fa-play',
            ]"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "MusicCenterFavItem",
  props: ["favSongItem", "nextSongIdWhenPlaying"],
  data() {
    return {
      favMusicUrl: "",
      playingStatus: false,
      isShowImgMask: false,
      isMove: false,
    };
  },

  methods: {
    playMusic(id) {
      this.$bus.$emit("getPlayingMusicId", id); //获取播放中的Id发送到MusicBottomPlayer
    },
    moveFromFav(id) {
      this.$bus.$emit("removeFavMusic", id);
    },
    showImgMask() {
      this.isMove = true;
      this.$refs.imgBox.onmouseleave = () => {
        this.isMove = false;
      };
    },
  },
  mounted() {
    this.$bus.$on("playOrPause", (value) => {
      this.playingStatus = value;
    });
  },
  beforeDestroy() {
    this.$bus.$off("playOrPause");
  },
};
</script>

<style lang="scss" scoped>
* {
  color: white;
}

.img-box {
  position: relative;
  border-radius: 15px;
  overflow: hidden;

  .img-mask {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.48);
    text-align: center;

    i {
      line-height: 65px;
      height: 65px;
    }
  }
}

.fav-list-box {
  display: flex;
  align-items: center;
  height: 65px;
  padding: 6px;
  margin: 10px 6px;
  background-color: white;
  border-radius: 16px;

  .img-box img {
    width: 65px;
    height: 65px;
    vertical-align: bottom;
  }

  .fav-list-song {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    margin: 0 6px;
    .fav-list-song-musicName {
      font-size: 20px;
    }

    .fav-list-song-musicAuthor {
      margin-top: 6px;
      font-size: 16px;
    }

    .box {
      flex: 1;
      overflow: hidden;

      span {
        display: inline-block;
        min-width: 160px;
        white-space: nowrap;
        animation: moving 15s linear infinite;
        animation-direction: alternate;
        color: #626262;
      }
    }
  }
}

@keyframes moving {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(160px - 100%));
  }
}

.control-btn {
  display: flex;
  flex-direction: row;
  height: 65px;
  align-items: flex-end;
  padding-right: 10px;

  .add-next,
  .heart-fav,
  .play-now {
    width: 22px;
    height: 22px;
    margin-left: 6px;
    margin-right: 6px;
    font-size: 22px;
    text-align: center;
    cursor: pointer;

    i {
      color: #626262;
      vertical-align: top;
    }
  }
}
</style>
