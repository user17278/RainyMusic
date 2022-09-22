<template>
  <div class="login-box">
    <div class="phone-num">
      <button class="login-next" ref="loginNext">
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </button>
      <input type="text" ref="numInput" placeholder="手机号码" v-model="numInput" v-on:keyup.enter="numSuccess(numInput)" />
      <router-view></router-view>
    </div>
    <div class="captcha">
      <input type="text" ref="captcha" placeholder="验证码" />
      <button>获取验证码</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PhoneLogin",
    data() {
      return {
        numInput: null,
      };
    },
    methods: {
      // 获取手机号码
      numSuccess: function (numInput) { },
    },
  };
</script>

<style scoped>
  .login-box {
    width: 280px;
    margin: 0 auto;
    margin-top: 50px;
  }

  .phone-num {
    width: 280px;
    margin: 0px auto;
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

  .phone-num input {
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

  .phone-num input:last-child {
    display: block;
    width: 280px;
    height: 45px;
    border: none;
    color: black;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 100;
  }

  .captcha {
    width: 280px;
    margin: 20px auto;
    overflow: hidden;
    position: relative;
    margin-bottom: 57px;
  }

  .captcha input {
    display: block;
    width: 160px;
    height: 45px;
    border: solid 1px #d6d6d6;
    border-radius: 10px;
    color: black;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 100;
  }

  .captcha input:focus,
  .phone-num input:focus {
    border: solid 3px royalblue;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .captcha button {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100px;
    height: 45px;
    border: solid 1px #d6d6d6;
    border-radius: 10px;
    background-color: royalblue;
    color: white;
    cursor: pointer;
    font-size: 16px;
  }
</style>