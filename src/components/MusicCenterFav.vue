<template>
  <ul>
    <MusicCenterFavItem
      v-for="favSongItem in this.favSongArr"
      :key="favSongItem.id"
      :favSongItem="favSongItem"
      :nextSongIdWhenPlaying="nextSongIdWhenPlaying"
    />
  </ul>
</template>

<script>
import MusicCenterFavItem from "./MusicCenterFavItem.vue";
export default {
  name: "MusicCenterFav",
  components: { MusicCenterFavItem },
  props: ["cookie"],
  data() {
    return {
      favSongArr: [],
      nextSongIdWhenPlaying: null,
    };
  },
  methods: {
    moveFromFav: function (musicId) {
      this.favSongArr = this.favSongArr.filter((FavSongArrItem) => {
        return FavSongArrItem.id !== musicId;
      });
    },
  },
  computed: {
    loginStatus() {
      return this.$store.state.loginStatus;
    },
    changeFavSongArr() {
      return this.$store.state.changeFavSongArr;
    },
  },
  watch: {
    // 退出登录清空列表
    loginStatus(newValue, oldValue) {
      if (!newValue) {
        this.favSongArr = [];
      }
    },
    changeFavSongArr(newValue, oldValue) {
      if (newValue) {
        this.favSongArr = [];
      }
    },
  },
  mounted() {
    var that = this;
    this.$bus.$on("nextSongIdWhenPlaying", (id) => {
      this.nextSongIdWhenPlaying = id;
    });
    this.$bus.$on("addFavMusicToCenterFav", (id, favStatus) => {
      if (!favStatus) {
        that.$axios
          .get("http://localhost:3000/song/detail?ids=" + id)
          .then(function (res) {
            console.log(res);
            that.favSongArr.push(res.data.songs[0]);
          });
      } else {
        this.moveFromFav(id);
      }
    });
    this.$bus.$on("removeFavMusic", (id) => {
      const index = this.favSongArr.findIndex((item) => item.id == id);
      this.favSongArr.splice(index, 1);
    });
  },
  updated() {
    this.$store.commit("addToFavSongArr", this.favSongArr);
    // 已登录收藏
    if (this.$store.state.loginStatus) {
      this.$axios.post(
        "/fav/addFav",
        {
          favId: this.$store.state.favSongArr,
          username: this.$store.state.username,
        },
        {
          headers: { Authorization: this.$store.state.token },
        }
      );
    }
  },
  beforeDestroy() {
    this.$bus.$off("nextSongIdWhenPlaying");
    this.$bus.$off("addFavMusicToCenterFav");
    this.$bus.$off("removeFavMusic");
  },
};
</script>

<style scoped>
ul {
  overflow: auto;
}
</style>
