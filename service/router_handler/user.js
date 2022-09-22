// 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
// 路由处理函数模块中，专门负责存放每个路由对应的处理函数
// 导入数据库操作模块
const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
// 验证用户名
exports.userNameCheck = (req, res) => {
    const userInfo = req.body
    const sql = `select * from user where username=?`
    db.query(sql, userInfo.username, function (err, results) {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc('用户名已存在')
        res.cc('')
    })
}
exports.userPasswordCheck = (req, res) => {
    res.cc('')
}
// 注册用户
exports.userReg = (req, res) => {
    const userInfo = req.body
    // 进行bcrypt加密
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)
    //  定义插入用户的 SQL 语句
    const sql = 'insert into user set ?'
    db.query(sql, { username: userInfo.username, password: userInfo.password }, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
            return res.cc('注册用户失败，请稍后再试!')
        }
        // 注册成功
        res.send({ status: 0, message: '注册成功！' })
    })
}
// 登录
exports.userLog = (req, res) => {
    const userInfo = req.body
    const mysql = `select * from user where username=?`
    db.query(mysql, userInfo.username, (err, results) => {
        // 执行SQL语句失败
        if (err) return res.cc(err)
        // 执行成功，但获取到的数据条数不等于1
        if (results.length !== 1) return res.cc('登录失败')
        // 输入密码和数据库密码对比
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('密码错误！')
        }
        const user = { ...results[0], password: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        res.send({
            status: 0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr,
        })
    })
}