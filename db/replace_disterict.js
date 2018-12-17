/** @format */

const getData = require("../action/get_api");
const pool = require("./pool");

getData()
	.then((data) => {
		return data.data.districtLists;
	})
	.then((districtListsJsonObj) => {
		let velue = "";
		for (let k in districtListsJsonObj) {
			if (k != 0) velue += ",";
			velue += `(${districtListsJsonObj[k].districtId},'${
				districtListsJsonObj[k].districtName
			}')`;
		}
		return velue;
	})
	.then((velue) => {
		pool.query(
			`REPLACE INTO districtLists(districtId, districtName) VALUES ${velue};`,
			function(error, results, fields) {
				if (error) throw error;
				console.log("The message is: ", results.message);
			}
		);
	});
