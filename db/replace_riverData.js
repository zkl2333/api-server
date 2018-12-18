/** @format */

const getApi = require("../action/get_api");
const pool = require("./pool");
const database = require("../db/database");

async function replaceRiverData() {
	let j = 1;
	let n = 0; //重试次数
	for (let i = 1; i <= j; i++) {
		let isError = false;
		let res;
		try {
			res = await getApi({
				method: "Get_NewRiverSearch_Data",
				params: {
					pageSize: 20,
					currentPage: i,
					searchContent: ""
				}
			});
			console.log("当前第", i, "页,共", j, "页");
			j = res.data.pageInfo.totalPages;
		} catch (error) {
			i--;
			isError = true;
			console.log(error.message);
			console.log(
				"网络错误,重试第",
				++n,
				"次。当前第",
				i,
				"页,共",
				j,
				"页"
			);
			if (n > 5) {
				i++;
				n = 0;
				console.log("跳过当前");
			}
		}
		if (!isError) {
			n = 0; //清除重试次数
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
	console.log("down");
}
replaceRiverData();
