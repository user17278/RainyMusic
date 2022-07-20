<template>
  <ul>
    <MusicCenterFavItem
      v-for="favSongItem in this.FavSongArr"
      :key="favSongItem.id"
      :favSongItem="favSongItem"
      :cookie="cookie"
      :moveFromFav="moveFromFav"
      :receive="receive"
    />
  </ul>
</template>

<script>
import MusicCenterFavItem from "./MusicCenterFavItem.vue";

export default {
  name: "MusicCenterFav",
  props: ["FavSongArr", "cookie", "moveFromFav", "receive"],
  components: { MusicCenterFavItem },
};
</script>

<style>
</style>