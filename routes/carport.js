const router = require("koa-router")();
const {
  getCarport,
  addCarport,
  userBindCarport,
  rentCarport,
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

module.exports = router;
