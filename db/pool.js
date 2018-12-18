/** @format */

const mysql = require("mysql");

const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.host || "localhost",
	user: process.env.user || "api_server_admin",
	password: process.env.password,
	database: process.env.database || "api_server"
});

module.exports = pool;
