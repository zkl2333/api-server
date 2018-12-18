/** @format */

const axios = require("axios");
const http = require("http");
const api = "http://220.191.208.69:8080/ShuiHuanJingFabu/background/app.htm";

async function getData(apiConfig) {
	const app_sign = "a7de98e424197d34d3bfdcd46bdebb2c";
	const timestamp = Date.now();
	let data;
	config = {
		method: "get",
		url: api,
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36"
		},
		params: {
			app_sign,
			app_key: apiConfig ? 1000 : "",
			...apiConfig,
			timestamp
		},
		timeout: 20000, //降低错误概率
		httpAgent: new http.Agent({ keepAlive: true })
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
