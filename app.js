const Koa = require("koa"); // KOA包
const app = new Koa(); // 创建app服务
const views = require("koa-views"); // 处理静态资源
const json = require("koa-json"); // json格式化
const onerror = require("koa-onerror"); // 处理异常
const bodyparser = require("koa-bodyparser"); // 解析post请求
const logger = require("koa-logger"); // 记录日志
const jwt = require("koa-jwt"); // 引入koa-jwt
const cors = require("koa2-cors"); // 引入koa2-cors

// 配置env
require("dotenv").config();

// 使用cors解决跨域问题
app.use(cors());

// 加载路由
const index = require("./routes/index");
const users = require("./routes/users");

// error handler 错误处理
onerror(app);

// 使用koa-jwt中间件 为拦截客户端在调用接口时 如果请求头中没有设置token 返回401
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        status: 0,
        msg: "没有访问权限",
      };
    } else {
      throw err;
    }
  });
});
// 设置哪些接口需要带token 注意加密信息一定要和token生成时使用的加密字符串一致 unless为排除哪些接口请求时不需要带token
app.use(
  jwt({ secret: process.env.TOKEN_SECRET }).unless({
    path: [
      /^\/public/,
      /^\/users\/login/,
      /^\/users\/register/,
      /^\/rentlist/,
      /^\/seeklist/,
    ],
  })
);

// middlewares 中间件
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

// logger 记录操作日志
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes 注册路由
app.use(index.routes()).use(index.allowedMethods());
app.use(users.routes()).use(users.allowedMethods());

// error-handling 一旦监听到异常 就打印
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
