const { query } = require("../db/query");

// 根据用户Id查询车位信息
module.exports.getCarportByUserID = async ({ uid }) => {
  return await query(
    "SELECT c.id,province_id,(SELECT name FROM province WHERE id = province_id) AS province,city_id,(SELECT name FROM province WHERE id = city_id) AS city,area_id,(SELECT name FROM province WHERE id = area_id) AS area,place,comname,pname,comid,x,y,z,direction,uid FROM carport AS c JOIN community AS com ON c.comid = com.id WHERE uid = ?",
    [uid]
  );
};
// 根据小区Id查询车位信息
module.exports.getCarportByComID = async ({ comid }) => {
  return await query(
    "SELECT c.id,province_id,(SELECT name FROM province WHERE id = province_id) AS province,city_id,(SELECT name FROM province WHERE id = city_id) AS city,area_id,(SELECT name FROM province WHERE id = area_id) AS area,place,comname,pname,comid,x,y,z,direction,uid FROM carport AS c JOIN community AS com ON c.comid = com.id WHERE comid = ?",
    [comid]
  );
};
// 根据用户Id与小区ID查询车位信息
module.exports.getCarportByUserIDAndComID = async ({ uid, comid }) => {
  return await query(
    "SELECT c.id,province_id,(SELECT name FROM province WHERE id = province_id) AS province,city_id,(SELECT name FROM province WHERE id = city_id) AS city,area_id,(SELECT name FROM province WHERE id = area_id) AS area,place,comname,pname,comid,x,y,z,direction,uid FROM carport AS c JOIN community AS com ON c.comid = com.id WHERE uid = ? AND comid = ?",
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
// 查询车位日志
module.exports.getCarportLog = async ({ page_num = 1, page_size = 10 }) => {
  const payload = [];
  page_num && page_size && payload.push(page_num, page_size);
  return await query(
    `SELECT rentlist.id,rentlist.starttime,rentlist.endtime,rentlist.comid,rentlist.pid,rentlist.cid,community.province_id,(SELECT name FROM province WHERE id = community.province_id) AS province,community.city_id,(SELECT name FROM province WHERE id = community.city_id) AS city,community.area_id,(SELECT name FROM province WHERE id = community.area_id) AS area,community.place,carport.pname,carport.x,carport.y,carport.z,carport.direction,carport.uid 
FROM rentlist 
JOIN community ON rentlist.comid = community.id 
LEFT JOIN carport ON carport.comid = rentlist.comid AND carport.id = rentlist.pid${
      page_num && page_size ? ` LIMIT ${page_num},${page_size}` : ``
    }`,
    payload
  );
};
// 根据车位ID查询车位日志
module.exports.getCarportLogByPid = async ({
  pid,
  page_num = 1,
  page_size = 10,
}) => {
  const payload = [pid];
  page_num && page_size && payload.push(page_num, page_size);
  return await query(
    `SELECT rentlist.id,rentlist.starttime,rentlist.endtime,rentlist.comid,rentlist.pid,rentlist.cid,community.province_id,(SELECT name FROM province WHERE id = community.province_id) AS province,community.city_id,(SELECT name FROM province WHERE id = community.city_id) AS city,community.area_id,(SELECT name FROM province WHERE id = community.area_id) AS area,community.place,carport.pname,carport.x,carport.y,carport.z,carport.direction,carport.uid 
FROM rentlist 
JOIN community ON rentlist.comid = community.id 
LEFT JOIN carport ON carport.comid = rentlist.comid AND carport.id = rentlist.pid 
WHERE rentlist.pid = ?${
      page_num && page_size ? ` LIMIT ${page_num},${page_size}` : ``
    }`,
    payload
  );
};
// 根据用户ID查询车位日志
module.exports.getCarportLogByUid = async ({
  uid,
  page_num = 1,
  page_size = 10,
}) => {
  const payload = [uid];
  page_num && page_size && payload.push(page_num, page_size);
  return await query(
    `SELECT rentlist.id,rentlist.starttime,rentlist.endtime,rentlist.comid,rentlist.pid,rentlist.cid,community.province_id,(SELECT name FROM province WHERE id = community.province_id) AS province,community.city_id,(SELECT name FROM province WHERE id = community.city_id) AS city,community.area_id,(SELECT name FROM province WHERE id = community.area_id) AS area,community.place,carport.pname,carport.x,carport.y,carport.z,carport.direction,carport.uid 
FROM rentlist 
JOIN community ON rentlist.comid = community.id 
LEFT JOIN carport ON carport.comid = rentlist.comid AND carport.id = rentlist.pid 
WHERE carport.uid = ?${
      page_num && page_size ? ` LIMIT ${page_num},${page_size}` : ``
    }`,
    payload
  );
};
// 根据用户ID和车位ID查询车位日志
module.exports.getCarportLogByUidAndPid = async ({
  uid,
  pid,
  page_num = 1,
  page_size = 10,
}) => {
  const payload = [uid, pid];
  page_num && page_size && payload.push(page_num, page_size);
  return await query(
    `SELECT rentlist.id,rentlist.starttime,rentlist.endtime,rentlist.comid,rentlist.pid,rentlist.cid,community.province_id,(SELECT name FROM province WHERE id = community.province_id) AS province,community.city_id,(SELECT name FROM province WHERE id = community.city_id) AS city,community.area_id,(SELECT name FROM province WHERE id = community.area_id) AS area,community.place,carport.pname,carport.x,carport.y,carport.z,carport.direction,carport.uid 
FROM rentlist 
JOIN community ON rentlist.comid = community.id 
LEFT JOIN carport ON carport.comid = rentlist.comid AND carport.id = rentlist.pid 
WHERE carport.uid = ? AND rentlist.pid = ?${
      page_num && page_size ? ` LIMIT ${page_num},${page_size}` : ``
    }`,
    payload
  );
};
