const db = require('../config/db');


class ChartModel {
    
    //获取好友列表
    static async lastuser (param){
        try {
            const rows = await db.query("select * from mymvc_lastim_v where FIND_IN_SET('" + parseInt(param.uid)+"',uids) order by addtime desc limit 1000");
            return { data: rows };
        } catch (error) {
            console.log(error);
            return { error: error.sqlMessage || error.message };       
        }
    }
    
    static async addImMsg(param){
    	
    	function mkindex(send,to){
    		let u=[];
    		u.push(parseInt(send));
    		u.push(parseInt(to));
    		let uArr = u.sort();
    		return uArr.join('_')+'_'+(parseInt(param.send)+parseInt(param.to));
    	}
    	
    	let msgData={};
    	msgData.content = param.msg.content;
    	msgData.type = param.msg.type;
    	msgData.send = param.send;
    	msgData.to = param.to;
    	msgData.offline= param.online ? 0 : 1;
    	msgData.chat_type = param.chat_type=='friend' ? 1 : 2 ;
    	msgData.chat_mark = param.chat_type=='group' ? param.to : 0;
    		
    	try {
            let result = await db.query('INSERT INTO chat_im SET ?',msgData);
            delete msgData.offline;
            msgData.chat_mark = param.chat_type=='group' ? param.to : mkindex(param.send,param.to);
            result = await db.query('REPLACE INTO chat_im_last SET ?',msgData); //设置    唯一索引  不考虑重复插入
            return { data: result.insertId };
        } catch (error) {
            console.log(error);
            return { error: error.sqlMessage || error.message };       
        }
    }

}
module.exports = ChartModel