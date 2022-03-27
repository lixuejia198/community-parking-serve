const {
  getRentlist,
  getSeeklist,
  getRentlistCount,
  getSeeklistCount,
} = require("../model/index");
const { getCarportByUserID } = require("../model");
// 分页查询出租车位列表
module.exports.rentlist = async (ctx) => {
  console.log(ctx.request.query, "query");
  const { page, limit } = ctx.request.query;
  const data = await getRentlist(page, limit);
  const total = await getRentlistCount();
  // console.log(total, "total");
  // console.log(data, "data");
  ctx.body = {
    status: 200,
    data: data,
    total: total[0].total,
    msg: "查询成功",
  };
};
// 分页查询寻找车位列表
module.exports.seeklist = async (ctx) => {
  console.log(ctx.request.query, "query");
  const { page, limit } = ctx.request.query;
  const data = await getSeeklist(page, limit);
  const total = await getSeeklistCount();
  // console.log(data, "data");
  // console.log(total, "total");
  ctx.body = {
    status: 200,
    data: data,
    total: total[0].total,
    msg: "查询成功",
  };
};

// 查询车位列表
module.exports.getCarport = async (ctx) => {
  console.log(ctx.request.query, "query");
  const { uid } = ctx.request.query;
  const data = await getCarportByUserID(uid);
  console.log(data, "data");
  ctx.body = {
    status: 200,
    data: data,
    msg: "查询成功",
  };
};
