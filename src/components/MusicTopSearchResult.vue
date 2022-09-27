<template>
  <ul>
    <MusicTopSearchResultItem
      v-for="item in searchResults"
      :item="item"
      :key="item.id"
      :nextSongIdWhenPlaying="nextSongIdWhenPlaying"
    />
  </ul>
</template>

<script>
import MusicTopSearchResultItem from "./MusicTopSearchResultItem.vue";

export default {
  name: "MusicTopSearchResult",
  components: { MusicTopSearchResultItem },
  props: ["searchResults"],
  data() {
    return {
      nextSongIdWhenPlaying: null,
    };
  },
  updated() {
    console.log(this.searchResults);
    this.$bus.$on("nextSongIdWhenPlaying", (id) => {
      this.nextSongIdWhenPlaying = id;
    });
  },
};
</script>

<style scoped></style>
