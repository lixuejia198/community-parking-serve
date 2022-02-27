const { query } = require("../db/query");

// 查询用户名和密码
module.exports.findUserByUP = async (username, password) => {
  return await query("SELECT * FROM user WHERE username=? AND password=?", [
    username,
    password,
  ]);
};
