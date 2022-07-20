<template>
  <li>
    <div class="fav-list-box">
      <img :src="favSongItem.picUrl" alt="" />
      <div class="fav-list-song">
        <div class="fav-list-song-musicName box">
          <span>{{ favSongItem.name }} </span>
        </div>
        <div class="fav-list-song-musicAuthor box">
          <span>{{ favSongItem.artists[0].name }}</span>
        </div>
      </div>
      <div class="control-btn">
        <div class="heart-fav">
          <i
            class="fa fa-heart-o"
            aria-hidden="true"
            v-on:click="moveFromFav(favSongItem.id)"
          ></i>
        </div>
        <div class="play-now">
          <i
            class="fa fa-play"
            aria-hidden="true"
            v-on:click="playMusic(favSongItem.id)"
          ></i>
        </div>
      </div>
    </div>
    <audio :src="favMusicUrl" autoplay></audio>
  </li>
  <!-- <li>
            <div class="song-list-fav">
                <img src="../img/bg.jpg" alt="">
                <div class="song-list-fav-detail">
                    <div class="song-list-fav-detail-musicName">123</div>
                    <div class="song-list-fav-detail-musicAuthor">123</div>
                </div>
                <div class="song-list-fav-btn">
                    <div class="add-fav" v-on:click="addMusicToFav">
                        <i class="fa fa-heart-o" aria-hidden="true"></i>
                    </div>
                    <div class="play-now" v-on:click="playMusic(item.id)">
                        <i class="fa fa-play" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
    </li> -->
</template>

<script>
export default {
  name: "MusicCenterFavItem",
  props: ["favSongItem", "cookie", "moveFromFav", "receive"],
  data() {
    return {
      favMusicUrl: "",
    };
  },
  methods: {
    playMusic: function (musicId) {
      var that = this;
      this.$axios
        .get(
          "http://music.cyrilstudio.top/song/url?cookie=" +
            that.cookie +
            "&id=" +
            musicId
        )
        .then(function (res) {
          that.favMusicUrl = res.data.data[0].url;
        });
    },
  },
};
</script>

<style scoped>
.fav-list-box {
  display: flex;
  align-items: center;
  height: 65px;
  padding: 12px 0px 12px 6px;
  margin: 0px 6px;
  border-bottom: solid 2px rgba(255, 255, 255, 0.123);
}

.fav-list-box img {
  width: 65px;
  height: 65px;
  border-radius: 15px;
}

.fav-list-song {
  margin: 0 6px;
  flex: 1;
}

.fav-list-song-musicName {
  font-size: 20px;
  color: white;
  overflow: hidden;
}

.fav-list-song-musicAuthor {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.788);
  overflow: hidden;
}

.fav-list-box .control-btn {
  display: flex;
  justify-content: flex-end;
}
.box {
  width: 160px;
  overflow: hidden;
}
.box span {
  min-width: 100%;
  display: inline-block;
  white-space: nowrap;
  animation: moving 15s linear infinite;
  animation-direction: alternate;
}
@keyframes moving {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(160px - 100%));
  }
}
.heart-fav,
.play-now {
  cursor: pointer;
  margin-right: 10px;
  font-size: 30px;
  color: white;
}
.heart-fav {
  margin-right: 16px;
}
</style>