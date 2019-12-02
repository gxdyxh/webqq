/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 80012
Source Host           : 127.0.0.1:3306
Source Database       : mymvc

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2019-12-02 16:26:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for chat_friend
-- ----------------------------
DROP TABLE IF EXISTS `chat_friend`;
CREATE TABLE `chat_friend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `fid` int(11) NOT NULL,
  `addtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '加好友时间',
  `group` int(11) DEFAULT '0',
  `remark` varchar(40) DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`,`fid`,`group`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='聊天用户关系表';

-- ----------------------------
-- Records of chat_friend
-- ----------------------------
INSERT INTO `chat_friend` VALUES ('1', '5', '6', '2019-11-05 15:47:49', '3', '测试');
INSERT INTO `chat_friend` VALUES ('3', '5', '9', '2019-11-05 10:31:36', '0', '备注3');
INSERT INTO `chat_friend` VALUES ('6', '5', '7', '2019-12-02 11:01:32', '0', '');
INSERT INTO `chat_friend` VALUES ('7', '7', '5', '2019-12-02 11:01:32', '0', '');

-- ----------------------------
-- Table structure for chat_group
-- ----------------------------
DROP TABLE IF EXISTS `chat_group`;
CREATE TABLE `chat_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group` varchar(30) NOT NULL COMMENT '群聊名称',
  `uid` int(11) NOT NULL COMMENT '创建者id',
  `sort` int(11) DEFAULT NULL COMMENT '好友分组排序',
  `desc` varchar(255) DEFAULT '',
  `headimg` varchar(255) DEFAULT NULL,
  `addtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '建群时间',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='群表';

-- ----------------------------
-- Records of chat_group
-- ----------------------------
INSERT INTO `chat_group` VALUES ('6', '顶顶顶顶', '5', null, 'f\'f方法', null, '2019-12-02 11:05:46');

-- ----------------------------
-- Table structure for chat_group_user
-- ----------------------------
DROP TABLE IF EXISTS `chat_group_user`;
CREATE TABLE `chat_group_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupid` int(11) NOT NULL COMMENT '群聊id',
  `uid` int(11) NOT NULL COMMENT '创建者id',
  `mamager` int(11) DEFAULT '0' COMMENT '管理员 0否 1是  2创建者',
  `addtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '加群时间',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='群表';

-- ----------------------------
-- Records of chat_group_user
-- ----------------------------
INSERT INTO `chat_group_user` VALUES ('10', '6', '5', '2', '2019-11-04 14:02:22');

-- ----------------------------
-- Table structure for chat_im
-- ----------------------------
DROP TABLE IF EXISTS `chat_im`;
CREATE TABLE `chat_im` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL COMMENT '消息内容',
  `send` int(11) DEFAULT NULL COMMENT '发送者',
  `to` int(255) DEFAULT NULL COMMENT '接收者',
  `addtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `offline` int(1) DEFAULT '0' COMMENT '0 在线消息  1 离线消息',
  `type` int(1) DEFAULT '1' COMMENT '1.text 2.img 3.file 4.video 5.sound ',
  `chat_type` int(1) DEFAULT '1' COMMENT '1.friend好友消息  2.group群聊消息',
  `chat_mark` int(11) DEFAULT '0' COMMENT '消息 群组标识',
  PRIMARY KEY (`id`),
  KEY `send` (`send`,`to`,`addtime`,`offline`,`chat_type`,`chat_mark`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='聊天消息表';

-- ----------------------------
-- Records of chat_im
-- ----------------------------
INSERT INTO `chat_im` VALUES ('1', '[:撇嘴][:大哭]', '5', '9', '2019-11-05 18:04:54', '1', '1', '1', '0');
INSERT INTO `chat_im` VALUES ('2', '[:微笑]', '5', '9', '2019-11-06 10:56:01', '1', '1', '1', '0');
INSERT INTO `chat_im` VALUES ('3', '[:微笑]', '5', '9', '2019-11-06 10:56:46', '1', '1', '1', '0');
INSERT INTO `chat_im` VALUES ('4', '[:微笑]', '5', '9', '2019-11-06 10:57:29', '1', '1', '1', '0');
INSERT INTO `chat_im` VALUES ('5', '[:微笑]', '5', '9', '2019-11-06 11:03:23', '1', '1', '1', '0');
INSERT INTO `chat_im` VALUES ('6', '[:微笑]', '5', '9', '2019-11-06 11:07:31', '1', '1', '1', '0');
INSERT INTO `chat_im` VALUES ('7', '[:尴尬]', '5', '9', '2019-11-06 11:07:52', '1', '1', '1', '0');
INSERT INTO `chat_im` VALUES ('8', '这个可以混合发[:发呆]', '5', '9', '2019-11-06 11:08:07', '1', '1', '1', '0');
INSERT INTO `chat_im` VALUES ('9', '[:色]啊发士大夫撒旦', '5', '9', '2019-11-06 11:08:44', '1', '1', '1', '0');
INSERT INTO `chat_im` VALUES ('10', '[:色]gggg', '5', '9', '2019-11-06 11:32:57', '1', '1', '1', '0');
INSERT INTO `chat_im` VALUES ('11', '[:得意]fff', '5', '9', '2019-11-06 11:35:38', '1', '1', '1', '0');
INSERT INTO `chat_im` VALUES ('12', '这是新消息[:撇嘴]', '7', '5', '2019-12-02 15:24:12', '0', '1', '1', '0');
INSERT INTO `chat_im` VALUES ('13', '123', '7', '5', '2019-12-02 16:25:31', '0', '1', '1', '0');

-- ----------------------------
-- Table structure for chat_im_last
-- ----------------------------
DROP TABLE IF EXISTS `chat_im_last`;
CREATE TABLE `chat_im_last` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL COMMENT '消息内容',
  `send` int(11) DEFAULT '0' COMMENT '发送者',
  `to` int(11) DEFAULT '0' COMMENT '接受对象 如果是群组的话 这里记录群组id',
  `uids` varchar(255) DEFAULT '' COMMENT '相关用户集合 [1,2,3,4]',
  `addtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` int(1) DEFAULT '1' COMMENT '1.text 2.img 3.file 4.video 5.sound ',
  `chat_type` int(1) DEFAULT '1' COMMENT '1.friend好友消息  2.group群聊消息',
  `chat_mark` varchar(11) DEFAULT '0' COMMENT '消息 群组标识',
  PRIMARY KEY (`id`),
  UNIQUE KEY `mark` (`chat_mark`),
  KEY `send` (`send`,`uids`,`addtime`,`chat_type`,`chat_mark`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COMMENT='聊天消息表';

-- ----------------------------
-- Records of chat_im_last
-- ----------------------------
INSERT INTO `chat_im_last` VALUES ('13', '发顺丰', '5', '1', '', '2019-11-04 14:47:04', '1', '2', '1');
INSERT INTO `chat_im_last` VALUES ('24', '[:得意]fff', '5', '9', '', '2019-11-06 11:35:38', '1', '1', '5_9_14');
INSERT INTO `chat_im_last` VALUES ('26', '123', '7', '5', '', '2019-12-02 16:25:31', '1', '1', '5_7_12');

-- ----------------------------
-- Table structure for chat_notice
-- ----------------------------
DROP TABLE IF EXISTS `chat_notice`;
CREATE TABLE `chat_notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `to` int(11) DEFAULT NULL COMMENT '接收通知的人',
  `send` int(255) DEFAULT '0' COMMENT '发通知的人   0为系统消息',
  `message` varchar(255) DEFAULT NULL COMMENT '消息内容',
  `type` int(1) DEFAULT '0' COMMENT '0 系统通知 1好友通知 2群组通知',
  `status` tinyint(4) DEFAULT '0' COMMENT '0 待处理  1已处理',
  `addtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of chat_notice
-- ----------------------------
INSERT INTO `chat_notice` VALUES ('5', '5', '9', 'test005 请求加您为好友！', '1', '1', '2019-11-01 09:54:52');
INSERT INTO `chat_notice` VALUES ('6', '8', '1', 'test123 请求加您加入【1111】！', '2', '0', '2019-11-01 18:13:07');
INSERT INTO `chat_notice` VALUES ('7', '9', '1', 'test123 请求加您加入【1111】！', '2', '1', '2019-11-01 18:13:07');
INSERT INTO `chat_notice` VALUES ('8', '7', '1', 'test123 请求加您加入【1111】！', '2', '1', '2019-11-01 18:13:07');
INSERT INTO `chat_notice` VALUES ('9', '6', '1', 'test123 请求加您加入【1111】！', '2', '1', '2019-11-01 18:13:07');
INSERT INTO `chat_notice` VALUES ('10', '5', '9', 'test005 请求加您为好友！', '1', '1', '2019-11-01 18:31:31');
INSERT INTO `chat_notice` VALUES ('14', '6', '1', '嘻嘻哈哈 请求加您加入【1111】！', '2', '1', '2019-11-04 16:58:36');
INSERT INTO `chat_notice` VALUES ('12', '8', '1', 'test123 请求加您加入【1111】！', '2', '0', '2019-11-04 10:01:52');
INSERT INTO `chat_notice` VALUES ('13', '9', '1', 'test123 请求加您加入【1111】！', '2', '0', '2019-11-04 10:01:52');
INSERT INTO `chat_notice` VALUES ('15', '5', '7', 'test003 请求加您为好友！', '1', '1', '2019-12-02 10:47:58');
INSERT INTO `chat_notice` VALUES ('16', '5', '7', 'test003 请求加您为好友！', '1', '1', '2019-12-02 10:56:34');
INSERT INTO `chat_notice` VALUES ('17', '5', '7', 'test003 请求加您为好友！', '1', '1', '2019-12-02 11:01:13');

-- ----------------------------
-- Table structure for chat_user_group
-- ----------------------------
DROP TABLE IF EXISTS `chat_user_group`;
CREATE TABLE `chat_user_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group` varchar(30) NOT NULL COMMENT '好友分类名称',
  `uid` int(11) NOT NULL COMMENT '创建者id',
  `sort` int(11) DEFAULT '0' COMMENT '好友分组排序',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='好友分组表';

-- ----------------------------
-- Records of chat_user_group
-- ----------------------------
INSERT INTO `chat_user_group` VALUES ('1', '测试分组', '5', '0');
INSERT INTO `chat_user_group` VALUES ('3', 'cc分组', '5', '0');

-- ----------------------------
-- Table structure for mymvc_user
-- ----------------------------
DROP TABLE IF EXISTS `mymvc_user`;
CREATE TABLE `mymvc_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(32) DEFAULT NULL COMMENT '用户名',
  `userpwd` varchar(32) DEFAULT NULL COMMENT '密码',
  `salt` varchar(4) DEFAULT NULL COMMENT '密码掩码',
  `nickname` varchar(32) DEFAULT NULL COMMENT '昵称',
  `mail` varchar(200) DEFAULT NULL COMMENT '邮箱',
  `tel` varchar(30) DEFAULT NULL COMMENT '电话',
  `addtime` int(11) DEFAULT '0' COMMENT '添加时间',
  `loginnum` int(11) DEFAULT '0' COMMENT '登陆次数',
  `lastip` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '' COMMENT '最后登录IP',
  `lasttime` int(11) DEFAULT '0' COMMENT '最后登录时间',
  `sex` int(1) DEFAULT '0' COMMENT '性别 0 保密 1先生 2女士',
  `headimg` varchar(255) DEFAULT NULL COMMENT '头像',
  `autograph` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of mymvc_user
-- ----------------------------
INSERT INTO `mymvc_user` VALUES ('5', 'test123', 'WkdWbUFRSDJBVXgzSUQ9PQ==', '4y7U', '嘻嘻哈哈', null, null, '1570590340', '0', '', '0', '0', '/upload/user_hader/5.jpg', 'fffffasdf');
INSERT INTO `mymvc_user` VALUES ('6', 'test456', 'WkdWbUFRSDJabU1lQUQ9PQ==', '36k5', 'test456', null, null, '1570591583', '0', '', '0', '0', null, '1123123');
INSERT INTO `mymvc_user` VALUES ('7', 'test003', 'WkdWbUFRSDJyUmNmQk49PQ==', 'xJl8', 'test003', null, null, '1572336287', '0', '', '0', '0', null, '1123123');
INSERT INTO `mymvc_user` VALUES ('8', 'test004', 'WkdWbUFRSDJweUExRmo9PQ==', 'rSuK', 'test004', null, null, '1572336296', '0', '', '0', '0', null, '1123123');
INSERT INTO `mymvc_user` VALUES ('9', 'test005', 'WkdWbUFRSDJMelNoTGo9PQ==', 'banc', 'test005', null, null, '1572336307', '0', '', '0', '0', null, '1123123');

-- ----------------------------
-- View structure for mymvc_cateview
-- ----------------------------
DROP VIEW IF EXISTS `mymvc_cateview`;
CREATE ALGORITHM=UNDEFINED DEFINER=`mymvc_f`@`%` SQL SECURITY INVOKER VIEW `mymvc_cateview` AS select `mymvc_cate`.`id` AS `id`,`mymvc_cate`.`title` AS `title`,`mymvc_cate`.`parent` AS `parent`,`mymvc_cate`.`pic` AS `pic`,`mymvc_cate`.`sort` AS `sort`,`mymvc_cate`.`create_by` AS `create_by`,`mymvc_cate`.`path` AS `path`,`mymvc_user`.`username` AS `username`,`mymvc_user`.`nickname` AS `nickname` from (`mymvc_cate` join `mymvc_user` on((`mymvc_cate`.`create_by` = `mymvc_user`.`id`))) ;

-- ----------------------------
-- View structure for mymvc_chat_friend
-- ----------------------------
DROP VIEW IF EXISTS `mymvc_chat_friend`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `mymvc_chat_friend` AS select `chat_friend`.`uid` AS `uid`,`chat_friend`.`fid` AS `fid`,`chat_friend`.`addtime` AS `addtime`,`chat_friend`.`group` AS `group`,`chat_friend`.`remark` AS `remark`,`f`.`username` AS `u_username`,`f`.`nickname` AS `u_nickname`,`f`.`mail` AS `u_mail`,`f`.`tel` AS `u_tel`,`f`.`addtime` AS `u_addtime`,`f`.`headimg` AS `u_headimg`,`f`.`autograph` AS `u_autograph`,ifnull(`chat_group`.`group`,'我的好友') AS `group_name`,`chat_friend`.`id` AS `id` from ((`chat_friend` left join `mymvc_user` `f` on((`chat_friend`.`fid` = `f`.`id`))) left join `chat_group` on((`chat_friend`.`group` = `chat_group`.`id`))) ;

-- ----------------------------
-- View structure for mymvc_chat_group
-- ----------------------------
DROP VIEW IF EXISTS `mymvc_chat_group`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY INVOKER VIEW `mymvc_chat_group` AS select `chat_group_user`.`groupid` AS `groupid`,`chat_group_user`.`uid` AS `uid`,`chat_group_user`.`mamager` AS `mamager`,`chat_group_user`.`addtime` AS `addtime`,`chat_group`.`group` AS `group`,`chat_group`.`uid` AS `create_uid`,`chat_group`.`desc` AS `desc`,`chat_group`.`headimg` AS `headimg`,`chat_group`.`addtime` AS `create_date` from (`chat_group` join `chat_group_user` on((`chat_group_user`.`groupid` = `chat_group`.`id`))) order by `chat_group_user`.`mamager` desc,`chat_group_user`.`id` ;

-- ----------------------------
-- View structure for mymvc_group_user
-- ----------------------------
DROP VIEW IF EXISTS `mymvc_group_user`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `mymvc_group_user` AS select `chat_group_user`.`id` AS `id`,`chat_group_user`.`groupid` AS `groupid`,`chat_group_user`.`uid` AS `uid`,`chat_group_user`.`mamager` AS `mamager`,`chat_group_user`.`addtime` AS `addtime`,`mymvc_user`.`username` AS `username`,`mymvc_user`.`nickname` AS `nickname`,`mymvc_user`.`headimg` AS `headimg`,`mymvc_user`.`autograph` AS `autograph`,`chat_group`.`group` AS `group`,`chat_group`.`headimg` AS `groupimg` from ((`chat_group_user` left join `mymvc_user` on((`chat_group_user`.`uid` = `mymvc_user`.`id`))) left join `chat_group` on((`chat_group_user`.`groupid` = `chat_group`.`id`))) ;

-- ----------------------------
-- View structure for mymvc_im_v
-- ----------------------------
DROP VIEW IF EXISTS `mymvc_im_v`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `mymvc_im_v` AS select `chat_im`.`id` AS `id`,`chat_im`.`content` AS `content`,`chat_im`.`send` AS `send`,`chat_im`.`send` AS `uid`,`chat_im`.`to` AS `to`,`chat_im`.`addtime` AS `addtime`,`chat_im`.`offline` AS `offline`,`chat_im`.`type` AS `type`,`chat_im`.`chat_type` AS `chat_type`,`chat_im`.`chat_mark` AS `chat_mark`,`mymvc_user`.`username` AS `u_username`,`mymvc_user`.`nickname` AS `u_nickname`,`mymvc_user`.`tel` AS `u_tel`,`mymvc_user`.`addtime` AS `u_addtime`,`mymvc_user`.`headimg` AS `u_headimg` from (`chat_im` join `mymvc_user` on((`chat_im`.`to` = `mymvc_user`.`id`))) ;

-- ----------------------------
-- View structure for mymvc_lastim_v
-- ----------------------------
DROP VIEW IF EXISTS `mymvc_lastim_v`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `mymvc_lastim_v` AS select `chat_im_last`.`id` AS `id`,`chat_im_last`.`content` AS `content`,`chat_im_last`.`send` AS `send`,`chat_im_last`.`to` AS `to`,if((`chat_im_last`.`chat_type` = 1),concat_ws(',',`chat_im_last`.`send`,`chat_im_last`.`to`),(select group_concat(`chat_group_user`.`uid` separator ',') AS `uids` from `chat_group_user` where (`chat_group_user`.`groupid` = `chat_im_last`.`chat_mark`) group by `chat_group_user`.`groupid` order by `chat_group_user`.`uid`)) AS `uids`,`chat_im_last`.`addtime` AS `addtime`,`chat_im_last`.`type` AS `type`,`chat_im_last`.`chat_type` AS `chat_type`,`chat_im_last`.`chat_mark` AS `chat_mark`,`s`.`username` AS `s_username`,`s`.`nickname` AS `s_nickname`,`s`.`mail` AS `s_mail`,`s`.`tel` AS `s_tel`,`s`.`addtime` AS `s_addtime`,`s`.`headimg` AS `s_headimg`,`t`.`username` AS `t_username`,`t`.`nickname` AS `t_nickname`,`t`.`mail` AS `t_mail`,`t`.`tel` AS `t_tel`,`t`.`addtime` AS `t_addtime`,`t`.`headimg` AS `t_headimg`,`chat_group`.`group` AS `g_name`,`chat_group`.`headimg` AS `g_headimg` from (((`chat_im_last` left join `mymvc_user` `s` on((`chat_im_last`.`send` = `s`.`id`))) left join `mymvc_user` `t` on(((`chat_im_last`.`to` = `t`.`id`) and (`chat_im_last`.`chat_type` = 1)))) left join `chat_group` on(((`chat_im_last`.`chat_mark` = `chat_group`.`id`) and (`chat_im_last`.`chat_type` = 2)))) ;
