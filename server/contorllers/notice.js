const NoticeModel = require('../models/notice')
const UserModel = require('../models/user')

async function  list(ctx,next){
    if(('nowUser' in ctx.session)==false){
        ctx.body={status:0,info:'未登录或登录已超时'}
        return; 
    }
    
       let grouplist = await NoticeModel.list(parseInt(ctx.session.nowUser.id));

       if('error' in grouplist){
        ctx.body={status:0,info:grouplist.error}
        return 
       }
       ctx.body={status:1,info:'获取成功',data:grouplist.data}
}
//删除通知
async function  del(ctx,next){
        if(('nowUser' in ctx.session)==false){
            ctx.body={status:0,info:'未登录或登录已超时'}
            return; 
        }
        let id  = ctx.request.body.id || 0;
        if(!id){
            ctx.body={status:0,info:"缺少删除参数"}
            return ;
        }
       let grouplist = await NoticeModel.del([parseInt(ctx.session.nowUser.id),parseInt(id)]);
       if('error' in grouplist){
        ctx.body={status:0,info:grouplist.error}
        return 
       }
       ctx.body={status:1,info:'删除成功'}
}
//操作通知
async function  act(ctx,next){
    if(('nowUser' in ctx.session)==false){
        ctx.body={status:0,info:'未登录或登录已超时'}
        return; 
    }
    let id  = ctx.request.body.id || 0;
    if(!id){
        ctx.body={status:0,info:"缺少操作参数"}
        return ;
    }

    let agree  = ctx.request.body.agree || 0;


    
    let noticeInfo  = await    NoticeModel.getInfo([parseInt(ctx.session.nowUser.id),parseInt(id)]);
    if(!noticeInfo.data){ 
        ctx.body={status:0,info:'通知未找到或已操作'}
        return; 
    }
    let grouplist = await NoticeModel.update([parseInt(ctx.session.nowUser.id),parseInt(id)]);

    if(agree){ //同意操作  //添加数据
        if(noticeInfo.data.type==1){
            UserModel.addFriend({uid:parseInt(ctx.session.nowUser.id),fid:parseInt(noticeInfo.data.send)});
            UserModel.addFriend({uid:parseInt(noticeInfo.data.send),fid:parseInt(ctx.session.nowUser.id)});
        }else{
            UserModel.addGroupUser({uid:parseInt(ctx.session.nowUser.id),gid:parseInt(noticeInfo.data.send)});
        }
        
    }

   if('error' in grouplist){
    ctx.body={status:0,info:grouplist.error}
    return 
   }
   ctx.body={status:1,info:'处理成功'}
}


module.exports = {
    list,
    del,
    act
};