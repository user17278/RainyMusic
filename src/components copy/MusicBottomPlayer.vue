<template>
  <div class="player">
    <div class="player-btn">
      <div class="player-btn-box">
        <i class="fa fa-step-backward" aria-hidden="true"></i>
      </div>
      <div class="player-btn-box">
        <i class="fa fa-play" aria-hidden="true"></i>
      </div>
      <div class="player-btn-box">
        <i class="fa fa-step-forward" aria-hidden="true"></i>
      </div>
      <div class="player-btn-box">
        <i class="fa fa-volume-up" aria-hidden="true"></i>
      </div>
    </div>
    <MusicBottomProgressBar />
    <div class="player-btn">
      <div class="player-btn-box" id="random-box">
        <i class="fa fa-random" aria-hidden="true"></i>
      </div>
      <div class="player-btn-box" id="lyrics-box">
        <i class="fa fa-stack-exchange" aria-hidden="true"></i>
      </div>
      <div class="player-btn-box" id="unused-box">
        <i class="fa fa-stack-exchange" aria-hidden="true"></i>
      </div>
      <div class="player-btn-box" id="unused-box">
        <i class="fa fa-stack-exchange" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>

<script>
import MusicBottomProgressBar from "./MusicBottomProgressBar.vue";
export default {
  name: "MusicBottomPlayer",
  components: { MusicBottomProgressBar },
  data() {
    return {};
  },
};
</script>

<style scoped lang='scss'>
.player {
  display: flex;
  flex-direction: row;
  width: 100%;
  .player-btn {
    display: flex;
    flex-direction: row;
    flex: 1;
    .player-btn-box {
      text-align: center;
      flex: 1;
    }
    i {
      color: #d6d6d6;
      font-size: 28px;
    }
  }
}
</style>