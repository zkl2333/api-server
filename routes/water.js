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

router.get("/reverLists", async (ctx, next) => {
	res = await jsonRes(async () => {
		let reverLists = await database.getRiverData();
		let districtLists = await database.getDistrictLists();
		for (let i in districtLists) {
			districtLists[i].rivers = [];
			for (let j in reverLists) {
				if (districtLists[i].districtId == reverLists[j].districtId) {
					districtLists[i].rivers.push(reverLists[j]);
				}
			}
		}
		for (let i in districtLists) {
			if (districtLists[i].rivers.length == 0) {
				districtLists.splice(i, 1);
			}
		}
		return districtLists;
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
	let config;
	if (ctx.query.riverId) {
		config = ["riverId", ctx.query.riverId];
	} else if (ctx.query.riverSerialNum) {
		config = ["riverSerialNum", ctx.query.riverSerialNum];
	}
	res = await jsonRes(async () => {
		return await database.riverquality(config);
	});
	ctx.body = res;
});

router.get("/oneriver", async (ctx, next) => {
	ctx.body = await getApi({
		method: "oneriver_data_get",
		params: {
			riverId: ctx.query.riverId
		}
	});
});

module.exports = router;
