const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password: 'iremide.nexzy10',
    database:'employee_db'
})


module.exports = mysqlPool 

