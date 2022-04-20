const router = require("koa-router")();
const { getCar } = require("../controller/car");
router.prefix("/car");

// 查询车辆信息
router.get("/", getCar);

module.exports = router;
