<template>
  <div class="center">
    <div class="song-list">
      <MusicCenterFav
        :FavSongArr="FavSongArr"
        :cookie="cookie"
        :moveFromFav="moveFromFav"
        :receive="receive"
      />
      <div class="empty-fav-mask" v-if="!FavSongArr.length">
        <div class="empty-fav-mask-box">
          <i class="fa fa-plus-square-o" aria-hidden="true"></i
          ><a href="#"> Click To Add</a>
        </div>
      </div>
    </div>
    <div class="songShow">
      <div class="songShow-box">
        <div class="imgBox">
          <img :src="playingMusicDetail.picUrl" alt="" />
        </div>
        <div class="song-detail-box">
          <span class="name">
            {{ playingMusicDetail.musicName }}
          </span>
          <span class="author">
            {{ playingMusicDetail.musicArtist }}
          </span>
        </div>
      </div>
    </div>
    <div class="lyric-show">
      <div class="lyric-show-box">
        {{ playingMusicDetail.lyric }}
      </div>
    </div>
  </div>
</template>

<script>
import MusicCenterFav from "./MusicCenterFav.vue";

export default {
  name: "MusicCenter",
  components: { MusicCenterFav },
  props: [
    "FavSongArr",
    "playingMusicDetail",
    "cookie",
    "moveFromFav",
    "receive",
  ],
  data() {
    return {};
  },
  mounted() {
    this.$bus.$on("getMusicDetail", this.playingMusicDetail);
    console.log(this);
  },
  beforeDestroy() {
    this.$bus.$off("getMusicDetail");
  },
};
</script>

<style scoped>
.center {
  flex: 1 1 auto;
  height: 700px;
  display: flex;
}

.song-list {
  flex-direction: column;
  flex: 1;
  background-color: royalblue;
}

.song-list-fav {
  display: flex;
  padding: 5px;
  margin: 5px;
  height: 75px;
}

.song-list-fav img {
  width: 75px;
  height: 75px;
  border-radius: 16px;
}

.song-list-fav-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  margin: 0 5px;
}

.song-list-fav-detail * {
  color: white;
  margin: 5px 0;
}

.song-list-fav-detail-musicName {
  font-size: 22px;
}

.song-list-fav-detail-musicAuthor {
  font-size: 16px;
}

.song-list-fav-btn {
  display: flex;
  align-items: center;
}

.song-list-fav-btn * {
  color: white;
  font-size: 22px;
}
.empty-fav-mask {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  text-align: center;
}
.empty-fav-mask-box * {
  color: rgb(255, 255, 255);
  text-decoration: none;
  font-size: 16px;
}
.songShow {
  /* width: 500px; */
  flex: 1.5;
}

.songShow-box {
  width: 320px;
  margin: 0px auto;
  text-align: center;
}

.imgBox {
  position: relative;
  width: 320px;
  height: 320px;
  overflow: hidden;
  margin: 50px auto;
  border-radius: 320px;
  box-shadow: 0px 0px 20px 2px;
}
.song-detail-box {
  width: 320px;
  overflow: hidden;
}
.name,
.author {
  display: inline-block;
  min-width: 100%;
  margin-top: 30px;
  color: black;
  white-space: nowrap;
  animation: moving 15s linear alternate infinite;
}
@keyframes moving {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(320px - 100%));
  }
}
.name {
  font-size: 28px;
}

.author {
  font-size: 20px;
  color: #353535;
}

.imgBox img {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 326px;
  transform: translate(-50%, -50%);
  overflow: hidden;
}

.lyric-show {
  flex: 1;
}
.lyric-show-box {
  height: 100%;
  background: royalblue;
  overflow: auto;
  color: white;
}
</style>