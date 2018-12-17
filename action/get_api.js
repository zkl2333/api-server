/** @format */

const axios = require("axios");
const api = "http://220.191.208.69:8080/ShuiHuanJingFabu/background/app.htm";

async function getData(apiConfig) {
	const app_sign = "a7de98e424197d34d3bfdcd46bdebb2c";
	const timestamp = Date.now();
	let data;
	config = {
		method: "get",
		url: api,
		params: {
			app_sign,
			app_key: apiConfig ? 1000 : "",
			...apiConfig,
			timestamp
		}
	};
	await axios(config)
		.then(function(response) {
			data = response.data;
		})
		.catch(function(error) {
			console.log(error);
			data = error.data;
		});
	return data;
}

module.exports = getData;
