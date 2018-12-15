const router = require('koa-router')()

const getData = require('../action/get_api')

router.prefix('/water')


router.get('/', async (ctx, next) => {
    ctx.body = await getData()
})

router.get('/districtLists', async (ctx, next) => {
    // console.log(await getData())
    ctx.body = await getData()
})

router.get('/riverData', async (ctx, next) => {
    ctx.body = await getData({
        method: 'Get_NewRiverSearch_Data',
        params: {
            "pageSize": 5,
            "currentPage": 1,
            "searchContent": "",
            "searchDistrictId": 10
        }
    })
})

router.get('/complain', async (ctx, next) => {
    ctx.body = await getData({
        method: 'Get_ChiefComplain_Content',
        params: {
            "complianId": 168
        }
    })
})

router.get('/riverwaterquality', async (ctx, next) => {
    ctx.body = await getData({
        method: 'riverwaterquality_data_get',
        params: {
            "stationId": "HDXH0052",
            "indexId": 1
        }
    })
})

module.exports = router