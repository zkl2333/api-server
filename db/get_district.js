/** @format */

const q = require("./q");

async function getDistrictLists() {
	res = await q("SELECT `districtId`, `districtName` FROM `districtLists`;");
	return res;
}

module.exports = getDistrictLists;
