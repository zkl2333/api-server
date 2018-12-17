/** @format */

const pool = require("./pool");

function getDistrictLists() {
	return new Promise((resolve, reject) => {
		pool.query(
			"SELECT districtId, districtName FROM districtLists;",
			function(error, results, fields) {
				// if (error) throw error;
				if (error) reject(error);
				resolve(results);
			}
		);
	});
}

module.exports = getDistrictLists;
