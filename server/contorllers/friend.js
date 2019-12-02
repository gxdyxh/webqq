const UserModel = require('../models/user')
const NoticeModel = require('../models/notice')

async function  group(ctx,next){
    // ctx.body="123"
    let uid = ctx.params.uid || 0;
    if(!uid){
        ctx.body={status:0,info:"缺少用户参数"}
        return 
       }
    let result = await UserModel.getFriendGroup({uid:uid});
       if('error' in result){
        ctx.body={status:0,info:result.error}
        return 
       }
       ctx.body={status:1,info:'获取成功',data:result.data}
}
//群组成员
async function  groupuser(ctx,next){
    if(('nowUser' in ctx.session)==false){
        ctx.body={status:0,info:'未登录或登录已超时'}
        return; 
    }
    // ctx.body="123"
    let gid = ctx.params.gid || 0;
    if(!gid){
        ctx.body={status:0,info:"缺少群组参数"}
        return 
       }
    let result = await UserModel.getGroupUser({groupid:gid});
       if('error' in result){
        ctx.body={status:0,info:result.error}
        return 
       }
       ctx.body={status:1,info:'获取成功',data:result.data}
}

//删除好友
async function  del(ctx,next){
       
        if(('nowUser' in ctx.session)==false){
            ctx.body={status:0,info:'未登录或登录已超时'}
            return; 
        }
        let fid  = ctx.request.body.fid || 0;
        if(!fid){
            ctx.body={status:0,info:"缺少用户参数"}
            return ;
       }
       let result =  UserModel.delFriend([ctx.session.nowUser.id,parseInt(fid)]);
      if('error' in result){
        ctx.body={status:0,info:result.error}
        return 
       }
      ctx.body={status:1,info:'删除成功'}
 
}

//添加好友
async function add(ctx,next){

    if(('nowUser' in ctx.session)==false){
        ctx.body={status:0,info:'未登录或登录已超时'}
        return; 
    }
    let fid  = ctx.request.body.fid || 0;
    if(!fid){
        ctx.body={status:0,info:"缺少用户参数"}
        return ;
    }
    //let result =  UserModel.getFriend([ctx.session.nowUser.id,parseInt(fid)]);
    let result = NoticeModel.add({to:parseInt(fid),send:ctx.session.nowUser.id,type:1,message:ctx.session.nowUser.nickname+' 请求加您为好友！'});
    if('error' in result){
        ctx.body={status:0,info:result.error}
        return 
    }
    ctx.body={status:1,info:'好友通知发送成功'}
}

//添加好友
async function addgroupUser(ctx,next){

    if(('nowUser' in ctx.session)==false){
        ctx.body={status:0,info:'未登录或登录已超时'}
        return; 
    }
    let gid  = ctx.request.body.gid || 0;
    if(!gid){
        ctx.body={status:0,info:"缺少群组参数"}
        return ;
    }
    let uids  = ctx.request.body.uids || [];
    if(uids.length==0){
        ctx.body={status:0,info:"缺少用户参数"}
        return ;
    }

    let groupUserList = await UserModel.getGroupUser({groupid:gid});
    let tempUserIds = [];
    let groupName = '';
    for (let index = 0; index < groupUserList.data.length; index++) {
        const element = groupUserList.data[index];
        tempUserIds.push(element.uid);
        groupName = element.group;
    }
    let result ={};
    for (let index = 0; index < uids.length; index++) {
        const tempUid = uids[index];
        if(tempUserIds.indexOf(parseInt(tempUid))>-1){//已在群里 跳过
            continue;
        }
        result = await NoticeModel.add({to:parseInt(tempUid),send:gid,type:2,message:ctx.session.nowUser.nickname+' 请求加您加入【'+groupName+'】！'});
    }

    //let result =  UserModel.getFriend([ctx.session.nowUser.id,parseInt(fid)]);
    //let result = NoticeModel.add({to:parseInt(fid),send:ctx.session.nowUser.id,type:1,message:ctx.session.nowUser.nickname+' 请求加您加入【'+groupName+'】！'});
    if('error' in result){
        ctx.body={status:0,info:result.error}
        return 
    }
    ctx.body={status:1,info:'群组通知发送成功'}
}

//添加群组
async function addgroup(ctx,next){

    if(('nowUser' in ctx.session)==false){
        ctx.body={status:0,info:'未登录或登录已超时'}
        return; 
    }
    let group  = ctx.request.body.group || '';
    if(!group){
        ctx.body={status:0,info:"缺少群名参数"}
        return ;
    }
    //let result =  UserModel.getFriend([ctx.session.nowUser.id,parseInt(fid)]);
    let result = UserModel.addGroup({group:group,uid:ctx.session.nowUser.id});
    if('error' in result){
        ctx.body={status:0,info:result.error}
        return 
    }
    ctx.body={status:1,info:'群组创建成功！'}
}

//删除群用户
async function delgroupUser(ctx,next){

    if(('nowUser' in ctx.session)==false){
        ctx.body={status:0,info:'未登录或登录已超时'}
        return; 
    }
    let gid  = ctx.request.body.group || 0;
    if(!gid){
        ctx.body={status:0,info:"缺少群组参数"}
        return ;
    }
    let uids  = ctx.request.body.uid || 0;
    if(!uids){
        ctx.body={status:0,info:"缺少用户参数"}
        return ;
    }

    let result = await UserModel.delGroupUser([gid,uids]);
    if('error' in result){
        ctx.body={status:0,info:result.error}
        return 
    }
    ctx.body={status:1,info:'群组用户删除成功'}
}
//更改好友信息
async function  updateInfo(ctx,next){
    if(('nowUser' in ctx.session)==false){
        ctx.body={status:0,info:'未登录或登录已超时'}
        return; 
    }
    let key = ctx.params.key || '';
    if(!key){
        ctx.body={status:0,info:"缺少更新字段参数"}
        return ;
    }

    let upkeys={
        remark:true,
        group:true, 
    }

    if((key in upkeys) == false){
        ctx.body={status:0,info:"不允许的更新字段参数"}
        return ;
    }

    let data  = ctx.request.body.data || '';
    if(!data){
        ctx.body={status:0,info:"缺少更新数据"}
        return ;
    }

    let fid  = ctx.request.body.fid || 0;
    if(!fid){
        ctx.body={status:0,info:"缺少好友参数"}
        return ;
    }

    let frinedInfo = await UserModel.getFriendInfo([ctx.session.nowUser.id,parseInt(fid)]);

    if(!frinedInfo){
        ctx.body={status:0,info:"未找到好友信息"}
        return ;
    }
    if(frinedInfo.data[key]==data){
        ctx.body={status:0,info:"数据未改变"}
        return ;
    }

    let param = {};
    param[key]=data;

    let result = await UserModel.upFriendInfo([param,frinedInfo.data.id]);
    if('error' in result){
        ctx.body={status:0,info:result.error}
        return ;
    }
    ctx.body={status:1,info:'好友信息更新成功'}
}

module.exports = {
    group,
    del,
    add,
    addgroup,
    groupuser,
    addgroupUser,
    delgroupUser,
    updateInfo
};