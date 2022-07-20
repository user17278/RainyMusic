<template>
  <div class="player-progressBar">
    <div class="player-progressBar-box">
      <div
        class="player-progessBar-box-line"
        :style="{ width: progress }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicBottomProgressBar",
  data() {
    return {
      progress: "50%",
    };
  },
};
</script>

<style  scoped lang="scss">
.player-progressBar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1.5;
  .player-progressBar-box {
    width: 460px;
    height: 30px;
    border: solid 0.3px #d6d6d6;
    border-radius: 12px;
    .player-progessBar-box-line {
      height: 30px;
      border-radius: 12px;
      background-color: royalblue;
    }
  }
}
</style>