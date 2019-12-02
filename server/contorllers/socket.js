const util = require('../libs/tool')
const chartMsg = require('../models/chart')
//登录
function login(mpush,ctx,obj){
       
            var token = obj.token;
            //console.log(token);
            //用户信息解密
            var user = JSON.parse(util.str_decrypt(token, 'userToken'));
            nowUser = user;
            var uid = user.uid;
            ctx.state.uid = uid;
            console.log('uid in :',(mpush.hasOnlie(uid)))
            if (false === mpush.hasOnlie(uid)) {
                //在线人数+1
                mpush.onlineCount++;
                mpush.online[user.uid]={};
                mpush.online[user.uid]['ctx']=[];
                mpush.online[user.uid]['info']=user;
            }

            if(mpush.online[user.uid]['ctx'].indexOf(ctx)<0){
                mpush.online[user.uid]['ctx'].push(ctx);
            }
            mpush.to(ctx).emit('login', user); // 把当前用户信息返回
            mpush.emit('onLine', mpush.onlineCount); //返回当前总人数

}
//聊天
function chat(mpush,ctx,obj){
       
    var to = obj.to; //接收者
    var chat_type = obj.chat_type; //消息方式
    var msg  = obj.msg;
    var userOnline=true;//对方是否在线

    var uid = ctx.state.uid;
	obj.send = uid; 
    obj.time = util.formatTime("yyyy-MM-dd hh:mm:ss");
    obj.online = true;
	obj.chat_type  = chat_type;
    //处理好友
    if (chat_type=='friend'){
        if (mpush.hasOnlie(to)){//在线
            mpush.to(...mpush.online[to]['ctx']).emit('chat', { chat_mark: uid, send:uid, to: to, chatType: chat_type, msg: msg, online: userOnline, sendUser: mpush.online[uid].info });
        }else{
            obj.online = false;
            userOnline = false;
        }
        mpush.to(ctx).emit('chat', { chat_mark: to, send: uid, to: to, chatType: chat_type, msg: msg, online: userOnline });
    }else{//处理群组消息
        
        //群组消息 只用群内发送就好
        mpush.toroom(to).emit('chat', { chat_mark: to, send: uid, to: to, chatType: chat_type, msg: msg,sendUser:mpush.online[uid].info });

    }
    //TODO 保存消息
    chartMsg.addImMsg(obj);
    
    
}

//用户群组
function groups(mpush,ctx,obj){
    if (obj.groups.length>0){
        for (let index = 0; index < obj.groups.length; index++) {
            const roomid = obj.groups[index];
            //socket.join(roomid);
            if(mpush.rooms.hasOwnProperty(roomid)){//如果已存在组用户信息
                if(mpush.rooms[roomid].indexOf(ctx.state.uid)<0){
                    mpush.rooms[roomid].push(ctx.state.uid);
                }    
            }else{
                mpush.rooms[roomid]=[];
                mpush.rooms[roomid].push(ctx.state.uid);
            }  
        }
    } 
}

//获取好友列表 通知好友上线
function friends(mpush,ctx,obj){
    if (obj.friends.length>0){
        mpush.online[ctx.state.uid].friends = obj.friends;
        var onlineFriends=[];
        for (let index = 0; index < obj.friends.length; index++) {
            const uid = obj.friends[index];
            if (mpush.hasOnlie(uid)) {//好友在线
                onlineFriends.push(uid);
                mpush.to(...mpush.online[uid]['ctx']).emit('friendOnline', {friend: ctx.state.uid})
            }
        }
        if (onlineFriends.length>0){
            mpush.to(ctx).emit('friends', { friends: onlineFriends}); // 把当前在线好友信息
            
        }
       
    } 
}

function friendOutLine(mpush,ctx){ // 好友离线
    let friends = mpush.online[ctx.state.uid].friends;
    if(friends){
        for (let index = 0; index < friends.length; index++) {
            const uid = friends[index];
            if (mpush.hasOnlie(uid)) {//好友离线
                mpush.to(...mpush.online[uid]['ctx']).emit('friendOutLine', {friend: ctx.state.uid})
            }
        }
    }
}


module.exports = {
    login,
    chat,
    groups,
    friends,
    friendOutLine
};