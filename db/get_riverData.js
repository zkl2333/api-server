/** @format */

const q = require("./q");

async function getRiverData(config) {
	if (config == undefined) {
		res = await q({
			// sql: "SELECT * FROM riverData;",
			sql: `SELECT
			riverData.riverId,
			riverData.districtId,
			riverData.riverName
			FROM riverData,riverQuality
			WHERE riverData.riverId=riverQuality.riverId
			GROUP BY riverData.riverId
			HAVING COUNT(riverQuality.riverId)>=6`
		});
	} else {
		res = await q({
			sql: "SELECT * FROM riverData WHERE ?? = ?;",
			values: config
		});
	}
	return res;
}

module.exports = getRiverData;
