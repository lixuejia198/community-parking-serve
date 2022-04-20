const { query } = require("../db/query");

// 根据用户Id查询车辆信息
module.exports.getCarByUserID = async ({ uid }) => {
  return await query(
    "SELECT car.id,car.cname,car.uid,carport.id AS pid,carport.pname,carport.x,carport.y,carport.z,carport.direction,carport.state,carport.comid FROM car LEFT JOIN carport ON car.id = carport.cid WHERE car.uid = ?",
    [uid]
  );
};
// 根据小区Id查询车位信息
module.exports.getCarByComID = async ({ comid }) => {
  return await query(
    "SELECT car.id,car.cname,car.uid,carport.id AS pid,carport.pname,carport.x,carport.y,carport.z,carport.direction,carport.state,carport.comid FROM car LEFT JOIN carport ON car.id = carport.cid WHERE carport.comid = ?",
    [comid]
  );
};
// 根据用户Id与小区ID查询车位信息
module.exports.getCarByUserIDAndComID = async ({ uid, comid }) => {
  return await query(
    "SELECT car.id,car.cname,car.uid,carport.id AS pid,carport.pname,carport.x,carport.y,carport.z,carport.direction,carport.state,carport.comid FROM car LEFT JOIN carport ON car.id = carport.cid WHERE car.uid = ? AND carport.comid = ?",
    [uid, comid]
  );
};
