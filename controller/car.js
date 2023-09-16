const {
  getCarByUserID,
  getCarByComID,
  getCarByUserIDAndComID,
  addCarByUserID,
  getSeekCarportByCid,
  addCarToSeek,
  getCarLog,
  getCarLogByUid,
  getCarLogByCid,
  getCarLogByUidAndCid,
  untieCarByID,
} = require("../model/car");

// 查询车辆信息
module.exports.getCar = async (ctx) => {
  const { uid, comid, starttime, endtime } = ctx.request.query;
  let result = [];
  // 判断是否有查询条件
  if (!uid && !comid) {
    return (ctx.body = {
      code: 0,
      msg: "参数错误",
    });
  } else if (uid && !comid) {
    // 只传入 uid 则查询该用户所有车辆
    const data = await getCarByUserID({ uid: Number(uid), starttime, endtime });
    // 车辆去重
    data.forEach(
      (item) =>
        result.find((item1) => item1.id === item.id) ?? result.push(item)
    );
  } else if (!uid && comid) {
    // 只传入 comid 则查询该小区所有车辆
    result = await getCarByComID({ comid: Number(comid), starttime, endtime });
  } else if (uid && comid) {
    // 传入 uid 和 comid 则查询该用户指定小区的车辆
    result = await getCarByUserIDAndComID({
      uid: Number(uid),
      comid: Number(comid),
      starttime,
      endtime,
    });
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

// 绑定车辆
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
      msg: "绑定成功",
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "绑定失败",
    };
  }
};

// 解绑车辆
module.exports.untieCar = async (ctx) => {
  const { id } = ctx.request.body;
  // 校验参数
  if (!id) {
    return (ctx.body = {
      code: 0,
      msg: "参数错误",
    });
  }
  const result = await untieCarByID({ id: Number(id) });
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

// 绑定到寻找车位
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

// 查询车辆日志
module.exports.getCarLog = async (ctx) => {
  const { uid, cid, page_num, page_size } = ctx.request.query;
  let result = [];
  if (!uid && !cid) {
    result = await getCarLog({
      page_num: page_num ? Number(page_num) : undefined,
      page_size: page_size ? Number(page_size) : undefined,
    });
  } else if (uid && !cid) {
    result = await getCarLogByUid({
      uid: Number(uid),
      page_num: page_num ? Number(page_num) : undefined,
      page_size: page_size ? Number(page_size) : undefined,
    });
  } else if (!uid && cid) {
    result = await getCarLogByCid({
      cid: Number(cid),
      page_num: page_num ? Number(page_num) : undefined,
      page_size: page_size ? Number(page_size) : undefined,
    });
  } else if (uid && cid) {
    result = await getCarLogByUidAndCid({
      uid: Number(uid),
      cid: Number(cid),
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
