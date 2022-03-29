const router = require("koa-router")();
const { rentList, seekList,getCarInfo } = require("../controller/index");
// 查询出租车位列表接口
router.get("/rentlist", rentList);
// 查询寻找车位列表接口
router.get("/seeklist", seekList);
// 查询用户车的信息
router.get("/car", getCarInfo);

module.exports = router;
