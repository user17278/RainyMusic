const joi = require('joi')
const username = joi.string().alphanum().min(1).max(10).required().error(new Error('用户名格式不正确'))
const password = joi.string().pattern(/^[\S]{1,10}$/).required().error(new Error('密码格式不正确'))

// 验证用户名
exports.username_schema = {
    body: {
        username
    }
}
// 验证密码
exports.password_schema = {
    body: {
        password
    }
}
// 注册表单的验证规则对象
exports.reg_schema = {
    body: {
        username,
        password,
    },
}
// 登录表单的验证规则对象

