<template>
  <li>{{ line.txt }}</li>
</template>

<script>
export default {
  name: "MusicCenterLyricContent",
  props: ["line"],
  data() {
    return {};
  },
};
</script>

<style scoped>
li {
  text-align: center;
  line-height: 18px;
  margin: 20px;
  font-size: 16px;
  text-align: center;
}
</style>