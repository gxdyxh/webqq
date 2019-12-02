module.exports ={
    //检查登录
    checkLogin: (ctx) => {
       ctx.state.nowUser={}
      if (!ctx.session || !ctx.session.nowUser) {     
        ctx.redirect('/login');
        return false;
      }
      ctx.state.nowUser=ctx.session.nowUser;
      return true;
    }
  }