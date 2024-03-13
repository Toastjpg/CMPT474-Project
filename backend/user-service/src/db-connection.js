const mysql = require('mysql')
// using docker network
const pool = mysql.createPool({
    host: 'mysqldb',
    user: 'root',
    password: 'root@sfu-oclp',
    database: 'sfu_oclp_user_db',
    connectionLimit: 100,
    multipleStatements: true
})
// using external container
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'root@sfu-oclp',
//     database: 'sfu_oclp_user_db',
//     connectionLimit: 100,
//     multipleStatements: true
// })
module.exports = { pool }