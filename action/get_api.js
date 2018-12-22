/** @format */

const axios = require("axios");
const http = require("http");

async function getData(apiConfig = {}) {
	let data;
	if (apiConfig.type == "air" || apiConfig.type == "pm") {
		let api =
			"http://web.juhe.cn:8080/environment/air/" +
			(apiConfig.type == "pm" ? "pm" : "cityair");
		console.log(api);
		// 空气质量api
		config = {
			method: "get",
			url: api,
			params: {
				key: "9182edec05af05f68b4a36018182c73c",
				...apiConfig
			}
		};
	} else {
		// 水质api
		const api =
			"http://220.191.208.69:8080/ShuiHuanJingFabu/background/app.htm";
		const app_sign = "a7de98e424197d34d3bfdcd46bdebb2c";
		const timestamp = Date.now();
		config = {
			method: "get",
			url: api,
			params: {
				app_sign,
				app_key: apiConfig.method ? 1000 : "",
				...apiConfig,
				timestamp
			}
		};
	}
	config = {
		...config,
		timeout: 20000, //降低错误概率
		httpAgent: new http.Agent({ keepAlive: true }),
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36"
		}
	};
	await axios(config)
		.then(function(response) {
			data = response.data;
		})
		.catch(function(error) {
			// console.log(error);
			throw error;
		});
	return data;
}

module.exports = getData;
