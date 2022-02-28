const router = require("koa-router")();
const { login, register } = require("../controller/users");
router.prefix("/users");

// 用户注册接口
router.post("/register", register);

// 用户登录接口
router.post("/login", login);

module.exports = router;
