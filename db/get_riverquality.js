/** @format */

const q = require("./q");

async function riverquality(config) {
	if (config != undefined) {
		res = await q({
			sql:
				"SELECT * FROM `riverQuality`  WHERE ?? = ? ORDER BY `uploadTime` DESC;",
			values: config
		});
		return res;
	} else {
		return {};
	}
}

module.exports = riverquality;
