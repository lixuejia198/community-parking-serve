const {
  getCarByUserID,
  getCarByComID,
  getCarByUserIDAndComID,
} = require("../model/car");

// 查询车辆信息
module.exports.getCar = async (ctx) => {
  const { uid, comid } = ctx.request.query;
  console.log(uid, comid, !uid && !comid);
  let result = [];
  // 判断是否有查询条件
  if (!uid && !comid) {
    return (ctx.body = {
      code: 0,
      msg: "参数错误",
    });
  } else if (uid && !comid) {
    // 只传入 uid 则查询该用户所有车辆
    result = await getCarByUserID({ uid });
  } else if (!uid && comid) {
    // 只传入 comid 则查询该小区所有车辆
    result = await getCarByComID({ comid });
  } else if (uid && comid) {
    // 传入 uid 和 comid 则查询该用户指定小区的车辆
    result = await getCarByUserIDAndComID({ uid, comid });
  }
  console.log(result, "result");
  if (result.length > 0) {
    ctx.body = {
      status: 200,
      msg: "查询成功",
      data: result,
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "查询失败",
    };
  }
};
