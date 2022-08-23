<template>
  <li>
    <div class="searchResult-box">
      <img :src="item.picUrl" alt="" />
      <div class="search-result-detail">
        <div class="search-result-detail-musicName">{{ item.name }}</div>
        <div class="search-result-detail-musicAuthor">
          {{ item.artists[0].name }}
        </div>
      </div>
      <div class="control-btn">
        <div class="add-fav" v-on:click="favMusic">
          <i class="fa fa-heart-o" aria-hidden="true"></i>
        </div>
        <div class="play-now" v-on:click="playMusic(item.id)">
          <i class="fa fa-play" :class="[
            isPlay == item.id && playingStatus ? 'fa fa-pause' : 'fa fa-play',
          ]" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "MusicTopSearchResultItem",
  props: ["item", "isPlay"], //接收来自MusicTopRearchResult的item,item有歌曲的所有信息
  data() {
    return {
      favStatus: true,
      playingStatus: false,
    };
  },
  methods: {
    //收藏当前音乐
    favMusic() {
      if (this.favStatus) {
        this.$bus.$emit("getFavMusicDetail", this.item, this.favStatus); //收藏
        this.favStatus = false;
        console.log("添加");
      } else {
        this.$bus.$emit("getFavMusicDetail", this.item, this.favStatus); //取消收藏
        this.favStatus = true;
      }
    },
    playMusic(id) {
      this.$bus.$emit("toPlayListId", id); //判断样式 正在播放的Id
      this.$bus.$emit("getPlayingMusicDetail", this.item);
    },
  },
  mounted() {
    this.$bus.$on("playOrPause", (value) => {
      this.playingStatus = value;
    });
  },
};
</script>

<style scoped>
.active {
  color: red;
}

.searchResult-box {
  display: flex;
  align-items: center;
  height: 65px;
  padding: 10px;
  margin: 0px 10px;
  border-bottom: solid 0.3px #d6d6d6;
}

.searchResult-box img {
  width: 55px;
  height: 55px;
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
  animation: moving 15s linear infinite;
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
  animation: moving 15s linear infinite;
  font-size: 16px;
  color: #525252;
}

.searchResult-box .control-btn {
  display: flex;
  justify-content: flex-end;
}

.add-fav,
.play-now {
  cursor: pointer;
  margin-right: 21px;
  color: #d6d6d6;
}

i {
  width: 30px;
  height: 30px;
  font-size: 30px;
}

.add-fav {
  margin-right: 30px;
}
</style>
