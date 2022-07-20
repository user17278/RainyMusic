<template>
  <div class="top">
    <div class="search">
      <input type="text" v-model="query" @keyup.enter="searchMusic" @focus="showResultMask" ref="searchInput" />
      <button v-on:click="searchMusic">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
    <div class="search-result-mask" v-show="resultShowing" v-on:click.self="closeResultMask">
      <div class="search-result">
        <MusicTopSearchResult :searchResults="searchResults" />
      </div>
    </div>
  </div>
</template>
 
<script>
import MusicTopSearchResult from "./MusicTopSearchResult.vue";

export default {
  name: "MusicTop",
  props: ["cookie"],
  components: { MusicTopSearchResult },
  data() {
    return {
      query: "MEMORIES!", // 默认搜索
      resultShowing: false, // 搜索栏周围遮罩层
      searchResults: [], //存放搜索结果
      mvIds: [],//mvId
      searchNum: 6,
    };
  },
  methods: {
    getSearchResult: function () {
      return this.$axios.get('https://music.cyrilstudio.top/search?keywords=' +
        this.query +
        "&limit=" + this.searchNum)
    },
    getMvId: function () {
      return this.$axios.get('https://music.cyrilstudio.top/search?keywords=' +
        this.query +
        "&type=1006")
    },
    searchMusic: function () {
      this.resultShowing = true;
      this.$refs.searchInput.style.color = 'black'
      var that = this;
      if (this.query.trim()) {
        this.$axios
          .all([this.getSearchResult(), this.getMvId()])
          .then(this.$axios.spread(function (res1, res2) {
            that.searchResults = res1.data.result.songs;
            for (let n = 0; n < that.searchNum; n++) {
              for (let m = 0; m < that.searchNum; m++) {
                if (that.searchResults[n].id == res2.data.result.songs[m].id) {
                  // console.log('n有MV');
                  that.searchResults[m].mvid = res2.data.result.songs[m].id
                }
              }
            }
            for (let i = 0; i < res1.data.result.songs.length; i++) {
              var musicIds = res1.data.result.songs[i].id;
              that.$axios
                // 获取每首歌曲的详细
                .get(
                  // "https://music.cyrilstudio.top/song/detail?cookie=" +
                  // that.cookie +
                  // "&ids=" +
                  // musicIds
                  "https://music.cyrilstudio.top/song/detail?ids=" + musicIds
                )
                // 请求picUrl，添加到searchResults数组中
                .then(function (res) {
                  that.$set(
                    that.searchResults[i],
                    "picUrl",
                    res.data.songs[0].al.picUrl
                  );
                });
            }
          }))
          ;
      } else {
        that.searchResults = []; //query没输入时，自动清空搜索结果
      }
    },
    showResultMask: function () {
      this.resultShowing = true;
      this.$refs.searchInput.style.color = 'black'
    },
    closeResultMask: function () {
      this.resultShowing = false;
      this.$refs.searchInput.style.color = '#d6d6d6'

    },
  },
  mounted() {
  },
  beforeDestroy() { },
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

.search>input {
  width: 450px;
  padding-left: 30px;
  margin: 0 auto;
  border: none;
  border-radius: 16px;
  color: #d6d6d6;
}

.search>button {
  position: absolute;
  width: 60px;
  height: 50px;
  margin-left: 380px;
  background-color: transparent;
  cursor: pointer;
  color: #d6d6d6;
  border: none;
}

.search>button>i {
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
  z-index: 99;
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