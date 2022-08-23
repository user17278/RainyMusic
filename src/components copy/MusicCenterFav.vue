<template>
  <ul>
    <MusicCenterFavItem v-for="favSongItem in this.FavSongArr" :key="favSongItem.id" :favSongItem="favSongItem"
      :isPlay="isPlay" />
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
      FavSongArr: [],
      isPlay: null,
    };
  },
  methods: {
    moveFromFav: function (musicId) {
      this.FavSongArr = this.FavSongArr.filter((FavSongArrItem) => {
        return FavSongArrItem.id !== musicId;
      });
    },
  },
  mounted() {
    this.$bus.$on("toPlayListId", (id) => {
      this.isPlay = id;
    });
    this.$bus.$on("getFavMusicDetail", (item, favStatus) => {
      if (favStatus) {
        this.FavSongArr.unshift(item);
      } else {
        this.moveFromFav(item.id);
      }
    });
    // 直接将Url存入数组中，不用每次播放都获取
    // this.$bus.$on("getPlayingMusicDetail", (item) => {
    //   var that = this;
    //   //获取音乐Url
    //   this.$axios
    //     .get(
    //       "https://music.cyrilstudio.top/song/url?cookie=" +
    //       that.cookie +
    //       "&id=" +
    //       item.id
    //     )
    //     .then(function (res) {
    //       // console.log(res);
    //       that.$bus.$emit("getPlayingMusicUrl", res.data.data[0].url);
    //       // const index = that.FavSongArr.findIndex((FavSongArr) => {
    //       //   return FavSongArr.id == item.id;
    //       // });
    //       // that.$set(that.FavSongArr[index], "musicUrl", res.data.data[0].url);
    //     });
    // });
  },
  beforeDestroy() {
    this.$bus.$off("getFavMusicDetail");
    this.$bus.$off("getPlayingMusicDetail");
  },
  watch: {
    "FavSongArr.length": {
      handler(newValue, oldValue) {
        this.$bus.$emit("getFavSongArr", newValue);
      },
    },
  },
};
</script>

<style scoped>
ul {
  overflow: auto;
}
</style>