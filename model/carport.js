const { query } = require("../db/query");

// 根据用户Id查询车位信息
module.exports.getCarportByUserID = async ({ uid }) => {
  return await query(
    "SELECT c.id,province_id,(SELECT name FROM province WHERE id = province_id) AS province,city_id,(SELECT name FROM province WHERE id = city_id) AS city,area_id,(SELECT name FROM province WHERE id = area_id) AS area,place,comname,pname,state,cid,comid,x,y,z,direction FROM carport AS c,community AS com WHERE c.comid = com.id AND uid = ?",
    [uid]
  );
};
// 根据小区Id查询车位信息
module.exports.getCarportByComID = async ({ comid }) => {
  return await query(
    "SELECT c.id,c.uid,province_id,(SELECT name FROM province WHERE id = province_id) AS province,city_id,(SELECT name FROM province WHERE id = city_id) AS city,area_id,(SELECT name FROM province WHERE id = area_id) AS area,place,comname,pname,state,cid,comid,x,y,z,direction FROM carport AS c,community AS com WHERE c.comid = com.id AND comid = ?",
    [comid]
  );
};
// 根据用户Id与小区ID查询车位信息
module.exports.getCarportByUserIDAndComID = async ({ uid, comid }) => {
  return await query(
    "SELECT c.id,province_id,(SELECT name FROM province WHERE id = province_id) AS province,city_id,(SELECT name FROM province WHERE id = city_id) AS city,area_id,(SELECT name FROM province WHERE id = area_id) AS area,place,comname,pname,state,cid,comid,x,y,z,direction FROM carport AS c,community AS com WHERE c.comid = com.id AND uid = ? AND comid = ?",
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
module.exports.addRentByCarport = async ({
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
