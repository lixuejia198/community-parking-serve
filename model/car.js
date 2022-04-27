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
module.exports.addCarByUserID = async ({ uid, cname, color = "000000" }) => {
  return await query("INSERT INTO car (uid,cname,color) VALUES (?,?,?)", [
    uid,
    cname,
    color,
  ]);
};
