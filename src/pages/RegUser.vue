<template>
  <div class="reg-user-page-mask" v-on:click.self="clickOtherAreaToClose">
    <div class="reg-user-page">
      <div class="reg-user-title">
        <span>注册</span>
        <span>RainyMusic ID</span>
      </div>
      <div class="user-name">
        <button class="reg-user-next" ref="loginNext">
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </button>
        <input
          type="text"
          ref="userIdInput"
          placeholder="请输入1-10位的用户名 "
          v-model="userName"
          v-on:keyup.enter="idCheck(userName)"
        />
        <router-view></router-view>
      </div>
      <div class="user-tips">{{ checkTip }}</div>
      <button
        class="reg-btn"
        ref="regBtn"
        v-on:click="regUser"
        v-show="userPassword"
      >
        注 册 <i class="fa fa-angle-double-right" aria-hidden="true"></i>
      </button>
      <div class="reg-tips">
        <div class="separator"></div>
        <div class="privacy-img">
          <img src="../img/privacy-icon.png" alt="" />
        </div>
        <div class="privacy-tips">
          您的 RainyMusic ID 信息被用于确保您能够安全登录并访问您的数据。<a
            href=""
            >了解数据的管理方式。</a
          >
        </div>
        <div>
          我已有 RainyMusic ID。
          <router-link to="/login"
            >马上登录
            <i class="fa fa-angle-double-right" aria-hidden="true"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegUser",
  data() {
    return {
      userName: "", //输入的用户名
      userPassword: "", //输入的密码
      checkTip: "", //验证提示
    };
  },
  methods: {
    //验证id
    idCheck: function (input) {
      this.$axios
        .post("/user/regUserNameCheck", {
          username: input,
        })
        .then((res) => {
          this.checkTip = res.data.message;
          if (!this.checkTip) {
            this.$refs.userIdInput.style.borderBottomLeftRadius = "0px";
            this.$refs.userIdInput.style.borderBottomRightRadius = "0px";
            this.$router.push({
              name: "regPassword",
            });
            this.$refs.loginNext.style.top = "45px";
          }
        });
    },
    regUser() {
      this.$axios
        .post("/user/userReg", {
          username: this.userName,
          password: this.userPassword,
        })
        .then((res) => {
          this.$router.push({
            name: "regSuccess",
            params: {
              username: this.userName,
            },
          });
        });
    },
    clickOtherAreaToClose: function () {
      this.$router.push("/");
    },
  },
  mounted() {
    this.$bus.$on("getPwdMsg", (msg, pwd) => {
      this.checkTip = msg;
      this.userPassword = pwd;
    });
  },
  beforeDestroy() {
    this.$bus.$off("getPwdMsg");
  },
};
</script>

<style scoped>
.reg-user-page-mask {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 100vw;
  height: 100vh;
  background-color: rgba(1, 1, 1, 0.3);
  z-index: 999;
}

.reg-user-page {
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

.reg-user-title {
  margin-top: 20px;
  margin-bottom: 20px;
}

.reg-user-title span:nth-child(1) {
  font-weight: 900;
  margin-right: 16px;
  vertical-align: bottom;
}

.user-name {
  width: 280px;
  margin: 0 auto;
  border: solid 1px #d6d6d6;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  z-index: 10;
}

.reg-user-next {
  width: 45px;
  height: 45px;
  position: absolute;
  right: 0px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.reg-user-next i {
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
}

.reg-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  background-color: white;
  color: royalblue;
  opacity: 1;
  cursor: pointer;
}

.reg-tips .separator {
  max-width: 300px;
  height: 1px;
  margin: 10px auto;
  background-color: #d6d6d6;
  font-weight: 100;
}

.privacy-img {
  margin: 5px 0;
}

.privacy-img img {
  width: 30px;
}

.privacy-tips {
  width: 280px;
  margin: 0 auto;
  font-size: 12px;
  font-weight: 100;
}

.reg-tips div:nth-child(4) {
  margin: 10px 0;
  font-size: 12px;
  font-weight: 100;
}

.reg-tips a {
  text-decoration: none;
  color: royalblue;
  font-size: 12px;
  font-weight: 500;
}

a:hover {
  text-decoration: underline;
}
</style>
