const {
  getCarportByUserID,
  getCarportByComID,
  getCarportByUserIDAndComID,
  addCarportByComID,
  addCarportToUser,
  addCarportToRent,
  getRentCarportByPid,
} = require("../model/carport");

// 查询用户车位列表
module.exports.getCarport = async (ctx) => {
  const { uid, comid } = ctx.request.query;
  console.log(uid, comid);
  let result = [];
  // 判断是否有查询条件
  if (!uid && !comid) {
    return (ctx.body = {
      code: 0,
      msg: "参数错误",
    });
  } else if (uid && !comid) {
    // 只传入 uid 则查询该用户所有车位
    result = await getCarportByUserID({ uid });
  } else if (!uid && comid) {
    // 只传入 comid 则查询该小区所有车位
    result = await getCarportByComID({ comid });
  } else if (uid && comid) {
    // 传入 uid 和 comid 则查询该用户指定小区的车位
    result = await getCarportByUserIDAndComID({ uid, comid });
  }
  if (result?.length > 0) {
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

// 添加车位
module.exports.addCarport = async (ctx) => {
  const { pname, comid, x, y, z, direction, uid } = ctx.request.body;

  // 添加小区车位
  const result = await addCarportByComID({
    pname,
    comid: Number(comid),
    x: Number(x),
    y: Number(y),
    z: Number(z),
    direction: Number(direction),
    uid: Number(uid),
  });

  if (result.affectedRows !== 0) {
    ctx.body = {
      status: 200,
      msg: "车位添加成功",
      data: {
        pname,
        comid: Number(comid),
        x: Number(x),
        y: Number(y),
        z: Number(z),
        direction: Number(direction),
        uid: Number(uid),
      },
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "车位添加失败",
    };
  }
};

// 用户添加车位
module.exports.userBindCarport = async (ctx) => {
  const { pid, uid } = ctx.request.body;
  const result = await addCarportToUser({ uid, pid });
  if (result.affectedRows !== 0) {
    ctx.body = {
      status: 200,
      msg: "车位绑定成功",
      data: {
        pid,
        uid,
      },
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "车位绑定失败",
    };
  }
};

// 共享车位
module.exports.rentCarport = async (ctx) => {
  const { starttime, endtime, comid, pid } = ctx.request.body;
  // 校验参数
  if (!starttime || !endtime || !comid || !pid) {
    return (ctx.body = {
      code: 0,
      msg: "参数错误",
    });
  }
  const result = await addCarportToRent({
    starttime: new Date(starttime).toLocaleString().replaceAll("/", "-"),
    endtime: new Date(endtime).toLocaleString().replaceAll("/", "-"),
    comid,
    pid,
  });
  if (result.affectedRows !== 0) {
    ctx.body = {
      status: 200,
      msg: "车位共享成功",
      data: {
        starttime,
        endtime,
        comid,
        pid,
      },
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "车位共享失败",
    };
  }
};

// 查询车位被被共享的时间
module.exports.rentCarportTime = async (ctx) => {
  const { pid } = ctx.request.query;
  const result = await getRentCarportByPid({ pid: Number(pid) });
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
