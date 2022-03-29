const router = require("koa-router")();
const { rentList, seekList } = require("../controller/index");

// 查询出租车位列表接口
router.get("/rentlist", rentList);
// 查询寻找车位列表接口
router.get("/seeklist", seekList);

module.exports = router;
