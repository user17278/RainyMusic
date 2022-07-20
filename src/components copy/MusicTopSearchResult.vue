<template>
  <ul>
    <MusicTopSearchResultItem
      v-for="item in this.searchResults"
      :key="item.id"
      :item="item"
      :addSongToFav="addSongToFav"
      :playMusic="playMusic"
      :moveFromFav="moveFromFav"
    />
  </ul>
</template>

<script>
import MusicTopSearchResultItem from "./MusicTopSearchResultItem.vue";

export default {
  name: "MusicTopSearchResult",
  components: { MusicTopSearchResultItem },
  props: ["searchResults", "addSongToFav", "playMusic", "moveFromFav"],
  data() {
    return {
      // searchResultImgUrl: [],  //搜索结果图片地址
    };
  },
};
</script>

<style scoped>
</style>