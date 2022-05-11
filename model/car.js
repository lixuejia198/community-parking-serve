const { query } = require("../db/query");

// 根据用户ID查询车辆信息
module.exports.getCarByUserID = async ({ uid, starttime, endtime }) => {
  const payload = [uid];
  starttime && endtime ? payload.push(starttime, endtime) : null;
  return await query(
    `SELECT seeklist.id,seeklist.starttime,seeklist.endtime,seeklist.comid,seeklist.pid,car.id,car.cname,car.color,car.uid,carport.pname,carport.x,carport.y,carport.z,carport.direction 
FROM seeklist 
RIGHT JOIN car ON seeklist.cid = car.id 
LEFT JOIN carport ON carport.comid = seeklist.comid AND carport.id = seeklist.pid 
WHERE car.uid = ?${
      starttime && endtime
        ? ` AND seeklist.starttime >= ? AND seeklist.endtime <= ?`
        : ""
    }ORDER BY seeklist.id DESC`,
    payload
  );
};
// 根据小区ID查询车辆信息
module.exports.getCarByComID = async ({ comid, starttime, endtime }) => {
  const payload = [comid];
  starttime && endtime ? payload.push(starttime, endtime) : null;
  return await query(
    `SELECT seeklist.id,seeklist.starttime,seeklist.endtime,seeklist.comid,seeklist.pid,car.id,car.cname,car.color,car.uid,carport.pname,carport.x,carport.y,carport.z,carport.direction 
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
    `SELECT seeklist.id,seeklist.starttime,seeklist.endtime,seeklist.comid,seeklist.pid,car.id,car.cname,car.color,car.uid,carport.pname,carport.x,carport.y,carport.z,carport.direction 
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
// 查询车辆日志
module.exports.getCarLog = async ({ page_num = 1, page_size = 10 }) => {
  const payload = [];
  page_num && page_size && payload.push(page_num, page_size);
  return await query(
    `SELECT seeklist.id,seeklist.starttime,seeklist.endtime,seeklist.comid,seeklist.pid,seeklist.cid,car.cname,car.color,car.uid,carport.pname,carport.x,carport.y,carport.z,carport.direction 
FROM seeklist 
JOIN car ON seeklist.cid = car.id 
LEFT JOIN carport ON carport.comid = seeklist.comid AND carport.id = seeklist.pid${
      page_num && page_size ? ` LIMIT ${page_num},${page_size}` : ``
    }`,
    payload
  );
};
// 根据车辆ID查询车辆日志
module.exports.getCarLogByCid = async ({
  cid,
  page_num = 1,
  page_size = 10,
}) => {
  const payload = [cid];
  page_num && page_size && payload.push(page_num, page_size);
  return await query(
    `SELECT seeklist.id,seeklist.starttime,seeklist.endtime,seeklist.comid,seeklist.pid,seeklist.cid,car.cname,car.color,car.uid,carport.pname,carport.x,carport.y,carport.z,carport.direction 
FROM seeklist 
JOIN car ON seeklist.cid = car.id 
LEFT JOIN carport ON carport.comid = seeklist.comid AND carport.id = seeklist.pid 
WHERE seeklist.cid = ?${
      page_num && page_size ? ` LIMIT ${page_num},${page_size}` : ``
    }`,
    payload
  );
};
// 根据用户ID查询车辆日志
module.exports.getCarLogByUid = async ({
  uid,
  page_num = 1,
  page_size = 10,
}) => {
  const payload = [uid];
  page_num && page_size && payload.push(page_num, page_size);
  return await query(
    `SELECT seeklist.id,seeklist.starttime,seeklist.endtime,seeklist.comid,seeklist.pid,seeklist.cid,car.cname,car.color,car.uid,carport.pname,carport.x,carport.y,carport.z,carport.direction 
FROM seeklist 
JOIN car ON seeklist.cid = car.id 
LEFT JOIN carport ON carport.comid = seeklist.comid AND carport.id = seeklist.pid 
WHERE car.uid = ?${
      page_num && page_size ? ` LIMIT ${page_num},${page_size}` : ``
    }`,
    payload
  );
};
// 根据用户ID和车辆ID查询车辆日志
module.exports.getCarLogByUidAndCid = async ({
  uid,
  cid,
  page_num = 1,
  page_size = 10,
}) => {
  const payload = [uid, cid];
  page_num && page_size && payload.push(page_num, page_size);
  return await query(
    `SELECT seeklist.id,seeklist.starttime,seeklist.endtime,seeklist.comid,seeklist.pid,seeklist.cid,car.cname,car.color,car.uid,carport.pname,carport.x,carport.y,carport.z,carport.direction 
FROM seeklist 
JOIN car ON seeklist.cid = car.id 
LEFT JOIN carport ON carport.comid = seeklist.comid AND carport.id = seeklist.pid 
WHERE car.uid = ? AND seeklist.cid = ?${
      page_num && page_size ? ` LIMIT ${page_num},${page_size}` : ``
    }`,
    payload
  );
};
