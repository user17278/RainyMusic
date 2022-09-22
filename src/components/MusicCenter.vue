<template>
  <div class="center">
    <div class="song-list" ref="songList">
      <MusicCenterFav :cookie="cookie" />
      <div class="empty-fav-mask" v-if="!this.$store.state.favSongArr.length">
        <label for="file">
          <div class="empty-fav-mask-box">
            <i class="fa fa-plus-square-o" aria-hidden="true"> </i>
            <span>Click To Add</span>
          </div>
        </label>
        <input
          id="file"
          ref="file"
          type="file"
          accept=".mp3"
          multiple
          @change="handleChange"
          style="display: none"
        />
      </div>
    </div>
    <div class="song-show" ref="songShow">
      <div
        class="side-bar-btn"
        v-on:click="makeSideBarHideLeft"
        ref="sideBarBtnLeft"
      >
        <div class="side-bar-center" ref="sideBarCenter">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </div>
      </div>
      <div class="song-show-box">
        <div class="imgBox">
          <img :src="playingMusicDetail.picUrl" alt="" />
        </div>
        <div class="song-detail-box">
          <span class="name">
            {{ playingMusicDetail.musicName }}
          </span>
          <span class="author">
            {{ playingMusicDetail.musicArtist }}
          </span>
        </div>
      </div>
      <div
        class="side-bar-btn-right"
        v-on:click="makeSideBarHideRight"
        ref="sideBarBtnRight"
      >
        <div class="side-bar-center" ref="sideBarCenter">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <MusicCenterLyric ref="songLyric" />
  </div>
</template>

<script>
import MusicCenterFav from "./MusicCenterFav.vue";
import MusicCenterLyric from "./MusicCenterLyric.vue";
export default {
  name: "MusicCenter",
  components: { MusicCenterFav, MusicCenterLyric },
  props: ["cookie"],
  data() {
    return {
      playingMusicDetail: {
        musicName: "-- -- -- -- -- -- -- -- --",
        musicArtist: "-- -- -- -- -- --",
        picUrl: "",
        musicUrl: "",
        isSideBarHideLeft: false,
        isSideBarHideRight: false,
      },
      isVideo: false,
    };
  },
  methods: {
    handleChange: function () {
      const target = this.$refs.file;
      const files = target.files ? target.files : [];
    },
    sideBarShowLeft: function () {
      // console.log('左边显示');
      this.$refs.songList.style.flex = 1;
      this.$refs.sideBarBtnLeft.style.left = "-15px";
      this.isSideBarHideLeft = false;
    },
    sideBarHideLeft: function () {
      // console.log('左边隐藏');
      this.$refs.songList.style.flex = 0;
      this.$refs.sideBarBtnLeft.style.left = "0px";
      this.isSideBarHideLeft = true;
    },
    sideBarShowRight: function () {
      // console.log('右边显示');
      const songLyric = this.$refs.songLyric;
      songLyric.$refs.lyricShow.style.flex = 1;
      this.$refs.songShow.style.flex = 1.5;
      this.$refs.sideBarBtnRight.style.right = "-15px";
      this.isSideBarHideRight = false;
    },
    sideBarHideRight: function () {
      // console.log('右边隐藏');
      const songLyric = this.$refs.songLyric;
      songLyric.$refs.lyricShow.style.flex = 0;
      this.$refs.sideBarBtnRight.style.right = "0px";
      this.$refs.songShow.style.flex = 1.5;
      this.isSideBarHideRight = true;
    },
    makeSideBarHideLeft: function () {
      if (!this.isSideBarHideLeft) {
        this.sideBarHideLeft();
      } else {
        this.sideBarShowLeft();
      }
    },
    makeSideBarHideRight: function () {
      if (!this.isSideBarHideRight) {
        this.sideBarHideRight();
      } else {
        this.sideBarShowRight();
      }
    },
  },
  mounted() {
    this.$bus.$on("getPlayingMusicDetailToCenter", (item) => {
      this.$set(this.playingMusicDetail, "musicName", item.name);
      this.$set(this.playingMusicDetail, "musicArtist", item.ar[0].name);
      this.$set(this.playingMusicDetail, "picUrl", item.al.picUrl);
    });
    this.$bus.$on("controlVideoShow", (status) => {
      this.isVideo = status;
    });
    this.$bus.$on("videoBtnClick", () => {
      this.makeSideBarHideLeft();
    });
  },
  beforeDestroy() {
    this.$bus.$off("getPlayingMusicDetailToCenter");
    this.$bus.$off("controlVideoShow");
    this.$bus.$off("videoBtnClick");
  },
};
</script>

<style scoped lang="scss">
:root {
  $hshadow: 9px !global;
  $vshadow: -8px !global;
  $blur: 0 !global;
  $color: white !global;
}

.center {
  flex: 1 1 auto;
  height: 700px;
  display: flex;
  justify-content: center;
}

::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}

.song-list {
  flex-direction: column;
  flex: 1;
  overflow: auto;
  transition: 0.8s cubic-bezier(0.27, -0.01, 0.34, 1);
  background-color: royalblue;

  .empty-fav-mask {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: white;
    text-align: center;
    white-space: nowrap;

    .empty-fav-mask-box span {
      margin: 0 5px;
    }

    .empty-fav-mask-box span:active {
      color: #d6d6d6;
    }

    * {
      color: rgb(255, 255, 255);
      text-decoration: none;
      font-size: 16px;
      cursor: pointer;
    }
  }
}

.song-show {
  flex: 1.5;
  position: relative;

  .side-bar-btn {
    position: absolute;
    left: -15px;
    top: 50%;
    transform: translateY(-50%);
    transition: 1s;
    z-index: 10;

    .side-bar-center::before {
      content: "";
      width: 16px;
      height: 16px;
      background-color: transparent;
      border-radius: 50%;
      box-shadow: 9px 8px 0 white;
      position: absolute;
      top: -16px;
    }

    .side-bar-center {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 50px;
      background-color: white;
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
      cursor: pointer;

      i {
        color: #d6d6d6;
        transform: rotate(90deg);
        font-size: 12px;
      }
    }

    .side-bar-center::after {
      content: "";
      width: 16px;
      height: 16px;
      background-color: transparent;
      border-radius: 50%;
      box-shadow: $hshadow $vshadow $blur $color;
      position: absolute;
      top: 50px;
    }
  }

  .side-bar-btn-right {
    position: absolute;
    right: -15px;
    top: 50%;
    transform: rotate(180deg) translateY(50%);
    transition: 1s;
    z-index: 10;

    .side-bar-center::before {
      content: "";
      width: 16px;
      height: 16px;
      background-color: transparent;
      border-radius: 50%;
      box-shadow: 9px 8px 0 white;
      position: absolute;
      top: -16px;
    }

    .side-bar-center {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 50px;
      background-color: white;
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
      cursor: pointer;

      i {
        color: #d6d6d6;
        transform: rotate(90deg);
        font-size: 12px;
      }
    }

    .side-bar-center::after {
      content: "";
      width: 16px;
      height: 16px;
      background-color: transparent;
      border-radius: 50%;
      box-shadow: $hshadow $vshadow $blur $color;
      position: absolute;
      top: 50px;
    }
  }

  .song-show-box {
    width: 320px;
    margin: 0px auto;
    text-align: center;

    .imgBox {
      position: relative;
      width: 320px;
      height: 320px;
      overflow: hidden;
      margin: 50px auto;
      border-radius: 320px;
      box-shadow: 0px 0px 20px 2px;

      img {
        position: absolute;
        left: 50%;
        top: 50%;
        height: 326px;
        transform: translate(-50%, -50%);
        overflow: hidden;
      }
    }

    .song-detail-box {
      width: 320px;
      overflow: hidden;

      .name,
      .author {
        display: inline-block;
        min-width: 100%;
        margin-top: 30px;
        color: #626262;
        white-space: nowrap;
        animation: moving 15s linear alternate infinite;
        user-select: none;
      }

      .name {
        font-size: 28px;
      }

      .author {
        font-size: 20px;
      }
    }
  }
}

@keyframes moving {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(320px - 100%));
  }
}
</style>
