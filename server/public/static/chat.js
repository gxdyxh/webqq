(function () {
	var d = document,
	w = window,
	p = parseInt,
	dd = d.documentElement,
	db = d.body,
	dc = d.compatMode == 'CSS1Compat',
	dx = dc ? dd: db,
	ec = encodeURIComponent;
	
	w.groups={};
	w.friendGroup={};
	w.friend={};
	w.onlineFriend = [];
	w.tempMsg = {};

	
	function formatUserInfo(fid, username, nick, mail, tel, headimg, autograph) {
		return {
			"fid": fid,
			"group": null,
			"remark": '',
			"u_username": username,
			"u_nickname": nick,
			"u_mail": mail,
			"u_tel": tel,
			"u_headimg": headimg,
			"u_autograph": autograph
		}
	}


	w.CHAT = {
		msgObj:d.getElementById("message"),
		user:{},
		socket:null,
		//让浏览器滚动条保持在最低部
		scrollToBottom:function(){
			w.scrollTo(0, this.msgObj.clientHeight);
		},
		//退出
		logout:function(){
			CHAT.socket.socket.close();
			//location.reload();
		},
		//提交聊天消息内容
		submit:function(){
			var content = d.getElementById("content").value;
			if(content != ''){
				var obj = {
					userid: this.userid,
					username: this.username,
					content: content
				};
				this.socket.emit('message', obj);
				d.getElementById("content").value = '';
			}
			return false;
		},
		//更新系统消息，本例中在用户加入、退出的时候调用
		updateSysMsg:function(o, action){
			//当前在线用户列表
			var onlineUsers = o.onlineUsers;
			//当前在线人数
			var onlineCount = o.onlineCount;
			//新加入用户的信息
			var user = o.user;
				
			//更新在线人数
			var userhtml = '';
			var separator = '';
			for(key in onlineUsers) {
		        if(onlineUsers.hasOwnProperty(key)){
					userhtml += separator+onlineUsers[key];
					separator = '、';
				}
		    }
			
			
			//添加系统消息
			var html = '';
			html += '<div class="msg-system">';
			html += user.username;
			html += (action == 'login') ? ' 加入了聊天室' : ' 退出了聊天室';
			html += '</div>';
			var section = d.createElement('section');
			section.className = 'system J-mjrlinkWrap J-cutMsg';
			section.innerHTML = html;
			this.msgObj.appendChild(section);	
			this.scrollToBottom();
		},
		
		init:function(token,ws){
				
			//连接websocket后端服务器
			CHAT.socket = new mWsk();
			
			//监听连接打开 自动登录
			CHAT.socket.on('open', function(){
				CHAT.socket.emit('login', {token: token});
			});
			
			//监听新用户登录
			CHAT.socket.on('login', function(o){
				CHAT.user = o;
				CHAT.getFriendGroupByDb(function(){
					CHAT.getChatByDb(w.planel.initChatUserPlanel);
				});
				CHAT.getGroupListByDb(CHAT.user.uid, w.planel.initChatGroupListPlanel);
			});
			//监听在线人数 
			CHAT.socket.on('onLine', function (o) {
				console.log('onLine ', o);
				d.getElementById("onlinecount").innerHTML = '当前 ' + o + ' 人在线';	
			});

			//在线好友列表
			CHAT.socket.on('friends', function (o) {
				w.onlineFriend = o.firends;
				//TODO 更新好友列表
			});

			//好友上线
			CHAT.socket.on('friendOnline', function (o) {
				w.onlineFriend = w.onlineFriend || [];
				if(w.onlineFriend.indexOf(o.friend)==-1){
					w.onlineFriend.push(o.friend);
				}
				//TODO 更新好友列表
			});
			//好友下线
			CHAT.socket.on('friendOnline', function (o) {
				let index = w.onlineFriend.indexOf(o.friend);
				if(index!=-1){
					w.onlineFriend.splice(index, 1);
				}
				//TODO 更新好友列表
			});


			//监听用户退出
			CHAT.socket.on('logout', function (o) {
				CHAT.updateSysMsg(o, 'logout');
			});
			
			//监听用户消息
			CHAT.socket.on('chat', function(o){
				console.log('chat',o);
				
				//是否带有 发送用户者数据 本地存储 （陌生人）
				if ('sendUser' in o) {
					if ((o.sendUser.uid in w.friend) == false) { //判断是否需要再次存储
						o.sendUser.fid = o.sendUser.uid;
						w.friend[o.sendUser.uid] = formatUserInfo(o.sendUser.uid, o.sendUser.username, o.sendUser.nickname, o.sendUser.mail, o.sendUser.tel, o.sendUser.headimg ,o.sendUser.autograph);
					}
				} else {//把设置自己信息 方便格式化消息体 
					o.sendUser = CHAT.user;	
				}

				//更改最后消息
				$('#recent-item-'+o.chatType+'-' + o.chat_mark + '-msg').text(o.msg.content);



				if ($('#container').children("#chat_" + o.chatType+"_" + o.chat_mark).length>0){//已点开消息框 
					
					//插入之前 判断是否滚动条位置  判断 是否执行 自动滚动到底部
					var gotoBottom = true;
					if ($('#container').children("#chat_" + o.chatType + "_" + o.chat_mark).is(':hidden')){ //如果隐藏状态 则不自动滚动到底
						gotoBottom = false;
					}else{
						if (w.planel.msgscroll[o.chat_mark].y === +w.planel.msgscroll[o.chat_mark].y) {
							if (Math.abs(parseFloat($('#chat_' + o.chatType + '_' + o.chat_mark + ' .panel_body_container').height()) - parseFloat($('#chat_' + o.chatType + '_' + o.chat_mark + ' .chat_container').height()) - parseFloat(w.planel.msgscroll[o.chat_mark].y)) > 10) {
								gotoBottom = false;
							}
						}
					}

					//消息框内插入新消息
					$('#chat_' + o.chatType + '_' + o.chat_mark + ' .chat_container_' + o.chat_mark).append(w.view.formatMsgItem(o));
					
					//格式化滚动条
					setTimeout(function () {
						w.planel.msgscroll[o.chat_mark].refresh();
						if (gotoBottom){
							var wy = parseFloat($('#chat_' + o.chatType + '_' + o.chat_mark + ' .panel_body_container').height()) - parseFloat($('#chat_' + o.chatType + '_' + o.chat_mark + ' .chat_container').height());
							w.planel.msgscroll[o.chat_mark].scrollTo(0, wy);
						}
					}, 0);

				}else{//没有点开消息框 增加小红点  
					
					//存进本地临时消息
					if ((o.chat_mark in w.tempMsg)==false){
						w.tempMsg[o.chat_mark]=[];
					} 
					w.tempMsg[o.chat_mark].push(o);

					if(!$('#session').hasClass('point')){ //底部小红点
						$('#session').addClass('point')
					}
					if (!$('#recent-item-'+o.chatType+'-' + o.chat_mark).hasClass('notify')) { //好友小红点
						$('#recent-item-'+o.chatType+'-' + o.chat_mark).addClass('notify')
					}
					
				}		
					//这里需要判断是否是陌生人消息  如果是陌生人 消息列表内是不存在的
					if ($('#current_chat_list').find('#recent-item-'+o.chatType+'-' + o.chat_mark).length==0){//新消息  
						//插入列表
						w.planel.insertChatUserPlanel(o);
					}else{
						
						var tmpHtml = $('#recent-item-'+o.chatType+'-' + o.chat_mark).prop("outerHTML");
						$('#recent-item-'+o.chatType+'-' + o.chat_mark).remove();
						//这里可以新消息置顶
						w.planel.upTopChatUserPlanel(tmpHtml);
					}
					//会话列表显示的时候 重置下拉条
					if ($('#session').hasClass('selected')){
						setTimeout(function () {
							w.planel.scroll.refresh();
						}, 0);
					}
	
				


			});
			
			//监听消息发送
			CHAT.socket.on('message', function(obj){
				var isme = (obj.userid == CHAT.userid) ? true : false;
				var contentDiv = '<div>'+obj.content+'</div>';
				var usernameDiv = '<span>'+obj.username+'</span>';
				
				var section = d.createElement('section');
				if(isme){
					section.className = 'user';
					section.innerHTML = contentDiv + usernameDiv;
				} else {
					section.className = 'service';
					section.innerHTML = usernameDiv + contentDiv;
				}
				CHAT.msgObj.appendChild(section);
				CHAT.scrollToBottom();	
			});
            //连接 ws
			CHAT.socket.conn(ws);

		},
		//发送消息
		sendMsg: function (to, chattype, msg,cb){//接收对象，消息方式，消息内容体{content:'',type:1}
			CHAT.socket.emit('chat',{to:to,chat_type:chattype,msg:msg});
			cb && cb();
		},
		//获取最近聊天用户	
		getChatByDb:function(callback) {
			if('uid' in this.user){
				w.$.getJSON('/api/chat/lastuser/' + this.user.uid, {}, function (res) {
					console.log('getChatByDb', res);
					if (res.status){
						var html = '';
						for (let index = 0; index < res.data.length; index++) {
							// res.data[index].remark='';
							// if(res.data[index].to in  w.friend){
							// 	res.data[index].remark = w.friend[res.data[index].to].remark;
							// }
							res.data[index].nowuser = CHAT.user.uid;
							//var  element = res.data[index];
							//element.remark='';
							//console.log(w.view.formatChatItem(element));
							//html += w.view.formatChatItem(element);
						}
						//w.$('#current_chat_list').html(html);
						callback && callback(res.data);	
					}
				});
			}	
		},
		//获取好友分类	
		getFriendGroupByDb:function(callback) {
			if('uid' in this.user){
				w.$.getJSON('/api/friend/group/' + this.user.uid, {}, function (res) {
					console.log('getFriendGroupByDb', res);
					if (res.status){
						for (let index = 0; index < res.data.length; index++) {
							w.friendGroup[res.data[index].id]=res.data[index];
						}
						//w.$('#current_chat_list').html(html);
						//callback && callback(res.data);	
						CHAT.getFriendByDb(callback);	
					}
				});
			}	
		},
		//获取好友列表	
		getFriendByDb:function(callback) {
			if('uid' in this.user){
				w.$.getJSON('/api/friend/' + this.user.uid, {}, function (res) {
					console.log('getFriendByDb', res);
					if (res.status){
						 w.friendIds = [];
						 w.friendGroup['0']['friendlist']=[];
						 
						for (let index = 0; index < res.data.length; index++) {
							w.friend[res.data[index].fid]=res.data[index];
							friendIds.push(res.data[index].fid);
							if(('friendlist' in w.friendGroup[res.data[index].group])==false){
								w.friendGroup[res.data[index].group]['friendlist']=[];
							}
							w.friendGroup[res.data[index].group]['friendlist'].push(res.data[index]);
						}
						w.planel.initFriendPlanel(w.friendGroup);	
						//告诉服务器好友列表
						CHAT.socket.emit('friends', { friends: w.friendIds });
						//w.$('#current_chat_list').html(html);
						callback && callback(res.data);	
					}
				});
			}	
		},

		//获取群列表	
		getGroupListByDb: function (uid,callback) {	
			
			w.$.getJSON('/api/group/' + uid, {}, function (res){
				console.log('getGroupListByDb', res);
					if (res.status) {
						var groupIds = [];
						for (let index = 0; index < res.data.length; index++) {
							w.groups[res.data[index].groupid] = res.data[index];
							groupIds.push(res.data[index].groupid);
						}
						//w.planel.initFriendPlanel(w.friendGroup);
						//告诉服务器群组列表
						CHAT.socket.emit('groups', {groups: groupIds});
						//w.$('#current_chat_list').html(html);
						console.log('getGroupListByDb',res.data);
						callback && callback(res.data);
					}
				});
			
		},

	};

})();