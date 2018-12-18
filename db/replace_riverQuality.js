/** @format */

const getApi = require("../action/get_api");
const pool = require("./pool");
const database = require("../db/database");

async function replaceWaterQuality() {
	let riverData = await database.getRiverData();
	for (let k in riverData) {
		try {
			console.log("get", riverData[k].riverId);
			let isError = false;
			let res;
			let riverId = riverData[k].riverId
			try {
				res = await getApi({
					method: "riverwaterquality_data_get",
					params: {
						stationId: riverData[k].riverSerialNum,
						indexId: 1
					}
				});
			} catch (error) {
				isError = true;
				console.log(error.message);
			}
			if (!isError) {
				let riverwaterquality
				let waterLevel
				let uploadTime
				let velue = "";
				try {
					if (res.data.indexDatas != null) {
						riverwaterquality = res.data.indexDatas;
						waterLevel = res.data.waterLevel
						uploadTime = res.data.uploadTime.time
					} else {
						throw new Error('无数据')
					}
					for (let k in riverwaterquality) {
						if (k != 0) velue += ",";
						velue += `(${riverId},
						${waterLevel},
						${uploadTime},
						${riverwaterquality[k].indexLevel},
						${riverwaterquality[k].indexValue},
						'${riverwaterquality[k].indexUnit}',
						'${riverwaterquality[k].indexNameEN}',
						'${riverwaterquality[k].indexNameCH}')`;
					}
					velue = velue.replace(/ *[\r|\n|\t] */gm, "");
					// console.log(velue)
				} catch (error) {
					console.log(error.message)
				}
				if (velue != "") {
					await new Promise(function (resolve, reject) {
						try {
							pool.query(
								`REPLACE INTO riverQuality(riverId,waterLevel,uploadTime,Level,Value,Unit,NameEN,NameCH) VALUES ${velue};`,
								function (error, results, fields) {
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
		} catch (error) {
			console.log(error.message)			
		}
	}
}
replaceWaterQuality().then(() => {
	console.log("down");
});
