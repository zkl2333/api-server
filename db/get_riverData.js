/** @format */

const q = require("./q");

async function getRiverData(config) {
	if(config==undefined){
		res = await q({
			sql: "SELECT * FROM `riverData`;",
		});
	}else{
		res = await q({
			sql: "SELECT * FROM `riverData` WHERE ?? = ?;",
			values: config
		});
	}
	return res;
}

module.exports = getRiverData;
