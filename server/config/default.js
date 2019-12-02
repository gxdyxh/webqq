const config = {
    // 启动端口
    port: 3000,
    keys:['webqq_node'],
    session:{
        key: 'koa:webqq',   //cookie key (default is koa:sess)
        maxAge: 60*60*30*1000,  // cookie的过期时间 maxAge in ms (default is 1 days)
        overwrite: true,  //是否可以overwrite    (默认default true)
        httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
        signed: true,   //签名默认true
        rolling: true,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
        renew: false,  //(boolean) renew session when session is nearly expired,
     },
     web:{
         title:'聊天系统'
     }
  }
  
  module.exports = config