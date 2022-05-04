const { query } = require("../db/query");

// 根据用户Id查询车位信息
module.exports.getCarportByUserID = async ({ uid }) => {
  return await query(
    "SELECT c.id,province_id,(SELECT name FROM province WHERE id = province_id) AS province,city_id,(SELECT name FROM province WHERE id = city_id) AS city,area_id,(SELECT name FROM province WHERE id = area_id) AS area,place,comname,pname,comid,x,y,z,direction FROM carport AS c JOIN community AS com ON c.comid = com.id WHERE uid = ?",
    [uid]
  );
};
// 根据小区Id查询车位信息
module.exports.getCarportByComID = async ({ comid }) => {
  return await query(
    "SELECT c.id,province_id,(SELECT name FROM province WHERE id = province_id) AS province,city_id,(SELECT name FROM province WHERE id = city_id) AS city,area_id,(SELECT name FROM province WHERE id = area_id) AS area,place,comname,pname,comid,x,y,z,direction FROM carport AS c JOIN community AS com ON c.comid = com.id WHERE comid = ?",
    [comid]
  );
};
// 根据用户Id与小区ID查询车位信息
module.exports.getCarportByUserIDAndComID = async ({ uid, comid }) => {
  return await query(
    "SELECT c.id,province_id,(SELECT name FROM province WHERE id = province_id) AS province,city_id,(SELECT name FROM province WHERE id = city_id) AS city,area_id,(SELECT name FROM province WHERE id = area_id) AS area,place,comname,pname,comid,x,y,z,direction FROM carport AS c JOIN community AS com ON c.comid = com.id WHERE uid = ? AND comid = ?",
    [uid, comid]
  );
};
// 根据小区ID添加车位
module.exports.addCarportByComID = async ({
  pname,
  comid,
  x,
  y,
  z,
  direction,
  uid,
  state = 0,
}) => {
  return await query(
    "INSERT INTO carport (pname,x,y,z,direction,uid,comid,state) VALUES (?,?,?,?,?,?,?,?)",
    [pname, x, y, z, direction, uid, comid, state]
  );
};
// 车位添加到指定用户上
module.exports.addCarportToUser = async ({ uid, pid }) => {
  return await query("UPDATE carport SET uid = ? WHERE id = ?", [uid, pid]);
};
// 添加车位到共享列表
module.exports.addCarportToRent = async ({
  starttime,
  endtime,
  comid,
  pid,
}) => {
  return await query(
    "INSERT INTO rentlist (starttime,endtime,comid,pid) VALUES (?,?,?,?)",
    [starttime, endtime, comid, pid]
  );
};
// 查询车位被共享的记录
module.exports.getRentCarportByPid = async ({ pid }) => {
  return await query(
    `SELECT id,starttime,endtime,comid,pid FROM rentlist WHERE pid = ?`,
    [pid]
  );
};
