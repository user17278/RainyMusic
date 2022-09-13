<template>
    <div class="reg-user-page-mask" v-on:click.self="clickOtherAreaToClose">
        <div class="reg-user-page">
            <div class="reg-user-title">
                <span>注册成功</span>
            </div>
            <div class="success-tips">
                <div>
                    <span>您好！</span><span>{{ userName }}</span>，
                </div>
                <div>您已注册成为 RainyMusic 的用户，</div>
                <div>感谢您的支持！祝您生活愉快。</div>
                <router-link to="/login">马上登录
                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                </router-link>
            </div>
            <div class="reg-tips">
                <div class="separator"></div>
                <div class="privacy-img"><img src="../img/privacy-icon.png" alt=""></div>
                <div class="privacy-tips">您的 RainyMusic ID 信息被用于确保您能够安全登录并访问您的数据。<a href="">了解数据的管理方式。</a></div>
                <div>我已有 RainyMusic ID。
                    <router-link to="/login">马上登录
                        <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'regSuccess',
    data() {
        return {
            userName: null,
        }
    },
    mounted() {
        localStorage.setItem('isLogin', 'isLogin')
        this.userName = this.$route.params.username
    }
}
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


.success-tips div:nth-child(1) {
    margin: 20px 0;
}

.success-tips div:nth-child(1) span:nth-child(1) {
    font-size: 28px;
}

.success-tips div:nth-child(1) span:nth-child(2) {
    font-size: 28px;
    color: royalblue;
}

.success-tips div:nth-child(2),
.success-tips div:nth-child(3) {
    margin-top: 5px;
    font-size: 18px;
}

.success-tips div:nth-child(3) {
    margin-bottom: 7px;
}

.success-tips a {
    text-decoration: none;
    color: royalblue;
    font-size: 16px;
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

.reg-tips {
    margin-top: 15px;
}

.reg-tips .separator {
    max-width: 300px;
    height: 1px;
    margin: 10px auto;
    background-color: #d6d6d6;
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