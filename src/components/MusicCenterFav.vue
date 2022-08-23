<template>
  <ul>
    <MusicCenterFavItem v-for="favSongItem in this.favSongArr" :key="favSongItem.id" :favSongItem="favSongItem"
      :nextSongIdWhenPlaying="nextSongIdWhenPlaying" />
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
  mounted() {
    this.$bus.$on("nextSongIdWhenPlaying", (id) => {
      this.nextSongIdWhenPlaying = id;
    });
    var that = this
    this.$bus.$on("addFavMusicToCenterFav", (id, favStatus) => {
      if (!favStatus) {
        that.$axios
          .get("https://music.cyrilstudio.top/song/detail?ids=" + id)
          .then(function (res) {
            that.favSongArr.push(res.data.songs[0])
          })
      } else {
        this.moveFromFav(id)
      }
    });
    this.$bus.$on('removeFavMusic', (id) => {
      const index = this.favSongArr.findIndex((item) => item.id == id)
      this.favSongArr.splice(index, 1)
    })

  },
  beforeUpdate() {
    this.$store.commit('addToFavSongArr', this.favSongArr)
  },
  beforeDestroy() {
    this.$bus.$off("nextSongIdWhenPlaying");
    this.$bus.$off("addFavMusicToCenterFav");
    this.$bus.$off("removeFavMusic");
  },
  watch: {
    "favSongArr.length": {
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