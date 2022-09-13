const express = require('express')
const app = express()
const port = 3000
// 导入login子路由
const user = require('./router/user')
const fav = require('./router/fav')
// 导入并配置中间件
const joi = require('joi')
const cors = require('cors')
app.use(cors())
// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// 响应数据的中间件
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
        res.send({
            // 状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})


// 导入配置文件
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/user\//] }))


// 将user挂载到/user的子路由下
app.use("/user", user)
app.use("/fav", fav)
// 定义错误级别中间件
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知错误
    res.cc(err)

})
app.listen(port, () => {
    console.log('服务器运行在http://127.0.0.1:3000');
})