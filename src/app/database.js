const mysql = require("mysql2")
const config = require("./config")

const connection = mysql.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    database: config.MYSQL_DATABASE,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
})

connection.getConnection((err, conn) => {
    conn.connect(connerr => {
        if (connerr) {
            console.log("数据库连接失败");
        } else {
            console.log("数据库连接成功")
        }
    })
})


module.exports = connection.promise()