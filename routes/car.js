const router = require("koa-router")();
const {
  getCar,
  addCar,
  seekCarportTime,
  seekCarport,
  getCarLog,
} = require("../controller/car");
router.prefix("/car");

// 查询车辆信息
router.get("/", getCar);
// 添加车辆
router.post("/add", addCar);
// 添加到寻找车位
router.post("/seek", seekCarport);
// 查询车辆使用车位时间
router.get("/seek_time", seekCarportTime);
// 查询车辆日志
router.get("/log", getCarLog);

module.exports = router;
