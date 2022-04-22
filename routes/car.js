const router = require("koa-router")();
const { getCar, addCar } = require("../controller/car");
router.prefix("/car");

// 查询车辆信息
router.get("/", getCar);
// 添加车辆
router.post("/add", addCar);

module.exports = router;
