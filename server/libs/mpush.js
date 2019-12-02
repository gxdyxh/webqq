const socketHandle = require('../contorllers/socket')
var socketDi = {
    onlineCount : 0,
    online : {},
    rooms:{}, //群组集合
    online_uid:{},
    tempCtxs : [],
    //连接集合
    ctxs:[],
  
    getOnlie : function(){
        //console.log(this);
        return this.online;
    },
    hasOnlie:function(uid){
        return this.online.hasOwnProperty(uid);
    },
    getOnlieCount:function(){
        return this.online;
    },
    addOnlieCount:function(){
        return this.onlineCount++;
    },
    decOnlieCount:function(){
        return this.onlineCount--;
    },
    handle : function(msg,ctx){
        var data = JSON.parse(msg)
        if(socketHandle[data['type']]){
        socketHandle[data['type']](this,ctx,data.data);
        }    
    },
    close:function(ctx){
         console.log(ctx.state.uid);
         let uid = ctx.state.uid;
         if(uid){
            let index = mpush.online[uid]['ctx'].indexOf(ctx);
            mpush.online[uid]['ctx'].splice(index, 1);
            if( mpush.online[uid]['ctx'].length<=1){//已经关闭了
                socketHandle['friendOutLine'](this,ctx);
                delete mpush.online[uid];
            }
            
         }
    },
    
    //发送给
    to:function(...arguments){
        this.tempCtxs = [...this.tempCtxs, ...arguments];
        return this;
    },
    //发送给
    toroom:function(rommid){
        if(this.rooms.hasOwnProperty(rommid)){
            for(var index=0;index<this.rooms[rommid].length;index++){
                this.tempCtxs = [...this.tempCtxs, ...this.online[this.rooms[rommid][index]]['ctx']];
            }  
        }
        return this;
    },
    //发送者例外
    exc:function(...arguments){
        if(this.tempCtxs.length<1){
            this.tempCtxs=this.ctxs;  
        }
        for(var i=0;i<arguments.length;i++){
            delete this.tempCtxs[arguments[i]];    
        }
        return this;
    },
//发送
    emit : function(...arguments){
        let msg = {};
        msg.type = arguments[0];
        msg.data = arguments[1] || {};

        var sendCtxs =[];
        if(this.tempCtxs.length<1){
            sendCtxs =this.ctxs;  
        }else{
            sendCtxs = this.tempCtxs;
        }
        this.tempCtxs=[];
        if(sendCtxs.length>0){
            sendCtxs.forEach(element => {
                console.log(JSON.stringify(msg));
                element.websocket.send(JSON.stringify(msg));
            });    
        }
    }
}
module.exports = socketDi