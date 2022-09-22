<template>
  <div class="login-page-mask" v-on:click.self="clickOtherAreaToClose">
    <div class="login-page">
      <div class="login-title">
        <span>登录</span>
        <span>RainyMusic</span>
      </div>
      <div class="user-name">
        <button class="login-next" ref="loginNext">
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </button>
        <input
          type="text"
          ref="userIdInput"
          placeholder="RainyMusic ID"
          v-model="idInput"
          v-on:keyup.enter="idSuccess(idInput)"
        />
        <router-view></router-view>
      </div>
      <div class="login-tips" ref="loginTips">
        <i class="fa fa-info-circle" aria-hidden="true"></i>
        可以立即使用的账号:Tom密码:123 或 注册新账号
      </div>
      <div class="user-tips">{{ loginTip }}</div>
      <div class="user-remember">
        <label for="label" @change="clickRememberCheckBox"
          ><input
            type="checkbox"
            id="label"
            v-model="rememberCheckedStatus"
            ref="rememberCheckBox"
        /></label>
        <span>记住我的 RainyMusic ID</span>
      </div>
      <div class="user-forget">
        <div class="separator"></div>
        <div>
          <a href="javascript:alert('无功能~请创建新账号')"
            >忘记了 RainyMusic ID 或密码？</a
          >
        </div>
        <span>没有RainyMusic ID？</span>
        <router-link to="/regUser">立即创建您的 RainyMusic ID。</router-link>
        <div>
          <span style="color: black">或者 </span>
          <router-link to="/phoneLogin" v-on:click="phoneLogin"
            >选择第三方账号登录
            <i class="fa fa-angle-double-right" aria-hidden="true"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      idInput: "", //输入的id
      loginTip: "", //登录提示
      rememberCheckedStatus: false,
      phoneNum: null,
      captcha: null,
    };
  },
  watch: {
    idInput: {
      handler(newValue, oldValue) {
        if (newValue != oldValue && oldValue != "") {
          this.$router.push({
            name: "login",
          });
          this.$refs.userIdInput.style.borderBottomLeftRadius = "10px";
          this.$refs.userIdInput.style.borderBottomRightRadius = "10px";
          this.$refs.userIdInput.style.animation = "none";
        }
      },
    },
  },
  methods: {
    //验证id
    idSuccess: function (id) {
      this.clickRememberCheckBox;
      this.$axios
        .post("/user/userNameCheck", {
          username: id,
        })
        .then((res) => {
          if (res.data.message == "用户名已存在") {
            this.loginTip = "";
            this.$refs.userIdInput.style.borderBottomLeftRadius = "0px";
            this.$refs.userIdInput.style.borderBottomRightRadius = "0px";
            this.$router.push({
              name: "check",
              params: {
                username: id,
              },
            });
            this.$refs.loginNext.style.top = "45px";
          } else if (res.data.message == "用户名格式不正确") {
            this.loginTip = "格式错误";
          } else {
            this.loginTip = "不存在此ID";
          }
        });
    },
    clickRememberCheckBox: function () {
      if (this.$refs.rememberCheckBox.checked) {
        localStorage.setItem("userId", this.idInput);
      } else {
        localStorage.removeItem("userId");
      }
    },
    phoneLogin: function () {
      this.$axios.get(
        "http://music.cyrilstudio.top/login/cellphone?phone=" +
          this.phoneNum +
          "&captcha=" +
          this.captcha
      );
    },
    clickOtherAreaToClose: function () {
      if (!this.$store.state.loginStatus) {
        this.$store.state.loginStatus = false;
      } else {
        this.$store.state.loginStatus = true;
      }
      this.$router.push("/");
    },
    showLoginTips() {
      this.$refs.loginTips.style.animation = "moving1 8s forwards";
    },
  },
  mounted() {
    this.$bus.$on("getPwdMsg", (msg) => {
      this.loginTip = msg;
    });
    //记住Id
    let userId = localStorage.getItem("userId");
    if (userId) {
      this.idInput = localStorage.getItem("userId");
      this.$refs.rememberCheckBox.checked = true;
    }
    var that = this;
    setTimeout(() => {
      that.showLoginTips();
    }, 1000);
  },
  beforeDestroy() {
    this.$bus.$off("getPwdMsg");
  },
};
</script>

<style scoped>
.login-page-mask {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 100vw;
  height: 100vh;
  background-color: rgba(1, 1, 1, 0.3);
  z-index: 999;
}

.login-page {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 200px;
  width: 600px;
  height: 380px;
  border: solid 1px #d6d6d6;
  border-radius: 10px;
  background-color: white;
  z-index: 15;
  text-align: center;
  overflow: hidden;
}

.login-title {
  margin-top: 20px;
  margin-bottom: 20px;
}

.login-title span:nth-child(1) {
  font-weight: 900;
  margin-right: 16px;
  vertical-align: bottom;
}
.fa-info-circle {
  color: #626262;
}
.login-tips {
  position: absolute;
  top: 95px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
  font-size: 12px;
  color: #626262;
  animation: none;
  opacity: 0;
}

.user-name {
  width: 280px;
  margin: 0 auto;
  border: solid 1px #d6d6d6;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.login-next {
  width: 45px;
  height: 45px;
  position: absolute;
  right: 0px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.login-next i {
  color: #d6d6d6;
  font-size: 26px;
}
.user-name input {
  display: block;
  width: 280px;
  height: 45px;
  border: none;
  border-bottom: solid 1px #d6d6d6;
  color: black;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: 100;
  background-color: white;
}

input::-webkit-input-placeholder {
  color: #d6d6d6;
}

.user-name input:nth-child(2):focus {
  border: solid 3px royalblue;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.user-name input:nth-child(3):focus {
  border: solid 3px royalblue;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.user-name input:last-child {
  display: block;
  width: 280px;
  height: 45px;
  border: none;
  color: black;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: 100;
  animation: move 1s forwards;
}

@keyframes move {
  0% {
    height: 0px;
  }

  100% {
    height: 45px;
  }
}

.user-tips {
  width: 280px;
  height: 25px;
  margin: 0px auto;
  color: #d6d6d6;
  font-size: 16px;
  text-align: left;
  padding: 10px;
}

.user-remember {
  margin-top: 10px;
}

.user-remember span {
  margin-left: 12px;
  font-size: 16px;
  font-weight: 100;
}

.user-forget .separator {
  max-width: 300px;
  height: 1px;
  margin: 20px auto;
  background-color: #d6d6d6;
  font-weight: 100;
}

.user-forget span {
  font-size: 12px;
  font-weight: 100;
}

a {
  text-decoration: none;
  color: royalblue;
  font-size: 12px;
}

a:hover {
  text-decoration: underline;
}
</style>
<style>
@keyframes moving1 {
  0% {
    opacity: 0;
    top: 95px;
  }
  10% {
    opacity: 1;
    top: 115px;
  }
  90% {
    opacity: 1;
    top: 115px;
  }
  100% {
    opacity: 0;
    top: 95px;
  }
}
</style>
