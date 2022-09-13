const db = require('../db/index')


exports.addFav = (req, res) => {
    const favId = req.body.favId
    const sql = `update user set favArr=? where username=?`
    db.query(sql, [favId.toString(), req.body.username], (err, results) => {
        // SQL 语句执行失败
        if (err) return res.cc(err)
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('添加失败')
        // 更新密码成功
        res.cc('添加成功！', 0)
    })
}
exports.getFav = (req, res) => {
    const username = 123
    const sql = `select favArr from user where username=?`
    db.query(sql, username, function (err, results) {
        const favSongIdArr = results
        res.send(JSON.parse(JSON.stringify(results)))
    })
}