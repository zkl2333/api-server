/** @format */

const getApi = require("../action/get_api");
const pool = require("./pool");
const database = require("../db/database");

async function replaceWaterQuality() {
	try {
		var riverData = await database.getRiverData();
	} catch (error) {
		throw error;
	}
	let indexType = [
		{
			NameEN: "DO",
			Unit: "mg/l",
			NameCH: "溶解氧"
		},
		{
			NameEN: "CODMn",
			Unit: "mg/l",
			NameCH: "高锰酸盐指数"
		},
		{
			NameEN: "NH3N",
			Unit: "mg/l",
			NameCH: "氨氮"
		},
		{
			NameEN: "TP",
			Unit: "mg/l",
			NameCH: "总磷"
		},
		{
			NameEN: "ORP",
			Unit: "mv",
			NameCH: "氧化还原电位"
		},
		{
			NameEN: "Transp",
			Unit: "mg/l",
			NameCH: "透明度"
		}
	];
	for (let k in riverData) {
		let n = 0; //重试次数
		for (let i = 0; i < 6; i++) {
			try {
				console.log(
					"获取",
					riverData[k].riverId,
					riverData[k].riverName,
					i == 0 ? "六项水质，以及" : "",
					indexType[i].NameCH + " 的历史数据"
				);
				let res;
				let riverId = riverData[k].riverId;
				try {
					//获取api
					res = await getApi({
						method: "riverwaterquality_data_get",
						params: {
							stationId: riverData[k].riverSerialNum,
							indexId: i + 1
						}
					});
				} catch (error) {
					i--;
					// console.log(error.message);
					if (n < 5) {
						console.log("重试", ++n, "次");
					} else {
						console.log("放弃");
						i++;
						n = 0;
					}
					throw error;
				}
				try {
					//插入数据
					try {
						var velue = "";
						var riverwaterquality = res.data.indexDatas;
						var waterLevel = res.data.waterLevel;
						var uploadTime = res.data.uploadTime.time;
					} catch {
						throw new Error("无数据");
					}
					if (i == 0) {
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
					}

					let indexValues = res.data.indexValues;
					for (let k in indexValues) {
						if (i == 0 || k != 0) velue += ",";
						velue += `(${riverId},
						null,
						${indexValues[k].getTime.time},
						null,
						${indexValues[k].indexValue},
						'${indexType[i].Unit}',
						'${indexType[i].NameEN}',
						'${indexType[i].NameCH}')`;
					}
					velue = velue.replace(/ *[\r|\n|\t] */gm, "");
				} catch (error) {
					console.log("\t>数据解析错误");
					throw error;
				}
				try {
					await new Promise(function(resolve, reject) {
						try {
							pool.query(
								`REPLACE INTO riverQuality(riverId,waterLevel,uploadTime,Level,Value,Unit,NameEN,NameCH) VALUES ${velue};`,
								function(error, results, fields) {
									resolve(results);
									if (error) console.log(error.sql, error);
									console.log(
										"\t>数据插入成功\n\t>",
										results.message
									);
								}
							);
						} catch (error) {
							reject(error);
						}
					});
				} catch (error) {
					console.log("数据库错误");
					throw error;
				}
			} catch (error) {
				console.log("\t>" + error.message);
			}
		}
	}
}
replaceWaterQuality()
	.then(() => {
		console.log("运行结束");
	})
	.catch((error) => {
		console.log(error);
	});
