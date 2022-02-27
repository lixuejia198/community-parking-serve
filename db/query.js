// 引入mysql包
var mysql = require("mysql");
// 创建数据库连接池
var pool = mysql.createPool({
  // 最大连接数
  connectionLimit: 100,
  // 主机
  host: "localhost",
  // 用户名
  user: "root",
  // 密码
  password: "root",
  // 数据库
  database: "community_parking",
});
// 与数据库建立连接
module.exports.query = (sql, payload) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

      // Use the connection 使用连接 发送sql语句到数据库中 然后数据库会执行sql语句
      // 执行结果 在回调函数中返回
      connection.query(sql, payload, function (error, results, fields) {
        // When done with the connection, release it. 没连接上和拿到返回数据之后 会把当前连接释放掉
        connection.release();

        // Handle error after the release.
        if (error) throw error;

        // 返回数据
        resolve(results);

        // Don't use the connection here, it has been returned to the pool.
      });
    });
  });
};
