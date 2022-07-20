<template>
  <div id="main">
    <MusicTop :cookie="cookie"></MusicTop>
    <MusicCenter :cookie="cookie"></MusicCenter>
    <MusicBottom></MusicBottom>
  </div>
</template>

<script>
import MusicTop from "./components/MusicTop.vue";
import MusicCenter from "./components/MusicCenter.vue";
import MusicBottom from "./components/MusicBottom.vue";
export default {
  name: "App",
  components: {
    MusicTop,
    MusicCenter,
    MusicBottom,
  },
  data() {
    return {
      cookie: "", //游客cookie
    };
  },
  created() {
    var that = this;
    this.$axios
      .get("http://localhost:3000/register/anonimous")
      .then(function (res) {
        that.cookie = encodeURIComponent(res.data.cookie);
      });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}


body {
  overflow: hidden;
}

input {
  box-sizing: border-box;
}

input:focus {
  outline: none;
}

#main {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>