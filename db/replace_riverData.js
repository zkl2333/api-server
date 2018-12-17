/** @format */

const getApi = require("../action/get_api");
const pool = require("./pool");
const database = require("../db/database");

async function replaceRiverData() {
	let RiverLists = await database.getRiverData();
	for (let k in RiverLists) {
		console.log("get", RiverLists[k].riverSerialNum);
		let isError = false;
		let res;
		try {
			res = await getApi({
				method: "Get_NewRiverSearch_Data",
				params: {
					stationId: "HDXH0017",
					indexId: 1
				}
			});
		} catch (error) {
			isError = true;
			console.log(error);
			// console.log('网络错误')
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
			if (velue != "") {
				await new Promise(function(resolve, reject) {
					try {
						pool.query(
							`REPLACE INTO riverData(riverLevel,riverId,districtName,districtId,
	waterType,riverSerialNum,riverPicPath,riverName,ifCare)VALUES ${velue};`,
							function(error, results, fields) {
								resolve(results);
								if (error) console.log(error.sql, error);
								console.log("insertId " + results.insertId);
								console.log(
									"serverStatus" + results.serverStatus
								);
							}
						);
					} catch (error) {
						reject(error);
					}
				});
			} else {
				console.log("空值");
			}
		}
	}
}
replaceRiverData().then(() => {
	console.log("down");
});
