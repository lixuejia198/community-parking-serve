const {
  getCarportByUserID,
  getCarportByComID,
  getCarportByUserIDAndComID,
  addCarportByComID,
  addCarportToUser,
  addCarportToRent,
  getRentCarportByPid,
  getCarportLog,
  getCarportLogByUid,
  getCarportLogByPid,
  getCarportLogByUidAndPid,
  useCarportByCid,
  shareCarportByCid,
  untieCarportByID,
} = require("../model/carport");

// 查询用户车位列表
module.exports.getCarport = async (ctx) => {
  const { uid, comid } = ctx.request.query;
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

// 绑定车位
module.exports.addCarport = async (ctx) => {
  const { pname, comid, x, y, z, direction, uid } = ctx.request.body;

  // 绑定小区车位
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
      msg: "车位绑定成功",
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
      msg: "车位绑定失败",
    };
  }
};

// 解绑车位
module.exports.untieCarport = async (ctx) => {
  const { id } = ctx.request.body;
  // 校验参数
  if (!id) {
    return (ctx.body = {
      code: 0,
      msg: "参数错误",
    });
  }
  const result = await untieCarportByID({ id: Number(id) });
  if (result.affectedRows !== 0) {
    ctx.body = {
      status: 200,
      msg: "解绑成功",
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "解绑失败",
    };
  }
};

// 用户绑定车位
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

// 查询车位日志
module.exports.getCarportLog = async (ctx) => {
  const { uid, pid, page_num, page_size } = ctx.request.query;
  let result = [];
  if (!uid && !pid) {
    result = await getCarportLog({
      page_num: page_num ? Number(page_num) : undefined,
      page_size: page_size ? Number(page_size) : undefined,
    });
  } else if (uid && !pid) {
    result = await getCarportLogByUid({
      uid: Number(uid),
      page_num: page_num ? Number(page_num) : undefined,
      page_size: page_size ? Number(page_size) : undefined,
    });
  } else if (!uid && pid) {
    result = await getCarportLogByPid({
      pid: Number(pid),
      page_num: page_num ? Number(page_num) : undefined,
      page_size: page_size ? Number(page_size) : undefined,
    });
  } else if (uid && pid) {
    result = await getCarportLogByUidAndPid({
      uid: Number(uid),
      pid: Number(pid),
      page_num: page_num ? Number(page_num) : undefined,
      page_size: page_size ? Number(page_size) : undefined,
    });
  } else {
    ctx.body = {
      status: 0,
      msg: "参数错误",
    };
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
      msg: "没有查询到数据",
      data: [],
    };
  }
};

// 使用车位
module.exports.useCarport = async (ctx) => {
  const { id, cid } = ctx.request.body;
  // 校验参数
  if (!id || !cid) {
    return (ctx.body = {
      code: 0,
      msg: "参数错误",
    });
  }
  const result = await useCarportByCid({ id: Number(id), cid: Number(cid) });
  if (result.affectedRows !== 0) {
    ctx.body = {
      status: 200,
      msg: "使用车位成功",
      data: {
        id: Number(id),
        cid: Number(cid),
      },
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "使用车位失败",
    };
  }
};

// 共享车位给车辆
module.exports.shareCarport = async (ctx) => {
  const { id, comid, pid } = ctx.request.body;
  // 校验参数
  if (!id || !comid || !pid) {
    return (ctx.body = {
      code: 0,
      msg: "参数错误",
    });
  }
  const result = await shareCarportByCid({
    id: Number(id),
    comid: Number(comid),
    pid: Number(pid),
  });
  if (result.affectedRows !== 0) {
    ctx.body = {
      status: 200,
      msg: "共享车位成功",
      data: {
        id: Number(id),
        comid: Number(comid),
        pid: Number(pid),
      },
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "共享车位失败",
    };
  }
};
