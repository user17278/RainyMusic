<template>
    <div class="other-login">
        <div class="login-title">
            <span>其他的登录方式</span>
        </div>
        <div class="login-select">
            <span class="login-way">
                <router-link to="/phoneLogin" class="login-way-link" active-class="login-way-active">手机登录</router-link>
            </span>
            <div class="line"></div>
            <span class="login-way">
                <router-link to="/emailLogin" class="login-way-link" active-class="login-way-active">邮箱登录</router-link>
            </span>
            <div class="line"></div>
            <span class="login-way">
                <router-link to="/codeLogin" class="login-way-link" active-class="login-way-active">二维码登录</router-link>
            </span>
        </div>
        <router-view></router-view>
        <div class="separator"></div>
        <div class="back">
            <router-link to="/login"><i class="fa fa-angle-double-left" aria-hidden="true"></i> 使用 RainyMusic ID 登录
            </router-link>
        </div>

    </div>
</template>

<script>
export default {
    name: 'OtherLogin',
}
</script>

<style scoped>
.other-login {
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

.separator {
    max-width: 300px;
    height: 1px;
    margin: 20px auto;
    background-color: #d6d6d6;
    font-weight: 100;

}

.back a {
    font-size: 12px;
    text-decoration: none;
    color: royalblue;
}

.back a:hover {
    text-decoration: underline;
}


.login-title {
    margin-top: 20px;
    margin-bottom: 20px;
}

.login-title span:nth-child(1) {
    font-weight: 900;
    vertical-align: bottom;
}


.line {
    display: inline-block;
    width: 1px;
    height: 21px;
    vertical-align: bottom;
    background-color: #d6d6d6;
    font-weight: 100;
}

.login-way {
    display: inline-block;
    width: 190px;
    font-size: 16px;
}

.login-way a {
    text-decoration: none;
}

.login-way-link {
    color: #d6d6d6;
    font-size: 12px;
}

.login-way-active {
    color: royalblue;
    font-size: 16px;

}
</style>