// 加密密码
const sha256 = require("crypto-js/sha256");
module.exports.cryptoPassword = (password) => {
  return sha256(password + process.env.DB_SALT).toString();
};
