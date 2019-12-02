const ChartModel = require('../models/chart')


async function  lastuser(ctx,next){
    // ctx.body="123"
    let uid = ctx.params.uid || 0;
    if(!uid){
        ctx.body={status:0,info:"缺少用户参数"}
        return 
       }

   
    let result = await ChartModel.lastuser({uid:uid});
    if('error' in result){
        ctx.body={status:0,info:result.error}
        return 
    }
    ctx.body={status:1,info:'获取成功',data:result.data}
}

module.exports = {
    lastuser
};