// 根据用户Id查询车位信息
module.exports.getCarportByUserID = async ({uid}) => {
  return await query(
      "SELECT c.id,pname,state,comname,place,cid,comid,x,y,z FROM carport AS c,community AS com WHERE c.comid = com.id AND uid = ?",
      [uid]
  );
};
// 根据小区Id查询车位信息
module.exports.getCarportByComID = async ({comid}) => {
  return await query(
      "SELECT c.id,pname,state,comname,place,cid,comid,x,y,z FROM carport AS c,community AS com WHERE c.comid = com.id AND comid = ?",
      [comid]
  );
};
// 根据用户Id与小区ID查询车位信息
module.exports.getCarportByUserIDAndComID = async ({uid, comid}) => {
  return await query(
      "SELECT c.id,pname,state,comname,place,cid,comid,x,y,z FROM carport AS c,community AS com WHERE c.comid = com.id AND uid = ? AND comid = ?",
      [uid, comid]
  );
};
