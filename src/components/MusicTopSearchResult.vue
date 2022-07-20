<template>
  <ul>
    <MusicTopSearchResultItem
      v-for="item in this.searchResults"
      :key="item.id"
      :item="item"
      :isPlay="isPlay"
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
      isPlay: null,
      // searchResultImgUrl: [],  //搜索结果图片地址
    };
  },
  mounted() {
    this.$bus.$on("toPlayListId", (id) => {
      this.isPlay = id;
    });
  },
};
</script>

<style scoped>
</style>