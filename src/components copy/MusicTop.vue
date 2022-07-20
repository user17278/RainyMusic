<template>
  <div class="top">
    <div class="search">
      <input
        type="text"
        v-model="query"
        @keyup.enter="searchMusic"
        @focus="showResultMask"
      />
      <button v-on:click="searchMusic">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
    <div
      class="search-result-mask"
      v-show="resultShowing"
      v-on:click.self="closeResultMask"
    >
      <div class="search-result">
        <MusicTopSearchResult
          :searchResults="searchResults"
          :addSongToFav="addSongToFav"
          :playMusic="playMusic"
          :moveFromFav="moveFromFav"
        />
      </div>
    </div>
    <audio :src="musicUrl" autoplay></audio>
  </div>
</template>
 
<script>
import MusicTopSearchResult from "./MusicTopSearchResult.vue";

export default {
  name: "MusicTop",
  props: ["addSongToFav", "receive", "cookie", "moveFromFav"],
  components: { MusicTopSearchResult },
  data() {
    return {
      // cookie: "", //游客cookie
      query: "夏日", // 默认搜索
      resultShowing: false, // 搜索栏周围遮罩层
      searchResults: [], //存放搜索结果
      musicUrl: "", //音乐地址
    };
  },
  methods: {
    searchMusic: function () {
      this.resultShowing = true;
      var that = this;
      if (this.query.trim()) {
        this.$axios
          .get(
            "https://music.cyrilstudio.top/search?keywords=" +
              this.query +
              "&limit=2"
          )
          .then(function (res) {
            that.searchResults = res.data.result.songs;
            for (let i = 0; i < res.data.result.songs.length; i++) {
              var musicIds = res.data.result.songs[i].id;
              that.$axios
                .get(
                  "https://music.cyrilstudio.top/song/detail?cookie=" +
                    that.cookie +
                    "&ids=" +
                    musicIds
                )
                .then(function (res) {
                  that.$set(
                    that.searchResults[i],
                    "picUrl",
                    res.data.songs[0].al.picUrl
                  );
                });
            }
          });
      } else {
        that.searchResults = []; //query没输入时，自动清空搜索结果
      }
    },
    getSongUrl: function (musicId) {
      return this.$axios({
        url: "http://music.cyrilstudio.top/song/url",
        method: "GET",
        params: {
          cookie: this.cookie,
          id: musicId,
        },
      });
    },
    getSongDetail: function (musicId) {
      return this.$axios({
        url: "https://music.cyrilstudio.top/song/detail",
        method: "GET",
        params: {
          cookie: this.cookie,
          ids: musicId,
        },
      });
    },
    getSongLyric: function (musicId) {
      return this.$axios({
        url: "https://music.cyrilstudio.top/lyric",
        method: "GET",
        params: {
          // cookie: this.cookie,
          id: musicId,
        },
      });
    },
    playMusic: function (musicId) {
      var that = this;
      this.$axios
        .all([
          that.getSongUrl(musicId),
          that.getSongDetail(musicId),
          that.getSongLyric(musicId),
        ])
        .then(
          that.$axios.spread(function (res1, res2, res3) {
            that.musicUrl = res1.data.data[0].url; //playingMusicUrl
            that.receive(res2, res3.data.lrc.lyric);
          })
        );
    },
    // playMusic: function (musicId) {
    //   var that = this;
    //   this.$axios
    //     .get(
    //       "http://music.cyrilstudio.top/song/url?cookie=" +
    //         that.cookie +
    //         "&id=" +
    //         musicId
    //     )
    //     .then(function (res) {
    //       that.musicUrl = res.data.data[0].url;
    //       console.log(res);
    //       that.$axios
    //         .get(
    //           "https://music.cyrilstudio.top/song/detail?cookie=" +
    //             that.cookie +
    //             "&ids=" +
    //             musicId
    //         )
    //         .then(function (res) {
    //           that.receive(res);
    //         });
    //     });
    // },
    showResultMask: function () {
      this.resultShowing = true;
    },
    closeResultMask: function () {
      this.resultShowing = false;
    },
  },
};
</script>

<style scoped>
.top {
  display: flex;
  justify-content: center;
  position: relative;
  flex: 0 0 auto;
  height: 45px;
}

.search {
  display: flex;
  position: relative;
  justify-content: center;
  width: 500px;
  margin: 0 auto;
  z-index: 999;
}

.search * {
  height: 45px;
  /* vertical-align: middle; */
}

.search > input {
  width: 450px;
  padding-left: 30px;
  margin: 0 auto;
  border: none;
  border-radius: 16px;
}

.search > button {
  position: absolute;
  width: 60px;
  height: 50px;
  margin-left: 350px;
  background-color: transparent;
  cursor: pointer;
  color: #d6d6d6;
  border: none;
}

.search > button > i {
  font-size: 30px;
  line-height: 35px;
  height: 35px;
  padding-bottom: 6px;
}

.search-result-mask {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(1, 1, 1, 0.3);
  z-index: 1;
}

.search-result {
  width: 450px;
  max-height: 620px;
  margin: 50px auto;
  border-radius: 20px;
  background-color: white;
  z-index: 999;
}
</style>