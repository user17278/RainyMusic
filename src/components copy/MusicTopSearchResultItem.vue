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
        <div class="add-fav" v-on:click="getFavSong">
          <i class="fa fa-heart-o" aria-hidden="true"></i>
        </div>
        <div class="play-now" v-on:click="playMusic(item.id)">
          <i class="fa fa-play" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "MusicTopSearchResultItem",
  props: ["item", "addSongToFav", "playMusic", "moveFromFav"], //接收来自MusicTopRearchResult的item
  data() {
    return {
      favStatus: true,
    };
  },
  methods: {
    //收藏当前音乐
    getFavSong: function () {
      //重复收藏
      if (this.favStatus) {
        this.addSongToFav(this.item); //收藏
        this.favStatus = false;
      } else {
        this.moveFromFav(this.item.id); //取消收藏
        this.favStatus = true;
      }
    },
  },
};
</script>

<style>
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
  margin: 0 20px;
  flex: 1;
}

.search-result-detail-musicName {
  font-size: 20px;
}

.search-result-detail-musicAuthor {
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
  font-size: 30px;
  color: #d6d6d6;
}

.add-fav {
  margin-right: 30px;
}
</style>
