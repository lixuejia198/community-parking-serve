const router = require("koa-router")();
const { getCarport } = require("../controller/carport");
router.prefix("/carport");

// 查询所有车位
router.get("/", getCarport);

module.exports = router;
