const {
  getCarByUserID,
  getCarByComID,
  getCarByUserIDAndComID,
  addCarByUserID,
  getSeekCarportByCid,
  addCarToSeek,
} = require("../model/car");

// 查询车辆信息
module.exports.getCar = async (ctx) => {
  const { uid, comid } = ctx.request.query;
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

// 添加车辆
module.exports.addCar = async (ctx) => {
  const { cname, uid, color } = ctx.request.body;
  // 校验参数
  if (!cname || !uid) {
    return (ctx.body = {
      code: 0,
      msg: "参数错误",
    });
  }
  const result = await addCarByUserID({ uid: Number(uid), cname, color });
  if (result.affectedRows !== 0) {
    ctx.body = {
      status: 200,
      msg: "添加成功",
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "添加失败",
    };
  }
};

// 添加到寻找车位
module.exports.seekCarport = async (ctx) => {
  const { starttime, endtime, cid } = ctx.request.body;
  // 校验参数
  if (!starttime || !endtime || !cid) {
    return (ctx.body = {
      code: 0,
      msg: "参数错误",
    });
  }
  const result = await addCarToSeek({
    starttime: new Date(starttime).toLocaleString().replaceAll("/", "-"),
    endtime: new Date(endtime).toLocaleString().replaceAll("/", "-"),
    cid,
  });
  if (result.affectedRows !== 0) {
    ctx.body = {
      status: 200,
      msg: "车位共享成功",
      data: {
        starttime,
        endtime,
        cid,
      },
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "车位共享失败",
    };
  }
};

// 查询车辆使用车位时间
module.exports.seekCarportTime = async (ctx) => {
  const { cid } = ctx.request.query;
  // 校验参数
  if (!cid) {
    return (ctx.body = {
      code: 0,
      msg: "参数错误",
    });
  }
  const result = await getSeekCarportByCid({ cid: Number(cid) });
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
