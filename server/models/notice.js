const db = require('../config/db');
// // 引入Sequelize对象
// const Sequelize = db.sequelize;
// // 引入上一步的文章数据表模型文件
// const User = Sequelize.import('./schema/user');
const util = require('../libs/tool')

class NoticeModel {
    
    static async add(param){
        try {
            let result = await db.query('INSERT INTO chat_notice SET ?',param);
            return { data: result.insertId };
         } catch (error) {
             console.log(error);
             return { error: error.sqlMessage };
             //return error;
         }
    }

    static async list(param){
        try {
            const rows = await db.query('select * from chat_notice where  `to` = ? order by status asc,type asc ,id desc limit 1000 ', param);
            return { data: rows };
        } catch (error) {
            console.log(error);
            return { error: error.sqlMessage };
            //return error;
        }
    }

  
    static async del(param){
        try {
             db.query('DELETE FROM `chat_notice` WHERE  `to` = ? and id = ? ', ...param);
            return {};
        } catch (error) {
            console.log(error);
            return { error: error.sqlMessage };
            //return error;
        }
    }

    
    static async getInfo(param){
        try {
            const rows = await  db.query('select * from `chat_notice` WHERE  `to` = ? and id = ? ',...param);
            if(rows.length==0){
                return {data:null};
            }
            return {data:rows[0]};
        } catch (error) {
            console.log(error);
            return { error: error.sqlMessage };
            //return error;
        }
    }
    static async update(param){
        try {
            const rows = db.query('UPDATE `chat_notice` set ? WHERE  `to` = ? and id = ? ',{status:1},...param);
            return {data:rows};
        } catch (error) {
            console.log(error);
            return { error: error.sqlMessage };
            //return error;
        }
    }

}
module.exports = NoticeModel