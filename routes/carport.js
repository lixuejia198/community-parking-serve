const router = require("koa-router")();
const {
  getCarport,
  addCarport,
  userBindCarport,
  rentCarport,
  rentCarportTime,
  getCarportLog,
  useCarport,
} = require("../controller/carport");
router.prefix("/carport");

// 查询所有车位
router.get("/", getCarport);
// 添加车位
router.post("/add", addCarport);
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

module.exports = router;
