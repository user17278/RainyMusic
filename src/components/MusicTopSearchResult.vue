<template>
  <ul>
    <MusicTopSearchResultItem v-for="item in this.searchResults" :key="item.id" :item="item"
      :nextSongIdWhenPlaying="nextSongIdWhenPlaying" />
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
mounted() {
this.$bus.$on("nextSongIdWhenPlaying", (id) => {
this.nextSongIdWhenPlaying = id;
});
},

};
</script>

<style scoped>
</style>