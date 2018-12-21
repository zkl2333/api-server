/** @format */

const router = require("koa-router")();
const getApi = require("../action/get_api");
const database = require("../db/database");

router.prefix("/air");

router.get("/cityair", async (ctx, next) => {
	// ctx.body = await getApi({
	// 	type: "air",
	// 	...ctx.query
	// });
	ctx.body = {
		resultcode: "200",
		reason: "SUCCESSED!",
		error_code: 0,
		result: [
			{
				citynow: {
					city: "杭州",
					AQI: "97",
					quality: "良",
					date: "2018-12-20 13:00"
				},
				lastTwoWeeks: {
					"1": {
						city: "杭州",
						AQI: "71",
						quality: "良",
						date: "2018-11-22"
					},
					"2": {
						city: "杭州",
						AQI: "77",
						quality: "良",
						date: "2018-11-23"
					},
					"3": {
						city: "杭州",
						AQI: "89",
						quality: "良",
						date: "2018-11-24"
					},
					"4": {
						city: "杭州",
						AQI: "100",
						quality: "良",
						date: "2018-11-25"
					},
					"5": {
						city: "杭州",
						AQI: "68",
						quality: "良",
						date: "2018-11-26"
					},
					"6": {
						city: "杭州",
						AQI: "103",
						quality: "轻度污染",
						date: "2018-11-27"
					},
					"7": {
						city: "杭州",
						AQI: "139",
						quality: "轻度污染",
						date: "2018-11-28"
					},
					"8": {
						city: "杭州",
						AQI: "127",
						quality: "轻度污染",
						date: "2018-11-29"
					},
					"9": {
						city: "杭州",
						AQI: "125",
						quality: "轻度污染",
						date: "2018-11-30"
					},
					"10": {
						city: "杭州",
						AQI: "141",
						quality: "轻度污染",
						date: "2018-12-01"
					},
					"11": {
						city: "杭州",
						AQI: "86",
						quality: "良",
						date: "2018-12-02"
					},
					"12": {
						city: "杭州",
						AQI: "80",
						quality: "良",
						date: "2018-12-03"
					},
					"13": {
						city: "杭州",
						AQI: "35",
						quality: "优",
						date: "2018-12-04"
					},
					"14": {
						city: "杭州",
						AQI: "61",
						quality: "良",
						date: "2018-12-05"
					},
					"15": {
						city: "杭州",
						AQI: "25",
						quality: "优",
						date: "2018-12-06"
					},
					"16": {
						city: "杭州",
						AQI: "24",
						quality: "优",
						date: "2018-12-07"
					},
					"17": {
						city: "杭州",
						AQI: "43",
						quality: "优",
						date: "2018-12-08"
					},
					"18": {
						city: "杭州",
						AQI: "40",
						quality: "优",
						date: "2018-12-09"
					},
					"19": {
						city: "杭州",
						AQI: "29",
						quality: "优",
						date: "2018-12-10"
					},
					"20": {
						city: "杭州",
						AQI: "30",
						quality: "优",
						date: "2018-12-11"
					},
					"21": {
						city: "杭州",
						AQI: "124",
						quality: "轻度污染",
						date: "2018-12-12"
					},
					"22": {
						city: "杭州",
						AQI: "166",
						quality: "中度污染",
						date: "2018-12-13"
					},
					"23": {
						city: "杭州",
						AQI: "122",
						quality: "轻度污染",
						date: "2018-12-14"
					},
					"24": {
						city: "杭州",
						AQI: "108",
						quality: "轻度污染",
						date: "2018-12-15"
					},
					"25": {
						city: "杭州",
						AQI: "88",
						quality: "良",
						date: "2018-12-16"
					},
					"26": {
						city: "杭州",
						AQI: "90",
						quality: "良",
						date: "2018-12-17"
					},
					"27": {
						city: "杭州",
						AQI: "101",
						quality: "轻度污染",
						date: "2018-12-18"
					},
					"28": {
						city: "杭州",
						AQI: "103",
						quality: "轻度污染",
						date: "2018-12-19"
					}
				},
				lastMoniData: {
					"1": {
						city: "滨江",
						AQI: "74",
						America_AQI: "128",
						quality: "良",
						"PM2.5Hour": "54",
						"PM2.5Day": "54",
						PM10Hour: "95",
						lat: "30.21",
						lon: "120.210833"
					},
					"2": {
						city: "西溪",
						AQI: "78",
						America_AQI: "130",
						quality: "良",
						"PM2.5Hour": "55",
						"PM2.5Day": "55",
						PM10Hour: "106",
						lat: "30.27472222",
						lon: "120.0633333"
					},
					"3": {
						city: "千岛湖",
						AQI: "33",
						America_AQI: "33",
						quality: "优",
						"PM2.5Hour": "—",
						"PM2.5Day": "—",
						PM10Hour: "—",
						lat: "29.640581",
						lon: "119.025965"
					},
					"4": {
						city: "下沙",
						AQI: "124",
						America_AQI: "167",
						quality: "轻度污染",
						"PM2.5Hour": "94",
						"PM2.5Day": "94",
						PM10Hour: "139",
						lat: "30.30583333",
						lon: "120.3480556"
					},
					"5": {
						city: "卧龙桥",
						AQI: "84",
						America_AQI: "144",
						quality: "良",
						"PM2.5Hour": "62",
						"PM2.5Day": "62",
						PM10Hour: "98",
						lat: "30.246",
						lon: "120.128"
					},
					"6": {
						city: "浙江农大",
						AQI: "93",
						America_AQI: "152",
						quality: "良",
						"PM2.5Hour": "69",
						"PM2.5Day": "69",
						PM10Hour: "111",
						lat: "30.268",
						lon: "120.193"
					},
					"7": {
						city: "朝晖五区",
						AQI: "122",
						America_AQI: "165",
						quality: "轻度污染",
						"PM2.5Hour": "92",
						"PM2.5Day": "92",
						PM10Hour: "148",
						lat: "30.288",
						lon: "120.171"
					},
					"8": {
						city: "和睦小学",
						AQI: "95",
						America_AQI: "152",
						quality: "良",
						"PM2.5Hour": "70",
						"PM2.5Day": "70",
						PM10Hour: "140",
						lat: "30.31194444",
						lon: "120.1197222"
					},
					"9": {
						city: "临平镇",
						AQI: "114",
						America_AQI: "162",
						quality: "轻度污染",
						"PM2.5Hour": "86",
						"PM2.5Day": "86",
						PM10Hour: "143",
						lat: "30.418333",
						lon: "120.300556"
					},
					"10": {
						city: "城厢镇",
						AQI: "114",
						America_AQI: "162",
						quality: "轻度污染",
						"PM2.5Hour": "86",
						"PM2.5Day": "86",
						PM10Hour: "157",
						lat: "30.18194444",
						lon: "120.2697222"
					},
					"11": {
						city: "云栖",
						AQI: "72",
						America_AQI: "124",
						quality: "良",
						"PM2.5Hour": "52",
						"PM2.5Day": "52",
						PM10Hour: "72",
						lat: "30.18083333",
						lon: "120.0883333"
					}
				}
			}
		]
	};
});

router.get("/pm", async (ctx, next) => {
	// ctx.body = await getApi({
	// 	type: "pm",
	// 	...ctx.query
	// });
	ctx.body = {
		resultcode: "200",
		reason: "SUCCESSED!",
		result: [
			{
				city: "杭州",
				"PM2.5": "89",
				AQI: "119",
				quality: "轻度污染",
				PM10: "151",
				CO: "1.3",
				NO2: "80",
				O3: "6",
				SO2: "11",
				time: "2018-12-20 19:42:29"
			}
		],
		error_code: 0
	};
});

async function jsonRes(fun) {
	try {
		let data = await fun();
		if (data == "") {
			throw new Error("no data");
		}
		res = { status: "ok", data };
	} catch (error) {
		res = { status: "error", data: null, error: error.message };
	}
	console.log(res);
	return res;
}

module.exports = router;
