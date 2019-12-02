const router = require('koa-router')();
const chartController = require('../contorllers/chart')
const userController = require('../contorllers/user')
const noticeController = require('../contorllers/notice')
const friendController = require('../contorllers/friend')

const fileController = require('../contorllers/file')
router.prefix('/api')

//接口路由
router.get('/group/:uid', userController.group); //获取用户群组
router.post('/group/out',userController.outGroup); //用户退出群组
router.post('/group/update/:key',userController.updateGroup);//更新群组信息
router.post('/group/add/user', friendController.addgroupUser);//邀请用户进群
router.post('/group/del/user', friendController.delgroupUser);//提出群组

router.get('/friend/:uid', userController.friend); //获取用户好友列表
router.get('/friend/info/:fid', userController.oneFriend); //获取好友信息
router.get('/friend/group/:uid', friendController.group); //获取用户好友群
router.get('/friend/groupuser/:gid', friendController.groupuser); //获取用户群好友
router.post('/friend/update/:key',friendController.updateInfo);//更新好友信息
router.post('/friend/del',friendController.del);//删除好友
router.post('/friend/add',friendController.add);//添加好友
router.post('/friend/addgroup',friendController.addgroup);//添加好友分组

router.get('/user/search/:key', userController.search);//搜索用户
router.get('/user/:uid', userController.userInfo);//用户信息
router.post('/user/update/:key',userController.updateInfo);//更新用户信息
router.post('/user/group/add', userController.addUserGroup);//添加用户分组
router.post('/user/group/edit', userController.editUserGroup);//修改用户分组
router.post('/user/group/del', userController.delUserGroup);//删除用户分组
router.post('/user/group/change', userController.changeUserGroup);//更改用户分组

router.get('/notice/list', noticeController.list);//获取通知列表
router.post('/notice/del', noticeController.del);//删除通知信息
router.post('/notice/act', noticeController.act);//处理通知

router.get('/chat/lastuser/:uid', chartController.lastuser);//获取最后聊天信息
router.post('/fileup',fileController.fileup);//图片上传

module.exports = router