/** @format */

const router = require("koa-router")();
const getApi = require("../action/get_api");
const database = require("../db/database");

router.prefix("/water");

router.get("/", async (ctx, next) => {
	ctx.body = await getApi();
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

router.get("/districtLists", async (ctx, next) => {
	res = await jsonRes(async () => {
		return await database.getDistrictLists();
	});
	ctx.body = res;
});

router.get("/reverData", async (ctx, next) => {
	let config;
	if (ctx.query.riverId) {
		config = ["riverId", ctx.query.riverId];
	} else if (ctx.query.riverSerialNum) {
		config = ["riverSerialNum", ctx.query.riverSerialNum];
	}
	res = await jsonRes(async () => {
		return await database.getRiverData(config);
	});
	ctx.body = res;
});

router.get("/riverquality", async (ctx, next) => {
	ctx.body = await getApi({
		method: "riverwaterquality_data_get",
		params: {
			stationId: "HDXH0052",
			indexId: 1
		}
	});
});

router.get("/complain", async (ctx, next) => {
	ctx.body = await getApi({
		method: "Get_ChiefComplain_Content",
		params: {
			complianId: 168
		}
	});
});

module.exports = router;
