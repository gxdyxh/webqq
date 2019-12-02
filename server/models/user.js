const db = require('../config/db');
// // 引入Sequelize对象
// const Sequelize = db.sequelize;
// // 引入上一步的文章数据表模型文件
// const User = Sequelize.import('./schema/user');
const util = require('../libs/tool')

class UserModel {
    /**
     * 创建用户模型
     * @param data
     * @returns {Promise<*>}
     */
    

    static async login(param){
        var post = { username:param.username };
        try {
            const rows = await db.query('select * from mymvc_user where ? limit 1 ', post);
            if (rows.length > 0 && util.str_encrypt(param.password, rows[0].salt) == rows[0].userpwd ){
                var tokenObj = {};
                tokenObj.uid = rows[0].id;
                tokenObj.username = rows[0].username;
                tokenObj.nickname = rows[0].nickname;
                tokenObj.mail = rows[0].mail;
                tokenObj.tel = rows[0].tel;
                tokenObj.headimg = rows[0].headimg;
                tokenObj.autograph = rows[0].autograph;
                tokenObj.loginTime = (new Date()).valueOf();
                //console.log(JSON.stringify(tokenObj));
                rows[0].token = util.str_encrypt(JSON.stringify(tokenObj),'userToken');
                //console.log(rows[0]);
                return {data: rows[0]};
            }else{
                return {error: '密码错误或账号不存在' };
            }
        } catch (error) {
            console.log(error);
            return { error: error.sqlMessage || error.message};
            //return error;
        }  
    }

    static async reg(param){
        let salt = util.randStr();
        let userpwd = util.str_encrypt(param.password, salt)
        var userData = { username:param.username,userpwd:userpwd,salt:salt,nickname:param.username,addtime:parseInt((new Date().getTime())/1000) };
        try {
            let result = await db.query('INSERT INTO mymvc_user SET ?',userData);
            return { data: result.insertId };
        } catch (error) {
            console.log(error);
            return { error: error.sqlMessage || error.message };       
        }
    }

    //获取好友列表
    static async searchFriend (param){
        param = '%'+param+'%';    
        try {
            const rows = await db.query("SELECT id,username,nickname,headimg,autograph FROM mymvc_user WHERE ( username like " + db.mysql.escape(param)+" or nickname like "+ db.mysql.escape(param)+") limit 1000");
            return { data: rows };
        } catch (error) {
            console.log(error);
            return { error: error.sqlMessage || error.message };
            //return error;
        }
    }
    static async getInfo (param){
        try {
            const rows = await db.query('select id,username,nickname,headimg,autograph from mymvc_user where ? limit 1 ', param);
            return { data: rows[0] };
        } catch (error) {
            console.log(error);
            return { error: error.sqlMessage || error.message };
            //return error;
        }
    }
    
    //获取好友信息
    static async getFriendInfo (param){
        try {
            const rows = await db.query('select * from mymvc_chat_friend where uid=? and fid=? limit 1 ', ...param);
            return { data: rows[0] };
        } catch (error) {
            console.log(error);
            return { error: error.sqlMessage || error.message };
            //return error;
        }
    }

    //获取好友列表
    static async getFriend (param){
        try {
            const rows = await db.query('select * from mymvc_chat_friend where ? limit 1000 ', param);
            return { data: rows };
        } catch (error) {
            console.log(error);
            return { error: error.sqlMessage || error.message };
            //return error;
        }
    }

//获取用户所在的群列表
static async getGroupInfo  (param)  {
    try {
        const rows = await db.query('select * from mymvc_chat_group where '+param+' limit 1 ', );
        return { data: rows[0] };
    } catch (error) {
        console.log(error);
        return { error: error.sqlMessage };
        //return error;
    }
}
//获取用户所在的群列表
static async getGroup  (param)  {
    try {
        const rows = await db.query('select * from mymvc_chat_group where ? limit 1000 ', param);
        return { data: rows };
    } catch (error) {
        console.log(error);
        return { error: error.sqlMessage };
        //return error;
    }
}
//获取用户所在的群列表
static async getGroupUser  (param)  {
    try {
        const rows = await db.query('select * from mymvc_group_user where ? limit 1000 ', param);
        return { data: rows };
    } catch (error) {
        console.log(error);
        return { error: error.sqlMessage };
        //return error;
    }
}

//获取好友分类列表
static async getFriendGroup (param)  {
    try {
        const rows = await db.query('select * from chat_user_group where ? order by sort desc,id asc limit 1000 ', param);
        rows.unshift({id:0,group:'我的好友'});
        return { data: rows };
    } catch (error) {
        console.log(error);
        return { error: error.sqlMessage };
        //return error;
    }
}

//从群组删除用户
static async delGroupUser (param){
    try {
        var rows = await db.query('DELETE FROM `chat_group_user` WHERE   groupid= ? and `uid`=?',...param);
            rows = await  db.query('DELETE FROM `chat_im` WHERE chat_type=2 and  `chat_mark` = ? and send = ?  ',  ...param);
         return {};
     } catch (error) {
         console.log(error);
         return { error: error.sqlMessage };
         //return error;
     }

}

//解散群组
static async delGroup (group){
    try {
        var rows = await db.query('DELETE FROM `chat_group` WHERE  ? ',{id:group.groupid});
            rows = await db.query('DELETE FROM `chat_group_user` WHERE  ? ',{groupid:group.groupid});
            rows = await db.query('DELETE FROM `chat_im` WHERE  ? ',{chat_mark:group.groupid});
            rows = await db.query('DELETE FROM `chat_im_last` WHERE  ? ',{chat_mark:group.groupid});
         return {};
     } catch (error) {
         console.log(error);
         return { error: error.sqlMessage };
         //return error;
     }

}


//解散群组
static async outGroup (group){
    try {
        var rows = await db.query('DELETE FROM `chat_group_user` WHERE  groupid = ? and uid = ?  ',group.groupid,group.uid);
            rows = await db.query('DELETE FROM `chat_im` WHERE  chat_mark = ? and send = ? ',group.groupid,group.uid);
            rows = await db.query('DELETE FROM `chat_im_last` WHERE  chat_mark = ? and send = ? ',group.groupid,group.uid);
         return {};
     } catch (error) {
         console.log(error);
         return { error: error.sqlMessage };
         //return error;
     }

}

//删除好友相关数据
static async delFriend (param)  {
    try {
        
       var rows = await db.query('DELETE FROM `chat_friend` WHERE `uid`=? and fid= ? ',...param);
        rows = await  db.query('DELETE FROM `chat_friend` WHERE  fid = ? and uid = ? ',...param);
        rows = await  db.query('DELETE FROM `chat_im` WHERE  send = ? and `to` = ? ',  ...param);
        rows = await  db.query('DELETE FROM `chat_im` WHERE  `to` = ? and send = ? ',  ...param);
        rows = await  db.query('DELETE FROM `chat_im_last` WHERE `to` = ? and send = ? ',  ...param);
        rows = await  db.query('DELETE FROM `chat_im_last` WHERE send = ? and `to` = ? ', ...param);
        return {};
    } catch (error) {
        console.log(error);
        return { error: error.sqlMessage };
        //return error;
    }
}

    static async addFriend(param){
        try {
            let result = await db.query('INSERT INTO chat_friend SET ?',param);
            
            return { data: result.insertId };
         } catch (error) {
             console.log(error);
             return { error: error.sqlMessage };
             //return error;
         }
    }

    
    static async addUserGroup(param){
        try {
            let result = await db.query('INSERT INTO chat_user_group SET ?',param);
            return { data: result.insertId };
         } catch (error) {
             console.log(error);
             return { error: error.sqlMessage };
             //return error;
         }
    }
    
    static async editUserGroup(param){
        try {
            let result = await db.query('update  chat_user_group SET ? where id= ? and uid= ?',...param);
            return { data: result };
         } catch (error) {
             console.log(error);
             return { error: error.sqlMessage };
             //return error;
         }
    }

    
    static async changeUserGroup(param){
        try {
            let result = await db.query('update  chat_friend SET ? where fid= ? and uid= ?',...param);
            return { data: result };
         } catch (error) {
             console.log(error);
             return { error: error.sqlMessage };
             //return error;
         }
    }
    //删除好友分组
    static async delUserGroup(param){
        try {

            let result = await  db.query('DELETE FROM `chat_user_group` WHERE id=? and uid=? ',...param);
            result = await db.query('update  chat_friend SET ? where group= ? and uid= ?',{group:0},...param);
            
            return { data: result };
         } catch (error) {
             console.log(error);
             return { error: error.sqlMessage };
             //return error;
         }
    }

    static async addGroupUser(param){
        try {

            let result = await  db.query('INSERT INTO chat_group_user SET ?',{groupid:param.gid,uid:param.uid,mamager:0});
            return { data: result.insertId };
         } catch (error) {
             console.log(error);
             return { error: error.sqlMessage };
             //return error;
         }
    }
    static async addGroup(param){
        try {

            let result = await db.query('INSERT INTO chat_group SET ?',param);
                        db.query('INSERT INTO chat_group_user SET ?',{groupid:result.insertId,uid:param.uid,mamager:2});

            return { data: result.insertId };
         } catch (error) {
             console.log(error);
             return { error: error.sqlMessage };
             //return error;
         }
    }

    static async upInfo(param){
        try {
            let result = await db.query('update  mymvc_user SET ? where id=?',...param);
            return { data: result};
         } catch (error) {
             console.log(error);
             return { error: error.sqlMessage };
             //return error;
         }
    }

    
    static async upFriendInfo(param){
        try {
            let result = await db.query('update  chat_friend SET ? where id=?',...param);
            return { data: result};
         } catch (error) {
             console.log(error);
             return { error: error.sqlMessage };
             //return error;
         }
    }
    
    static async upGroupInfo(param){
        try {
            let result = await db.query('update  chat_group SET ? where id=? and uid=?',...param);
            return { data: result};
         } catch (error) {
             console.log(error);
             return { error: error.sqlMessage };
             //return error;
         }
    }
}


module.exports = UserModel