<template>
    <div class="login-box">
        <div class="email-num">
            <!-- <button class="login-next" ref="loginNext"><i class="fa fa-angle-right" aria-hidden="true"></i></button> -->
            <input type="text" ref="emailInput" placeholder="邮箱" v-model="emailInput"
                v-on:keyup.enter="numSuccess(emailInput)">
            <router-view></router-view>
        </div>
        <div class="email-pwd">
            <input type="password" placeholder="密码">
        </div>
        <button>登录</button>
    </div>
</template>

<script>
export default {
    name: 'EmailLogin'
}
</script>

<style scoped>
input::-webkit-input-placeholder {
    color: #d6d6d6
}

.login-box {
    width: 280px;
    margin: 0 auto;
    margin-top: 50px;
}

.email-num,
.email-pwd {
    width: 280px;
    margin: 0px auto;
    margin-top: 10px;
    border: solid 1px #d6d6d6;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
}

.email-num input,
.email-pwd input {
    display: block;
    width: 280px;
    height: 45px;
    border: none;
    color: black;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 100;
}

.email-num input:focus,
.email-pwd input:focus {
    border: solid 3px royalblue;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.login-box button {
    width: 100px;
    height: 35px;
    margin-top: 10px;
    background-color: royalblue;
    border: none;
    border-radius: 10px;
    color: white;
    cursor: pointer;
}
</style>