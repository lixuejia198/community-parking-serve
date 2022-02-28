const { query } = require("../db/query");

// 查询用户名和密码(登录)
module.exports.findUserByUP = async (username, password) => {
  return await query("SELECT * FROM user WHERE username=? AND password=?", [
    username,
    password,
  ]);
};

// 查询用户名(用来判断用户名是否已注册)
module.exports.findUserByUsername = async (username) => {
  return await query("SELECT * FROM user WHERE username=?", [username]);
};

// 注册用户
module.exports.registerUser = async (username, password) => {
  return await query(
    `INSERT INTO user(username,password) VALUES('${username}','${password}')`
  );
};
