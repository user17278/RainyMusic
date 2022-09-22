<template>
  <div class="top">
    <div class="search">
      <input
        type="text"
        v-model="query"
        @keyup.enter="searchMusic"
        @focus="showResultMask"
        ref="searchInput"
      />
      <button v-on:click="searchMusic">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
    <div class="user">
      <div
        class="user-logout"
        :style="{
          backgroundColor: this.$store.state.loginStatus
            ? 'royalblue'
            : 'white',
        }"
      >
        <router-link to="/"
          ><i class="fa fa-sign-out" aria-hidden="true"></i
        ></router-link>
      </div>
      <div
        class="user-login"
        v-on:click="showTheLoginPage"
        :style="{
          left: this.$store.state.loginStatus ? '32px' : '0px',
        }"
      >
        <router-link to="/login"
          ><i class="fa fa-user" aria-hidden="true"></i
        ></router-link>
      </div>
      <div class="username" v-show="this.$store.state.loginStatus">
        <span>Hi,</span>{{ this.$store.state.username }}
      </div>
    </div>
    <!-- <div class="theme-change user" v-on:click="changeTheme">
      <i class="cloth">&#xe62e;</i>
    </div> -->
    <div
      class="search-result-mask"
      v-show="resultShowing"
      v-on:click.self="closeResultMask"
    >
      <div
        class="search-result"
        :style="{
          maxHeight: searchResults.length ? '620px' : '26px',
          height: searchResults.length ? '' : '26px',
        }"
        ref="searchResult"
      >
        <div class="wait-logo" v-show="!searchResults.length && isSearch">
          <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
        </div>
        <MusicTopSearchResult :searchResults="searchResults" />
        <div class="showloading" v-show="isScrollFresh">
          <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <router-view></router-view>
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
      query: "cold", // 默认搜索
      resultShowing: false, // 搜索栏周围遮罩层
      searchResults: [], //存放搜索结果
      mvIds: [], //mvId
      searchNum: 10,
      searchOffset: 0,
      isSearch: false, //是否在搜索
      isScrollFresh: false, //是否触发滚动刷新
      loginStatus: false,
      theme: "royalblue",
    };
  },
  methods: {
    showTheLoginPage: function () {
      // this.loginStatus = !this.loginStatus;
      // 退出登录
      if (this.$store.state.loginStatus) {
        this.$store.state.token = "";
        this.$router.push("/");
        this.$store.state.loginStatus = false;
      }
    },

    getSearchResult: function () {
      return this.$axios.get(
        "https://music.cyrilstudio.top/search?keywords=" +
          this.query +
          "&limit=" +
          this.searchNum +
          "&offset=" +
          this.searchOffset
      );
    },
    searchMusic: function () {
      this.isSearch = true;
      this.searchResults = []; //每次重新搜索前清空上次结果
      this.searchOffset = 0;
      this.resultShowing = true;
      this.$refs.searchInput.style.color = "black";
      var that = this;
      if (this.query.trim()) {
        this.$axios.all([this.getSearchResult()]).then(
          this.$axios.spread(function (res1) {
            that.searchResults = res1.data.result.songs;
          })
        );
      } else {
        that.searchResults = []; //query没输入时，自动清空搜索结果
      }
    },
    scrollHandle: function () {
      //每次滚动到底部size+10
      this.searchOffset += 10;
      this.$axios(
        "https://music.cyrilstudio.top/search?keywords=" +
          this.query +
          "&limit=" +
          this.searchNum +
          "&offset=" +
          this.searchOffset
      ).then((res) => {
        this.searchResults.push(...res.data.result.songs);
        this.isScrollFresh = false;
      });
    },
    showResultMask: function () {
      this.resultShowing = true;
      this.$refs.searchInput.style.color = "black";
    },
    closeResultMask: function () {
      this.resultShowing = false;
      this.isSearch = false;
      this.$refs.searchInput.style.color = "#d6d6d6";
    },
  },
  mounted() {
    this.$bus.$on("loginStatus", (status) => {
      this.loginStatus = status;
    });
    const el = this.$refs.searchResult;
    el.onscroll = () => {
      const [clientHeight, scrollTop, scrollHeight] = [
        el.clientHeight,
        el.scrollTop,
        el.scrollHeight,
      ];
      // !this.isScrollFresh防止连续刷新
      if (clientHeight + scrollTop == scrollHeight && !this.isScrollFresh) {
        this.isScrollFresh = true;
        this.scrollHandle();
      }
    };
  },
  beforeDestroy() {
    this.$bus.$off("loginStatus");
  },
};
</script>

<style scoped>
.cloth {
  line-height: 36px;
  font-family: "iconfont" !important;
  font-size: 22px;
  font-style: normal;
  color: royalblue;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

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
}

.search > input {
  width: 470px;
  padding-left: 30px;
  margin: 0 auto;
  border: none;
  border-radius: 16px;
  color: #d6d6d6;
}

.search > button {
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

.username {
  position: absolute;
  top: 50%;
  left: 80px;
  transform: translateY(-50%);
  font-size: 22px;
  color: royalblue;
  white-space: nowrap;
  font-weight: 900;
}
.username span {
  font-size: 16px;
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
  transition: 1s ease-in-out;
}

.islogin {
  left: 32px;
}

.user-login i,
.user-logout i {
  font-size: 18px;
  color: royalblue;
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
  z-index: 99;
}

.search-result {
  width: 450px;
  margin: 50px auto;
  border: solid 10px white;
  border-radius: 16px;
  background-color: white;
  z-index: 999;
  transition: 0.8s ease-in-out;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 6px;
  height: 16px;
}

/*滚动条 阴影~圆角*/
::-webkit-scrollbar-track {
  border-radius: 16px;
}

/* 滑块 阴影~ */
::-webkit-scrollbar-thumb {
  border-radius: 16px;
  background-color: #d6d6d6;
}

.wait-logo,
.showloading {
  text-align: center;
}

.wait-logo i,
.showloading i {
  font-size: 18px;
  color: #d6d6d6;
}
</style>
