const router = require("koa-router")();
const {
  getCarport,
  addCarport,
  userBindCarport,
  rentCarport,
  rentCarportTime,
  getCarportLog,
  useCarport,
  shareCarport,
  untieCarport,
} = require("../controller/carport");
router.prefix("/carport");

// 查询所有车位
router.get("/", getCarport);
// 绑定车位
router.post("/add", addCarport);
// 解绑车位
router.post("/untie", untieCarport);
// 车位绑定用户
router.post("/bind_user", userBindCarport);
// 共享车位
router.post("/rent", rentCarport);
// 查询车位被共享的时间
router.get("/rent_time", rentCarportTime);
// 查询车位日志
router.get("/log", getCarportLog);
// 使用车位
router.post("/use", useCarport);
// 共享车位给车辆
router.post("/share", shareCarport);

module.exports = router;
