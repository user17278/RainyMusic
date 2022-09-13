// 路由模块中，只存放客户端的请求与处理函数之间的映射关系
const express = require('express')
// 创建路由对象
const route = express.Router()
//导入处理函数模块 
const userHandler = require('../router_handler/user')
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { username_schema, password_schema, reg_schema } = require('../schema/user')
route.post('/regUserNameCheck', expressJoi(username_schema), userHandler.userNameCheck)
route.post('/regPasswordCheck', expressJoi(password_schema), userHandler.userPasswordCheck)
// 注册新用户
route.post('/userReg', expressJoi(reg_schema), userHandler.userReg)
// 登录
// 登录验证用户名
route.post('/userNameCheck', expressJoi(username_schema), userHandler.userNameCheck)
// 登录用户名密码表单验证
route.post('/userLog', expressJoi(reg_schema), userHandler.userLog)
module.exports = route