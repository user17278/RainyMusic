<template>
  <div class="bottom">
    <MusicBottomPlayer />
  </div>
</template>

<script>
import MusicBottomPlayer from "./MusicBottomPlayer.vue";
export default {
  name: "MusicBottom",
  components: { MusicBottomPlayer },
  data() {
    return {};
  },
};
</script>

<style scoped>
.bottom {
  display: flex;
  flex: 0 0 auto;
  height: 69px;
  justify-content: center;
  align-items: center;
}
</style>