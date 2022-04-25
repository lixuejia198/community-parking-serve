const { query } = require("../db/query");
// 分页查询出租车位列表
module.exports.getRentList = async (page = 1, limit = 6) => {
  return await query(
    `SELECT rentlist.id,carport.state,rentlist.starttime,rentlist.endtime,community.comname,community.place,carport.pname FROM rentlist INNER JOIN community ON rentlist.comid=community.id INNER JOIN carport ON rentlist.pid=carport.id ORDER BY rentlist.id DESC LIMIT ?,?`,
    [(page - 1) * limit, Number(limit)]
  );
};
// 查询出租车位列表总数
module.exports.getRentListCount = async () => {
  return await query(
    "SELECT count(*) AS total FROM rentlist INNER JOIN community ON rentlist.comid=community.id INNER JOIN carport ON rentlist.pid=carport.id"
  );
};
// 分页查询寻找车位列表
module.exports.getSeekList = async (page = 1, limit = 6) => {
  return await query(
    `SELECT seeklist.id,seeklist.state,seeklist.starttime,seeklist.endtime,community.comname,community.place,car.cname FROM seeklist INNER JOIN community ON seeklist.comid=community.id INNER JOIN car ON seeklist.cid=car.id ORDER BY seeklist.id DESC LIMIT ?,?`,
    [(page - 1) * limit, Number(limit)]
  );
};
// 查询寻找车位列表总数
module.exports.getSeekListCount = async () => {
  return await query(
    "SELECT count(*) AS total FROM seeklist INNER JOIN community ON seeklist.comid=community.id INNER JOIN car ON seeklist.cid=car.id"
  );
};
// 查询小区列表
module.exports.getCityList = async ({ areaid }) => {
  return await query(
    `SELECT id,province_id,(SELECT name FROM province WHERE id = province_id) AS province,city_id,(SELECT name FROM province WHERE id = city_id) AS city,area_id,(SELECT name FROM province WHERE id = area_id) AS area,place,comname FROM community${
      areaid ? ` WHERE area_id = ?` : ""
    }`,
    areaid ? [areaid] : []
  );
};
