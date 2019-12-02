const UserModel = require('../models/user')

const checkLogin = require('../middlewares/check').checkLogin

async function  index(ctx,next){
    //登录判断
    await checkLogin(ctx);
    await ctx.render('mq')
}
async function  login(ctx,next){
     await ctx.render('login')
}

async function  logout(ctx,next){
    ctx.session={};
    await ctx.render('login')
}

async function  reg(ctx,next){
    await ctx.render('reg')
}

async function  dologin(ctx,next){
    let param = ctx.request.body
    console.log("param",param);
    if(!param.username || !param.password){
        ctx.body={status:0,info:'用户名密码不能为空'}
        return 
    }
    if(ctx.session['login_code']!=param.code){
        ctx.body={status:0,info:'验证码错误'}
        return 
    }
   let user  = await UserModel.login(param);
   if('error' in user){
    ctx.body={status:0,info:user.error}
    return 
   }
   ctx.session.nowUser=user.data;
   ctx.body={status:1,info:'登录成功'}
}

async function  doreg(ctx,next){
    let param = ctx.request.body
    console.log("param",param);
    if(!param.username || !param.password){
        ctx.body={status:0,info:'用户名密码不能为空'}
        return 
    }
    if(ctx.session['reg_code']!=param.code){
        ctx.body={status:0,info:'验证码错误'}
        return 
    }
   let user  = await UserModel.reg(param);
   if('error' in user){
    ctx.body={status:0,info:user.error}
    return 
   }
   //ctx.session.nowUser=user.data;
   ctx.body={status:1,info:'注册成功'}
}

module.exports = {
    index,
    login,
    logout,
    dologin,
    reg,
    doreg,
};