/** @format */

const router = require("koa-router")();
const getApi = require("../action/get_api");

router.prefix("/air");

router.get("/cityair", async (ctx, next) => {
	ctx.body = await getApi({
		type: "air",
		...ctx.query
	});
});

router.get("/pm", async (ctx, next) => {
	ctx.body = await getApi({
		type: "pm",
		...ctx.query
	});
});

module.exports = router;
