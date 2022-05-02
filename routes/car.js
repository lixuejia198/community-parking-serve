const router = require("koa-router")();
const { getCar, addCar, seekCarportTime } = require("../controller/car");
router.prefix("/car");

// 查询车辆信息
router.get("/", getCar);
// 添加车辆
router.post("/add", addCar);
// 查询车辆使用车位时间
router.get("/seek_time", seekCarportTime);

module.exports = router;
