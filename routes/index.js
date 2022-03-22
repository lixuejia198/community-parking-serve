const router = require("koa-router")();
const { rentlist, seeklist } = require("../controller/index");
const { getCarport } = require("../controller");

// 查询出租车位列表接口
router.get("/rentlist", rentlist);
// 查询寻找车位列表接口
router.get("/seeklist", seeklist);
// 查询车位信息
router.get("/carport", getCarport);

module.exports = router;
