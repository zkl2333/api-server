/** @format */

const getApi = require("../action/get_api");
const pool = require("./pool");
const database = require("../db/database");

async function replaceWaterQuality() {
	let DistrictLists = await database.getDistrictLists();
	let DistrictLists = await database.getDistrictLists();
	for (let k in DistrictLists) {
		console.log("get", DistrictLists[k].districtId);
		let isError = false;
		let res;
		try {
			res = await getApi({
				method: "riverwaterquality_data_get",
				params: {
					stationId: "HDXH0017",
					indexId: 2
				}
			});
		} catch (error) {
			isError = true;
			console.log(error.messege);
		}
		if (!isError) {
			let riverDataList = res.data.riverSums;
			let velue = "";
			for (let k in riverDataList) {
				if (k != 0) velue += ",";
				velue += `(${riverDataList[k].riverLevel},
						${riverDataList[k].riverId},
						"${riverDataList[k].districtName}",
						${riverDataList[k].districtId},
						${riverDataList[k].waterType},
						"${riverDataList[k].riverSerialNum}",
						"${riverDataList[k].riverPicPath}",
						"${riverDataList[k].riverName}",
						${riverDataList[k].ifCare})`;
			}
			velue = velue.replace(/ *[\r|\n|\t] */gm, "");
			console.log(velue)
	// 		if (velue != "") {
	// 			await new Promise(function(resolve, reject) {
	// 				try {
	// 					pool.query(
	// 						`REPLACE INTO riverData(riverLevel,riverId,districtName,districtId,
	// waterType,riverSerialNum,riverPicPath,riverName,ifCare)VALUES ${velue};`,
	// 						function(error, results, fields) {
	// 							resolve(results);
	// 							if (error) console.log(error.sql, error);
	// 							console.log("insertId " + results.insertId);
	// 							console.log(
	// 								"serverStatus" + results.serverStatus
	// 							);
	// 						}
	// 					);
	// 				} catch (error) {
	// 					reject(error);
	// 				}
	// 			});
	// 		} else {
	// 			console.log("空值");
	// 		}
		}
	}
}
replaceWaterQuality().then(() => {
	console.log("down");
});
