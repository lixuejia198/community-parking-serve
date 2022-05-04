const { query } = require("../db/query");

// 根据用户ID查询车辆信息
module.exports.getCarByUserID = async ({ uid, starttime, endtime }) => {
  const payload = [uid];
  starttime && endtime ? payload.push(starttime, endtime) : null;
  return await query(
    `SELECT seeklist.id,seeklist.starttime,seeklist.endtime,seeklist.comid,seeklist.pid,seeklist.cid,car.cname,car.color,car.uid,carport.pname,carport.x,carport.y,carport.z,carport.direction 
FROM seeklist 
JOIN car ON seeklist.cid = car.id 
LEFT JOIN carport ON carport.comid = seeklist.comid AND carport.id = seeklist.pid 
WHERE car.uid = ?${
      starttime && endtime
        ? ` AND seeklist.starttime >= ? AND seeklist.endtime <= ?`
        : ""
    }`,
    payload
  );
};
// 根据小区ID查询车辆信息
module.exports.getCarByComID = async ({ comid, starttime, endtime }) => {
  const payload = [comid];
  starttime && endtime ? payload.push(starttime, endtime) : null;
  return await query(
    `SELECT seeklist.id,seeklist.starttime,seeklist.endtime,seeklist.comid,seeklist.pid,seeklist.cid,car.cname,car.color,car.uid,carport.pname,carport.x,carport.y,carport.z,carport.direction 
FROM seeklist 
JOIN car ON seeklist.cid = car.id 
LEFT JOIN carport ON carport.comid = seeklist.comid AND carport.id = seeklist.pid 
WHERE carport.comid = ?${
      starttime && endtime
        ? ` AND seeklist.starttime >= ? AND seeklist.endtime <= ?`
        : ""
    }`,
    payload
  );
};
// 根据用户ID与小区ID查询车辆信息
module.exports.getCarByUserIDAndComID = async ({
  uid,
  comid,
  starttime,
  endtime,
}) => {
  const payload = [uid, comid];
  starttime && endtime ? payload.push(starttime, endtime) : null;
  return await query(
    `SELECT seeklist.id,seeklist.starttime,seeklist.endtime,seeklist.comid,seeklist.pid,seeklist.cid,car.cname,car.color,car.uid,carport.pname,carport.x,carport.y,carport.z,carport.direction 
FROM seeklist 
JOIN car ON seeklist.cid = car.id 
LEFT JOIN carport ON carport.comid = seeklist.comid AND carport.id = seeklist.pid 
WHERE car.uid = ? AND carport.comid = ?${
      starttime && endtime
        ? ` AND seeklist.starttime >= ? AND seeklist.endtime <= ?`
        : ""
    }`,
    payload
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
