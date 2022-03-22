const { query } = require("../db/query");
// 分页查询出租车位列表
module.exports.getRentlist = async (page, limit) => {
  return await query(
    `SELECT * FROM rentlist,community WHERE rentlist.comid=community.id LIMIT 
    ${(page - 1) * limit},${limit}`
  );
};
// 查询出租车位列表总数
module.exports.getRentlistCount = async () => {
  return await query(
    "SELECT count(*) AS total FROM rentlist,community WHERE rentlist.comid=community.id"
  );
};
// 分页查询寻找车位列表
module.exports.getSeeklist = async (page, limit) => {
  return await query(
    `SELECT * FROM seeklist,community WHERE seeklist.comid=community.id LIMIT 
    ${(page - 1) * limit},${limit}`
  );
};
// 查询寻找车位列表总数
module.exports.getSeeklistCount = async () => {
  return await query(
    "SELECT count(*) AS total FROM seeklist,community WHERE seeklist.comid=community.id"
  );
};
// 根据用户Id查询车位信息
module.exports.getCarportByUserID = async (id) => {
  return await query(
    "SELECT * FROM carport AS a,community AS b WHERE a.comid = b.id AND  uid = " +
      id
  );
};
