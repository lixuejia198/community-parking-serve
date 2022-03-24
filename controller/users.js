const {
  findUserByUP,
  findUserByUsername,
  registerUser,
} = require("../model/users");
const { cryptoPassword } = require("../utils/index");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
// 用户注册
module.exports.register = async (ctx) => {
  console.log(ctx.request.body);
  const { username, password } = ctx.request.body;
  // 定义校验规则
  const schema = Joi.object({
    // 校验用户名 用户名长度在4到20之间 且为必需
    username: Joi.string().min(4).max(20).required(),
    // 校验密码 密码长度6到11之间 且为必需
    password: Joi.string().min(6).max(11).required(),
  });
  // 校验结果
  const verify = schema.validate({ username, password });
  // console.log(verify, "verify");
  // 校验失败 提示错误信息
  if (verify.error) {
    ctx.body = {
      status: 0,
      msg: verify.error.details[0].message,
    };
    return;
  }
  // 查询当前用户是否已经注册
  const user = await findUserByUsername(username);
  console.log(user, "user");
  // 如果当前用户已注册 提示已注册信息
  if (user[0]) {
    ctx.body = {
      status: 0,
      msg: "您已注册 无需重复注册！",
    };
    return;
  }
  // 用户注册 密码存入数据库是加密后的
  await registerUser(username, cryptoPassword(password));
  ctx.body = {
    status: 200,
    msg: "注册成功，赶快进行登录吧",
  };
};
// 用户登录
module.exports.login = async (ctx) => {
  console.log(ctx.request.body, "body");
  const { username, password } = ctx.request.body;
  // 根据用户输入的用户名和密码在数据库表中查询是否有这个用户  注意密码是加密后的
  const user = await findUserByUP(username, cryptoPassword(password));
  console.log(user, "user");
  // 如果有这个用户 返回登录成功
  if (user[0]) {
    // 利用jsonwebtoken(jwt)生成token(令牌)
    const token = jwt.sign(
      {
        data: {
          id: user[0].id,
          username,
        },
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "12h" }
    );
    // console.log(token, "token");
    ctx.body = {
      status: 200,
      token: token,
      id: user[0].id,
      msg: "登录成功",
    };
  } else {
    // 如果没有这个用户 返回登录失败
    ctx.body = {
      status: 0,
      msg: "登录失败，请检查用户名或密码",
    };
  }
};
