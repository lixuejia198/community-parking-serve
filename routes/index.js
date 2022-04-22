const router = require("koa-router")();
const { rentList, seekList, cityList } = require("../controller");
// 查询出租车位列表接口
router.get("/rentlist", rentList);
// 查询寻找车位列表接口
router.get("/seeklist", seekList);
// 查询城市列表
router.get("/citylist", cityList);

module.exports = router;
