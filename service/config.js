// 全局配置文件
// 向外共享加密和还原Token的jwtSecretKey字符串
module.exports = {
    // 加密和解密Token的秘钥
    jwtSecretKey: 'RainyMusic',
    // token有效期
    expiresIn: '10h'
}