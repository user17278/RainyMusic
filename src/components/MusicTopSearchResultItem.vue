<template>
  <li>
    <div class="searchResult-box">
      <img :src="picUrl" alt="" />
      <div class="search-result-detail">
        <div class="search-result-detail-musicName">{{ item.name }}</div>
        <div class="search-result-detail-musicAuthor">
          {{ item.artists[0].name }}
        </div>
      </div>
      <div class="control-btn">
        <div class="add-next" v-on:click="addNextSong">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </div>
        <div class="add-fav" v-on:click="favMusic(item)">
          <i :class="[favStatus ? 'fa fa-heart' : 'fa fa-heart-o']" :style="{ color: (favStatus ? '#ff8282' : '') }"
            aria-hidden="true"></i>
        </div>
        <div class="play-now" v-on:click="playMusic(item.id)">
          <i class="fa fa-play" :class="[
            nextSongIdWhenPlaying == item.id && playingStatus ? 'fa fa-pause' : 'fa fa-play',
          ]" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: "MusicTopSearchResultItem",
  props: ["item", "nextSongIdWhenPlaying"], //接收来自MusicTopRearchResult的item,item有歌曲的所有信息
  data() {
    return {
      favStatus: false,//未收藏
      playingStatus: false,
      picUrl: '',
    };
  },
  computed: {
    ...mapState(['favSongArr'])
  },
  methods: {
    // 添加下一首歌曲
    addNextSong() {
      this.$bus.$emit('addNextSongReadyToPlay', this.item.id)
    },
    //收藏当前音乐
    favMusic(item) {
      if (!this.favStatus) {
        this.$bus.$emit("addFavMusicToCenterFav", item.id, this.favStatus); //收藏
        this.favStatus = true
      } else {
        this.$bus.$emit("addFavMusicToCenterFav", item.id, this.favStatus); //取消收藏
        this.favStatus = false
      }
    },
    playMusic(id) {
      this.$bus.$emit("getPlayingMusicId", id);//获取播放中的Id发送到MusicBottomPlayer 
    },
  },
  mounted() {
    const index = this.favSongArr.findIndex((item) => item.id == this.item.id)
    if (index != -1) {
      this.favStatus = true
    }
    this.$bus.$on("getFavStatus", (status) => {
      this.favStatus = status
    })
    this.$bus.$on("playOrPause", (value) => {
      this.playingStatus = value;
    });
    this.$axios
      .get(
        "https://music.cyrilstudio.top/song/detail?ids=" + this.item.id
      ).then((res) => {
        this.picUrl = res.data.songs[0].al.picUrl
      })
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
}

.search-result-detail {
  width: 210px;
  overflow: hidden;
  margin: 0 20px;
  flex: 1;
}

.search-result-detail-musicName {
  display: inline-block;
  min-width: 100%;
  white-space: nowrap;
  /* animation: moving 15s linear infinite; */
  animation-direction: alternate;
  font-size: 20px;
}

@keyframes moving {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(210px - 100%));
  }
}

.search-result-detail-musicAuthor {
  display: inline-block;
  min-width: 100%;
  white-space: nowrap;
  /* animation: moving 15s linear infinite; */
  font-size: 16px;
  color: #525252;
}

.searchResult-box .control-btn {
  display: flex;
}

.add-next,
.add-fav,
.play-now {
  cursor: pointer;
  color: #d6d6d6;
  text-align: center;
  width: 30px;
  height: 30px;
  margin: 0 5px;
}

i {
  font-size: 30px;
}
</style>
