const router = require("koa-router")();
const {
  rentlist,
  seeklist,
  getCarport,
  getCarInfo,
} = require("../controller/index");

// 查询出租车位列表接口
router.get("/rentlist", rentlist);
// 查询寻找车位列表接口
router.get("/seeklist", seeklist);
// 查询用户车位信息
router.get("/carport", getCarport);
// 查询用户车的信息
router.get("/car", getCarInfo);

module.exports = router;
