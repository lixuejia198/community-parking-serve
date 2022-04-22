const {
  getRentList,
  getSeekList,
  getRentListCount,
  getSeekListCount,
  getCityList,
} = require("../model");
// 分页查询出租车位列表
module.exports.rentList = async (ctx) => {
  const { page, limit } = ctx.request.query;
  const data = await getRentList(page, limit);
  const total = await getRentListCount();
  // console.log(total, "total");
  // console.log(data, "data");
  ctx.body = {
    status: 200,
    msg: "查询成功",
    data: data,
    total: total[0].total,
  };
};
// 分页查询寻找车位列表
module.exports.seekList = async (ctx) => {
  const { page, limit } = ctx.request.query;
  const data = await getSeekList(page, limit);
  const total = await getSeekListCount();
  // console.log(data, "data");
  // console.log(total, "total");
  ctx.body = {
    status: 200,
    msg: "查询成功",
    data: data,
    total: total[0].total,
  };
};
// 查询城市列表
module.exports.cityList = async (ctx) => {
  const data = await getCityList();
  // 结果
  const result = [];
  // 遍历所有数据
  data.forEach((item) => {
    // 查找结果中当前省的索引
    const provinceIndex = result.findIndex(
      (item1) => item1?.province_id === item?.province_id
    );
    // 判断是否查找到当前省的数据
    if (provinceIndex === -1) {
      // 如果找不到 则添加当前省、市、区的数据
      result.push({
        province_id: item.province_id,
        province: item.province,
        children: [
          {
            city_id: item.city_id,
            city: item.city,
            children: [item],
          },
        ],
      });
    } else {
      // 否则在当前省下查找当前市的索引
      const cityIndex = result[provinceIndex].children.findIndex(
        (item1) => item1?.city_id === item?.city_id
      );
      // 判断是否查找到当前市的数据
      if (cityIndex === -1) {
        // 如果找不到 则添加当前市、区的数据
        result[provinceIndex].children.push({
          city_id: item.city_id,
          city: item.city,
          children: [item],
        });
      } else {
        // 否则在当前市下查找当前区的索引
        const areaIndex = result[provinceIndex].children[
          cityIndex
        ].children.findIndex((item1) => item1?.area_id === item?.area_id);
        // 判断是否查找到当前区的数据
        if (areaIndex === -1) {
          // 如果找不到 则添加当前区的数据
          result[provinceIndex].children[cityIndex].children.push(item);
        }
      }
    }
  });
  ctx.body = {
    status: 200,
    msg: "查询成功",
    data: result,
  };
};
