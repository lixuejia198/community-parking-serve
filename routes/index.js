const router = require("koa-router")();
const { rentlist, seeklist } = require("../controller/index");

// 查询出租车位列表接口
router.get("/rentlist", rentlist);
// 查询寻找车位列表接口
router.get("/seeklist", seeklist);

module.exports = router;
