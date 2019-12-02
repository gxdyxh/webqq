// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('mymvc', 'root', 'root', {
//     host: '127.0.0.1',
//     dialect: 'mysql',
 
//     dialectOptions: {
//         // 字符集
//         charset: "utf8mb4",
//         //collate: "utf8mb4_unicode_ci",
//         supportBigNumbers: true,
//         bigNumberStrings: true
//     },
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },
//     timezone: '+08:00' //东八时区
// });
// module.exports = {
//     sequelize
// }


var db = {};
var mysql = require('mysql');
var pool = mysql.createPool({
    debug: true,
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'mymvc',
    port: 3306
});

var query = (sql, ...params) => {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, params, function (error, res) {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                resolve(res);
            });
        });
    });
};
db.mysql = mysql;
db.pool = pool;
db.query = query;
module.exports = db;