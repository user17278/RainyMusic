<template>
  <li>
    <div class="next-song-list-box">
      <div class="img-box" v-on:mouseenter="showImgMask" ref="imgBox">
        <div
          class="img-mask"
          v-show="(nextSongIdWhenPlaying == item.id && playingStatus) || isMove"
          v-on:click="playMusic(item.id)"
        >
          <i
            :class="[
              nextSongIdWhenPlaying == item.id && playingStatus
                ? 'fa fa-pause'
                : 'fa fa-play',
            ]"
            aria-hidden="true"
          ></i>
        </div>
        <img :src="item.al.picUrl" alt="封面" />
      </div>
      <div class="next-song-list-detail">
        <div class="next-song-list-detail-musicName">{{ item.name }}</div>
        <div class="next-song-list-detail-musicAuthor">
          {{ item.ar[0].name }}
        </div>
      </div>
      <div class="control-btn">
        <div class="remove">
          <i
            class="fa fa-trash-o"
            aria-hidden="true"
            v-on:click="removeItem"
          ></i>
        </div>
        <div>
          <span class="add-fav">
            <i
              :class="[favStatus ? 'fa fa-heart' : 'fa fa-heart-o']"
              :style="{ color: favStatus ? '#ff8282' : '' }"
              aria-hidden="true"
              v-on:click="favMusic(item)"
            ></i>
          </span>
          <span class="play-now">
            <i
              class="fa fa-play"
              :class="[
                nextSongIdWhenPlaying == item.id && playingStatus
                  ? 'fa fa-pause'
                  : 'fa fa-play',
              ]"
              aria-hidden="true"
              v-on:click="playMusic(item.id)"
            ></i>
          </span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "MusicBottomPlayerList",
  props: ["item", "nextSongIdWhenPlaying"],
  data() {
    return {
      playingStatus: false,
      isShowImgMask: false, //播放中的歌曲图标覆盖
      isMove: false,
      favStatus: false,
    };
  },
  computed: {
    isFavChange() {
      return this.$store.state.favSongArr; //需要监听的数据
    },
  },
  watch: {
    isFavChange(newVal, oldVal) {
      const index = newVal.findIndex((item) => item == this.item.id);
      if (index != -1) {
        this.favStatus = true;
      } else {
        this.favStatus = false;
      }
    },
  },
  methods: {
    removeItem: function () {
      this.$bus.$emit("removeSongFromNextSongPlayerList", this.item.id);
    },
    playMusic(id) {
      this.$bus.$emit("getPlayingMusicId", id); //获取要播放的Id发送到MusicBottomPlayer
    },
    //收藏当前音乐
    favMusic(item) {
      if (!this.favStatus) {
        this.$bus.$emit("addFavMusicToCenterFav", item.id, this.favStatus); //收藏
        this.favStatus = true;
      } else {
        this.$bus.$emit("addFavMusicToCenterFav", item.id, this.favStatus); //取消收藏
        this.favStatus = false;
      }
    },
    //播放中的歌曲图标覆盖
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

<style scoped lang="scss">
label {
  margin: 0 auto;
}

.next-song-list-box {
  display: flex;
  align-items: flex-start;
  padding: 10px;
  margin: 10px;
  border: solid 1px #d6d6d6;
  border-radius: 10px;
  overflow: hidden;

  .img-box {
    position: relative;
    border-radius: 10px;
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
        color: white;
        line-height: 60px;
        height: 60px;
      }
    }

    img {
      width: 60px;
      height: 60px;
      vertical-align: bottom;
    }
  }

  .next-song-list-detail {
    flex: 1;
    margin: 0 10px;
    width: 120px;
    overflow: hidden;

    .next-song-list-detail-musicName {
      margin-bottom: 5px;
      font-size: 16px;
      color: rgb(83, 83, 83);
    }

    .next-song-list-detail-musicAuthor {
      font-size: 12px;
      color: rgb(83, 83, 83);
    }

    div {
      display: inline-block;
      min-width: 100%;
      white-space: nowrap;
      animation: moving 15s linear infinite;
      animation-direction: alternate;
    }
  }

  @keyframes moving {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(calc(120px - 100%));
    }
  }

  .control-btn {
    display: flex;
    flex-direction: column;
    color: black;
    text-align: right;

    .remove {
      width: 60px;

      i {
        color: #d6d6d6;
        font-size: 18px;
        cursor: pointer;
      }
    }

    div:nth-child(2) {
      width: 60px;
      margin-top: 10px;

      .add-fav {
        margin-right: 16px;
      }

      span i {
        width: 18px;
        height: 18px;
        font-size: 18px;
        cursor: pointer;
      }
    }

    .add-fav i,
    .play-now i {
      color: rgb(83, 83, 83);
    }
  }
}
</style>
