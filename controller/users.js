const { findUserByUP } = require("../model/users");
// 用户登录
module.exports.login = async (ctx) => {
  console.log(ctx.request.body, "body");
  const { username, password } = ctx.request.body;
  // 根据用户输入的用户名和密码在数据库表中查询是否有这个用户
  const user = await findUserByUP(username, password);
  console.log(user, "user");
  // 如果有这个用户 返回登录成功
  if (user[0]) {
    ctx.body = {
      status: 200,
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
