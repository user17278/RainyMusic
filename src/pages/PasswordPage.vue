<template>

    <input type="password" v-model="pwdInput" v-on:keyup.enter="pwdSuccess(pwdInput)">
    <!-- 回车提交Ajax请求 -->
</template>

<script>
export default {
    name: 'PasswordPage',
    data() {
        return {
            pwdInput: '',
            user: {
                id: '123',
                pwd: '123',
            }
        }
    },
    methods: {
        // 验证密码
        pwdSuccess: function (pwd) {
            if (this.user.pwd == pwd) {
                console.log('密码正确');
                this.$bus.$emit('getPwdMsg', '')
                this.$bus.$emit('loginStatus', true)
                this.$axios('login', {
                    userId: this.user.id,
                    userPwd: this.user.pwd
                }).then(res => {
                    console.log(res);
                })
                this.$router.push('/')
            } else {
                this.$bus.$emit('getPwdMsg', '密码错误')
                this.$bus.$emit('loginStatus', false)
            }
        }
    },

}
</script>

<style scoped>
input {
    height: 0;
}
</style>