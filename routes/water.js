/** @format */

const router = require("koa-router")();
const getApi = require("../action/get_api");
const database = require("../db/database");

router.prefix("/water");

router.get("/", async (ctx, next) => {
	ctx.body = await getApi();
});

router.get("/districtLists", async (ctx, next) => {
	let data = await database.getDistrictLists();
	ctx.body = { status: "ok", data };
});

router.get("/riverData", async (ctx, next) => {
	ctx.body = await getApi({
		method: "Get_NewRiverSearch_Data",
		params: {
			pageSize: 5,
			currentPage: 1,
			searchContent: "",
			searchDistrictId: 10
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

router.get("/riverwaterquality", async (ctx, next) => {
	ctx.body = await getApi({
		method: "riverwaterquality_data_get",
		params: {
			stationId: "HDXH0052",
			indexId: 1
		}
	});
});

module.exports = router;
