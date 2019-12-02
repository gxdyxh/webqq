const router = require('koa-router')();

const controller = require('../contorllers/index')

//首页路由
router.get('/', controller.index)

router.post('/login', controller.dologin);//登录
router.get('/login', controller.login);//执行登录
router.get('/reg', controller.reg);//注册
router.post('/reg', controller.doreg);//执行注册
router.get('/logout', controller.logout);//执行退出

module.exports = router