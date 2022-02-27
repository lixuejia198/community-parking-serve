const router = require("koa-router")();
const { login } = require("../controller/users");
router.prefix("/users");

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })
//
// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

// 用户登录接口
router.post("/login", login);

module.exports = router;
