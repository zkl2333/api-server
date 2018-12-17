/** @format */

const pool = require("./pool");

async function q(config) {
	let res = await new Promise((resolve, reject) => {
		let query = pool.query(config, function(error, results, fields) {
			// if (error) throw error;
			if (error) reject(error);
			resolve(results);
		});
		console.log(query.sql);
	});
	return res;
}

module.exports = q;
