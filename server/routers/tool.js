const router = require('koa-router')();

var svgCaptcha = require('svg-captcha');
//https://www.cnblogs.com/cckui/p/10552832.html

//验证码路由
router.get('/tool/verific', async(ctx,next)=>{
    let type = ctx.query.type || 'login';
   
    const cap = svgCaptcha.create({
        size: 4, // 验证码长度
        width:160,
        height:60,
        fontSize: 50,
        ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
        noise: 3, // 干扰线条的数量
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#e9e9e9' // 验证码图片背景颜色
      })
      
      let img = cap.data // 验证码
      let text = cap.text.toLowerCase() // 验证码字符，忽略大小写
      ctx.session[type+'_code']=text;
      ctx.type = 'svg'
      ctx.body = `${img}`
})
module.exports = router