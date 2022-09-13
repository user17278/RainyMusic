<template>
    <input type="password" v-model="pwdInput" v-on:keyup.enter="pwdCheck(pwdInput)">
    <!-- 回车提交Ajax请求 -->
</template>

<script>
export default {
    name: 'RegPassword',
    data() {
        return {
            pwdInput: '',
        }
    },
    methods: {
        // 验证密码
        pwdCheck: function (pwd) {
            this.$axios.post('http://127.0.0.1:3000/user/regPasswordCheck',
                {
                    password: pwd,
                }).then((res => {
                    this.$bus.$emit('getPwdMsg', res.data.message, pwd)
                }))
        }
    }
}
</script>

<style>
input {
    height: 0;
}
</style>