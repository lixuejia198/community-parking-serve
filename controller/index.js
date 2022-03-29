const {
  getRentList,
  getSeekList,
  getRentListCount,
  getSeekListCount,
  getCarInfoByUserID,
} = require("../model/index");
// 分页查询出租车位列表
module.exports.rentList = async (ctx) => {
  console.log(ctx.request.query, "query");
  const { page, limit } = ctx.request.query;
  const data = await getRentList(page, limit);
  const total = await getRentListCount();
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
module.exports.seekList = async (ctx) => {
  console.log(ctx.request.query, "query");
  const { page, limit } = ctx.request.query;
  const data = await getSeekList(page, limit);
  const total = await getSeekListCount();
  // console.log(data, "data");
  // console.log(total, "total");
  ctx.body = {
    status: 200,
    data: data,
    total: total[0].total,
    msg: "查询成功",
  };
};

// 查询用户车的信息
module.exports.getCarInfo = async (ctx) => {
  console.log(ctx.request.query, "query");
  const { uid } = ctx.request.query;
  const data = await getCarInfoByUserID(uid);
  console.log(data, "data");
  ctx.body = {
    status: 200,
    data: data,
    msg: "查询成功",
  };
};
