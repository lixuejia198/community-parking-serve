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
  ctx.body = {
    status: 200,
    msg: "查询成功",
    data: data,
    total: total[0].total,
  };
};
// 查询城市列表
module.exports.cityList = async (ctx) => {
  const { areaid } = ctx.request.query;

  const data = await getCityList({ areaid });
  // 结果
  const result = [];
  // 遍历所有数据
  data.forEach((item) => {
    // 查找结果中当前省的索引
    const provinceIndex = result.findIndex(
      (item1) => item1?.value === item?.province_id
    );
    // 判断是否查找到当前省的数据
    if (provinceIndex === -1) {
      // 如果找不到 则添加当前省、市、区的数据
      result.push({
        value: item.province_id,
        label: item.province,
        children: [
          {
            value: item.city_id,
            label: item.city,
            children: [
              {
                value: item.area_id,
                label: item.area,
                list: [item],
              },
            ],
          },
        ],
      });
    } else {
      // 否则在当前省下查找当前市的索引
      const cityIndex = result[provinceIndex].children.findIndex(
        (item1) => item1?.value === item?.city_id
      );
      // 判断是否查找到当前市的数据
      if (cityIndex === -1) {
        // 如果找不到 则添加当前市、区的数据
        result[provinceIndex].children.push({
          value: item.city_id,
          label: item.city,
          children: [
            {
              value: item.area_id,
              label: item.area,
              list: [item],
            },
          ],
        });
      } else {
        // 否则在当前市下查找当前区的索引
        const areaIndex = result[provinceIndex].children[
          cityIndex
        ].children.findIndex((item1) => item1?.value === item?.area_id);
        // 判断是否查找到当前区的数据
        if (areaIndex === -1) {
          // 如果找不到 则添加当前区的数据
          result[provinceIndex].children[cityIndex].children.push({
            value: item.area_id,
            label: item.area,
            list: [item],
          });
        } else {
          // 否则在当前区下添加当前数据
          result[provinceIndex].children[cityIndex].children[
            areaIndex
          ].list.push(item);
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
