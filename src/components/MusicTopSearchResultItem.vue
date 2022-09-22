<template>
  <li>
    <div class="searchResult-box">
      <img :src="picUrl" :alt="pic_err" v-on:click="playMusic(item.id)" />
      <div class="search-result-detail">
        <div class="search-result-detail-musicName">
          <div class="wrap">
            <div class="content">{{ item.name }}</div>
          </div>
        </div>
        <div class="search-result-detail-musicAuthor">
          <div class="wrap">
            <div class="content">
              {{ item.artists[0].name }}
            </div>
          </div>
        </div>
      </div>
      <div class="control-btn">
        <div class="add-next" v-on:click="addNextSong">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </div>
        <div class="add-fav" v-on:click="favMusic(item)">
          <i
            :class="[favStatus ? 'fa fa-heart' : 'fa fa-heart-o']"
            :style="{ color: favStatus ? '#ff8282' : '' }"
            aria-hidden="true"
          ></i>
        </div>
        <div class="play-now" v-on:click="playMusic(item.id)">
          <i
            class="fa fa-play"
            :class="[
              nextSongIdWhenPlaying == item.id && playingStatus
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
import { mapState, mapMutations } from "vuex";

export default {
  name: "MusicTopSearchResultItem",
  props: ["item", "nextSongIdWhenPlaying"], //接收来自MusicTopRearchResult的item,item有歌曲的所有信息
  data() {
    return {
      favStatus: false, //未收藏
      playingStatus: false,
      picUrl: "",
      pic_err: "",
    };
  },
  computed: {
    ...mapState(["favSongArr"]),
  },
  watch: {
    favSongArr(newVal, oldVal) {
      const index = newVal.findIndex((item) => item == this.item.id);
      if (index != -1) {
        this.favStatus = true;
      } else {
        this.favStatus = false;
      }
    },
  },
  methods: {
    // 添加下一首歌曲
    addNextSong() {
      this.$bus.$emit("addNextSongReadyToPlay", this.item.id);
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
    playMusic(id) {
      this.$bus.$emit("getPlayingMusicId", id); //获取播放中的Id发送到MusicBottomPlayer
    },
  },
  mounted() {
    const index = this.favSongArr.findIndex((item) => item == this.item.id);
    if (index != -1) {
      this.favStatus = true;
    }
    this.$bus.$on("playOrPause", (value) => {
      this.playingStatus = value;
    });
    this.$axios
      .get("https://music.cyrilstudio.top/song/detail?ids=" + this.item.id)
      .then((res) => {
        this.picUrl = res.data.songs[0].al.picUrl;
      })
      .catch((err) => {
        this.pic_err = "noUrl404";
      });
  },
  beforeDestroy() {
    this.$bus.$off("playOrPause");
  },
};
</script>

<style scoped>
.searchResult-box {
  display: flex;
  align-items: center;
  height: 65px;
  padding: 10px;
  margin: 0px 10px;
  margin-left: 16px;
  border-bottom: solid 0.3px #d6d6d6;
}

.searchResult-box img {
  width: 55px;
  height: 55px;
  border-radius: 10px;
  color: #626262;
  font-size: 12px;
}
.search-result-detail {
  overflow: hidden;
  margin: 0 10px;
  width: 100%;
  flex: 1;
}
.search-result-detail-musicName .wrap {
  width: 100%;
  animation: wrap 10s infinite linear;
}

.search-result-detail-musicName .wrap .content {
  float: left;
  min-width: 100%;
  animation: content 10s infinite linear;
  white-space: nowrap;
  font-size: 20px;
  color: #626262;
}

.search-result-detail-musicAuthor .wrap {
  width: 100%;
  animation: wrap 10s infinite linear;
}
.search-result-detail-musicAuthor .wrap .content {
  float: left;
  min-width: 100%;
  animation: content 10s infinite linear;
  white-space: nowrap;
  font-size: 16px;
  color: #626262;
}

.searchResult-box .control-btn {
  display: flex;
}

@keyframes wrap {
  0%,
  10% {
    transform: translateX(0);
  }
  90%,
  100% {
    transform: translateX(100%);
  }
}

@keyframes content {
  0%,
  10% {
    transform: translateX(0);
  }
  90%,
  100% {
    transform: translateX(-100%);
  }
}
.add-next,
.add-fav,
.play-now {
  cursor: pointer;
  color: #626262;
  text-align: center;
  width: 30px;
  height: 30px;
  margin: 0 5px;
}

i {
  font-size: 30px;
}
</style>
