<template>
  <div class="top">
    <div class="search">
      <input type="text" v-model="query" @keyup.enter="searchMusic" @focus="showResultMask" ref="searchInput" />
      <button v-on:click="searchMusic">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
    <div class="user">
      <div class="user-logout" :style="{ backgroundColor: loginStatus ? 'royalblue' : 'white' }">
        <router-link to="/"><i class="fa fa-sign-out" aria-hidden="true"></i></router-link>
      </div>
      <div class="user-login" v-on:click="showTheLoginPage" :style="{
        left: loginStatus ? '32px' : '0px',
      }">
        <router-link to="/login"><i class="fa fa-user" aria-hidden="true"></i></router-link>
      </div>

    </div>
    <div class="search-result-mask" v-show="resultShowing" v-on:click.self="closeResultMask">
      <div class="search-result">
        <MusicTopSearchResult :searchResults="searchResults" />
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
 
<script>
import MusicTopSearchResult from "./MusicTopSearchResult.vue";
// import LoginPage from "./LoginPage.vue";

export default {
  name: "MusicTop",
  props: ["cookie"],
  components: { MusicTopSearchResult },
  data() {
    return {
      query: "normal no more", // 默认搜索
      resultShowing: false, // 搜索栏周围遮罩层
      searchResults: [], //存放搜索结果
      mvIds: [],//mvId
      searchNum: 6,
      loginStatus: false,
    };
  },
  methods: {
    // getUser: function () {
    //   return this.$axios.get('https://music.cyrilstudio.top/login/cellphone=' +
    //     this.query +
    //     "&limit=" + this.searchNum)
    // },

    showTheLoginPage: function () {
      // this.loginStatus = !this.loginStatus
    },

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
    this.$bus.$on('loginStatus', (status) => {
      this.loginStatus = status
    })

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

.user {
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 10px;
}

.user .user-login {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: solid 2px royalblue;
  background-color: white;
  text-align: center;
  overflow: hidden;
  transition: .3s;
}

.islogin {
  left: 32px;
}

.user-login i,
.user-logout i {
  font-size: 18px;
  color: royalblue
}

.user .user-logout {
  display: inline-block;
  position: absolute;
  left: 0px;
  transform: translateY(-50%);
  width: 64px;
  height: 32px;
  border-radius: 32px;
  border: solid 2px royalblue;
  background-color: royalblue;
  text-align: left;
}

.user-logout i {
  margin-left: 16px;
  transform: translateX(-50%) rotate(180deg);
  color: white;
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