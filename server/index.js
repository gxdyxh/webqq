const Koa = require('koa');
const websockify = require('koa-websocket');
const app = websockify(new Koa());
const views = require('koa-views');
const path = require('path');
const session = require('koa-session');

const koaStatic = require('koa-static'); 
const config = require('./config/default');
//const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');

const mpush = require('./libs/mpush');
app.mpush = mpush;


//模板中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

//session中间件
app.keys = config.keys;
app.use(session(config.session, app));

//配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname , './public')
))


//post 解析
//app.use(bodyParser());

//上传
app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 2*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}));


//网站配置信息
app.use(async (ctx, next) => {
  ctx.state.web = config.web;
  await next();
})


//设置系统路由
app.use(require('./routers/api.js').routes())
app.use(require('./routers/index.js').routes())
app.use(require('./routers/tool.js').routes())



/* 接发消息 */
app.ws.use((ctx, next) => {
 //mpush.ctxs.push(ctx);
 ctx.websocket.on("message", (message) => {
    //console.log('ctx',ctx);
     mpush.handle(message,ctx);
 });
 ctx.websocket.on("close", (message) => {
     /* 连接关闭时, 清理 上下文数组, 防止报错 */
     //mpush.close(ctx);
 });
})


app.listen(config.port,()=>{
  console.log(`starting at port ${config.port}`);
});


