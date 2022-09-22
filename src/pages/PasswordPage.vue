<template>
  <input
    type="password"
    v-model="pwdInput"
    v-on:keyup.enter="pwdSuccess(pwdInput)"
  />
  <!-- 回车提交Ajax请求 -->
</template>

<script>
export default {
  name: "PasswordPage",
  data() {
    return {
      pwdInput: "",
    };
  },
  methods: {
    // 验证密码
    pwdSuccess: function (pwd) {
      this.$axios
        .post("/user/userLog", {
          username: this.$route.params.username,
          password: pwd,
        })
        .then((res) => {
          this.$store.state.loginStatus = true;
          this.$store.state.token = res.data.token;
          this.$store.state.username = this.$route.params.username;
          this.$router.push("/");
          this.$store.state.changeFavSongArr = true;
          this.$axios
            .get("/fav/getFav", {
              params: {
                username: this.$store.state.username,
              },
              headers: { Authorization: this.$store.state.token },
            })
            .then((res) => {
              const favArr = res.data[0].favArr.split(",");
              favArr.forEach((item) => {
                this.$bus.$emit("addFavMusicToCenterFav", item); //收藏
              });
            });
        });
    },
  },
};
</script>

<style scoped>
input {
  height: 0;
}
</style>
