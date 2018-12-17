const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'ubuntu.zkl2333.com',
    user: 'api_server_admin',
    password: 'apiserver',
    database: 'api_server'
});

module.exports=pool