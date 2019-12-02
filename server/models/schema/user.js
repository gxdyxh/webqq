const moment = require('moment');
const until = require('../libs/tool')
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        // 用户ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 用户名
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // 密码
        userpwd: {
            type: DataTypes.STRING,
            allowNull: false,
           
        },
        // 密码
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
           
        },
         // 昵称
         nickname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
         // 邮箱
         mail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // 电话
        tel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // 添加时间
        addtime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // 添加时间
        headimg: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // 添加时间
        autograph: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    }, {

        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true,
        tableName:'mymvc_user',
        createdAt:false,
        deletedAt:false,
        updatedAt:false
    })
}