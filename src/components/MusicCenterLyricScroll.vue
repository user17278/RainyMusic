<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "MusicCenterLyricScroll",
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
  },
  mounted() {
    setTimeout(() => {
      this.initScroll();
    }, 20);
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: false,
      observeDOM: true,
    });
  },
};
</script>

<style>
</style>