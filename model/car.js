const { query } = require("../db/query");

// 根据用户ID查询车辆信息
module.exports.getCarByUserID = async ({ uid }) => {
  return await query(
    "SELECT car.id,car.cname,car.color,car.uid,carport.id AS pid,carport.pname,carport.x,carport.y,carport.z,carport.direction,carport.state,carport.comid FROM car LEFT JOIN carport ON car.id = carport.cid WHERE car.uid = ?",
    [uid]
  );
};
// 根据小区ID查询车辆信息
module.exports.getCarByComID = async ({ comid }) => {
  return await query(
    "SELECT car.id,car.cname,car.color,car.uid,carport.id AS pid,carport.pname,carport.x,carport.y,carport.z,carport.direction,carport.state,carport.comid FROM car LEFT JOIN carport ON car.id = carport.cid WHERE carport.comid = ?",
    [comid]
  );
};
// 根据用户ID与小区ID查询车辆信息
module.exports.getCarByUserIDAndComID = async ({ uid, comid }) => {
  return await query(
    "SELECT car.id,car.cname,car.color,car.uid,carport.id AS pid,carport.pname,carport.x,carport.y,carport.z,carport.direction,carport.state,carport.comid FROM car LEFT JOIN carport ON car.id = carport.cid WHERE car.uid = ? AND carport.comid = ?",
    [uid, comid]
  );
};
// 根据用户ID添加车辆
module.exports.addCarByUserID = async ({ uid, cname, color = "#ffffff" }) => {
  return await query("INSERT INTO car (uid,cname,color) VALUES (?,?,?)", [
    uid,
    cname,
    color.toLocaleLowerCase(),
  ]);
};
// 添加车辆到寻找车位列表
module.exports.addCarToSeek = async ({ starttime, endtime, cid }) => {
  return await query(
    "INSERT INTO seeklist (starttime,endtime,cid) VALUES (?,?,?)",
    [starttime, endtime, cid]
  );
};
// 查询车辆使用车位信息
module.exports.getSeekCarportByCid = async ({ cid }) => {
  return await query(
    `SELECT id,starttime,endtime,comid,cid FROM seeklist WHERE cid = ?`,
    [cid]
  );
};
