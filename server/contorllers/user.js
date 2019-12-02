const UserModel = require('../models/user')


async function  group(ctx,next){
    // ctx.body="123"
    let uid = ctx.params.uid || 0;
    if(!uid){
        ctx.body={status:0,info:"缺少用户参数"}
        return 
       }
    let grouplist = await UserModel.getGroup({uid:uid});

       if('error' in grouplist){
        ctx.body={status:0,info:grouplist.error}
        return 
       }
       ctx.body={status:1,info:'获取成功',data:grouplist.data}
}

async function  friend(ctx,next){
    // ctx.body="123"
    let uid = ctx.params.uid || 0;
    if(!uid){
        ctx.body={status:0,info:"缺少用户参数"}
        return 
       }

   
    let result = await UserModel.getFriend({uid:uid});
    if('error' in result){
    ctx.body={status:0,info:result.error}
    return 
    }
    ctx.body={status:1,info:'获取成功',data:result.data}
}

async function  oneFriend(ctx,next){

    if(('nowUser' in ctx.session)==false){
        ctx.body={status:0,info:'未登录或登录已超时'}
        return; 
    }

    // ctx.body="123"
    let fid = ctx.params.fid || 0;
    if(!fid){
        ctx.body={status:0,info:"缺少用户参数"}
        return 
       }

   
    let result = await UserModel.getFriendInfo([ctx.session.nowUser.id,parseInt(fid)]);
    if('error' in result){
    ctx.body={status:0,info:result.error}
    return 
    }
    ctx.body={status:1,info:'获取成功',data:result.data}
}

async function  userInfo(ctx,next){
    // ctx.body="123"
    let uid = ctx.params.uid || 0;
    if(!uid){
        ctx.body={status:0,info:"缺少用户参数"}
        return 
       }
    let result = await UserModel.getInfo({id:uid});
    if('error' in result){
    ctx.body={status:0,info:result.error}
    return 
    }
    ctx.body={status:1,info:'获取成功',data:result.data}
}

async function  search(ctx,next){
    // ctx.body="123"
    let key = ctx.params.key || '';
    if(!key){
        ctx.body={status:0,info:"缺少搜索参数"}
        return 
     }

    let result = await UserModel.searchFriend(key);
    if('error' in result){
    ctx.body={status:0,info:result.error}
    return 
    }
    ctx.body={status:1,info:'获取成功',data:result.data}
}

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
        autograph:true,
        nickname:true,
        headimg:true,
        userpwd:false
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

    let param = {};
    param[key]=data;

    let result = await UserModel.upInfo([param,ctx.session.nowUser.id]);
    if('error' in result){
        ctx.body={status:0,info:result.error}
        return 
    }
    if(upkeys[key]){
        ctx.session.nowUser[key] = data;
    }
    ctx.body={status:1,info:'用户信息更新成功'}
}

async function  updateGroup(ctx,next){
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
        desc:true,
        group:true,
        headimg:true, 
    }

    if((key in upkeys) == false){
        ctx.body={status:0,info:"不允许的更新字段参数"}
        return ;
    }

    let gid  = ctx.request.body.group || '';
    if(!gid){
        ctx.body={status:0,info:"缺少更新数据"}
        return ;
    }

    let data  = ctx.request.body.data || '';
    if(!data){
        ctx.body={status:0,info:"缺少更新数据"}
        return ;
    }

    let param = {};
    param[key]=data;

    let result = await UserModel.upGroupInfo([param,gid,ctx.session.nowUser.id]);
    if('error' in result){
        ctx.body={status:0,info:result.error}
        return 
    }
    
    ctx.body={status:1,info:'群组信息更新成功'}
}

async function  outGroup(ctx,next){
    if(('nowUser' in ctx.session)==false){
        ctx.body={status:0,info:'未登录或登录已超时'}
        return; 
    }
   

    let gid  = ctx.request.body.group || '';
    if(!gid){
        ctx.body={status:0,info:"缺少群组参数"}
        return ;
    }

    let where = 'groupid='+gid+' and uid='+ctx.session.nowUser.id
    let groupInfo = await UserModel.getGroupInfo(where);

    if(!groupInfo.data){
        ctx.body={status:0,info:'未获取到群组信息'};
        return ;
    }
    var result = {};
    if(groupInfo.data.mamager==2){ //创建者  解散群组
         result =  await UserModel.delGroup(groupInfo.data);

    }else{//加入者  退出群组
        result =  await UserModel.outGroup(groupInfo.data);
    }

    if('error' in result){
        ctx.body={status:0,info:result.error}
        return 
    }
    
    ctx.body={status:1,info:'群组信息更新成功'}
}


//添加用户分组
async function addUserGroup(ctx,next){

    if(('nowUser' in ctx.session)==false){
        ctx.body={status:0,info:'未登录或登录已超时'}
        return; 
    }
    let group  = ctx.request.body.data || '';
    if(!group){
        ctx.body={status:0,info:"缺少分组名参数"}
        return ;
    }

    let result = UserModel.addUserGroup({group:group,uid:ctx.session.nowUser.id});
    if('error' in result){
        ctx.body={status:0,info:result.error}
        return 
    }
    ctx.body={status:1,info:'分组创建成功！'}
}

//修改用户组别
async function changeUserGroup(ctx,next){

    if(('nowUser' in ctx.session)==false){
        ctx.body={status:0,info:'未登录或登录已超时'}
        return; 
    }
    let gid  = ctx.request.body.gid || 0;
    if(!gid){
        ctx.body={status:0,info:"缺少分组参数"}
        return ;
    }
    let fid  = ctx.request.body.fid || '';
    if(!fid){
        ctx.body={status:0,info:"缺少好友参数"}
        return ;
    }

    let result = UserModel.changeUserGroup([{group:gid},parseInt(fid),ctx.session.nowUser.id]);
    if('error' in result){
        ctx.body={status:0,info:result.error}
        return 
    }
    ctx.body={status:1,info:'分组修改成功！'}
}
//修改用户分组
async function editUserGroup(ctx,next){

    if(('nowUser' in ctx.session)==false){
        ctx.body={status:0,info:'未登录或登录已超时'}
        return; 
    }
    let gid  = ctx.request.body.gid || 0;
    if(!gid){
        ctx.body={status:0,info:"缺少分组参数"}
        return ;
    }
    let group  = ctx.request.body.data || '';
    if(!group){
        ctx.body={status:0,info:"缺少分组名参数"}
        return ;
    }

    let result = UserModel.editUserGroup([{group:group},parseInt(gid),ctx.session.nowUser.id]);
    if('error' in result){
        ctx.body={status:0,info:result.error}
        return 
    }
    ctx.body={status:1,info:'分组修改成功！'}
}
//修改用户分组
async function delUserGroup(ctx,next){

    if(('nowUser' in ctx.session)==false){
        ctx.body={status:0,info:'未登录或登录已超时'}
        return; 
    }
    let gid  = ctx.request.body.gid || 0;
    if(!gid){
        ctx.body={status:0,info:"缺少分组参数"}
        return ;
    }
   
    let result = UserModel.delUserGroup([parseInt(gid),ctx.session.nowUser.id]);
    if('error' in result){
        ctx.body={status:0,info:result.error}
        return 
    }
    ctx.body={status:1,info:'分组删除成功！'}
}

module.exports = {
    group,
    friend,
    oneFriend,
    search,
    userInfo,
    updateInfo,
    updateGroup,
    outGroup,
    addUserGroup,
    editUserGroup,
    delUserGroup,
    changeUserGroup
};