//滑动 结束回调
$.fn.scrollEnd = function(callback, timeout) {          
    $(this).scroll(function(){
      var $this = $(this);
      if ($this.data('scrollTimeout')) {
        clearTimeout($this.data('scrollTimeout'));
      }
      $this.data('scrollTimeout', setTimeout(callback,timeout));
    });
};
  
//with a 1000ms timeout
// $(window).scrollEnd(function(){
//     alert('stopped scrolling');
// }, 1000);

//改变大小 回调
$.fn.resizeEnd = function (callback, timeout) {
    $(this).resize(function () {
        var $this = $(this);
        if ($this.data('resizeTimeout')) {
            clearTimeout($this.data('resizeTimeout'));
        }
        $this.data('resizeTimeout', setTimeout(callback, timeout));
    });
};
 
// $(document).resizeEnd(function () {
//     alert('stopped resizing');
// }, 800);


//背景相关
var bg={
localNewBg:1,
MAX_BG_NUM:0,
newBgImagePath:'/static/img/bg/',
init:function(max) {
    this.MAX_BG_NUM=max;
    this.localNewBg = 1;
    if (window.localStorage) {
        this.localNewBg = !window.localStorage.getItem("localBgImage") ? 1 : parseInt(window.localStorage.getItem("localBgImage")) ;
    }
    this.setBgDom(this.localNewBg);
},
//背景图片保存为本地
setLocalBg:function () {
    var that = this;
    setTimeout(function () {
        if (window.localStorage) {
            window.localStorage.setItem("localBgImage", that.localNewBg);
        }
    }, 2000);
},
//设置图片
setBgDom: function (imgNum) {
    document.getElementById('bgAllImage').innerHTML = "<img class='bgAllImage' src='" + this.newBgImagePath + imgNum + ".jpg'/>";
},
//背景图上张 下张
clickWPPre: function() {
    this.localNewBg--;
    if (this.localNewBg === 0) {
        this.localNewBg = this.MAX_BG_NUM;
    }
    this.setBgDom(this.localNewBg);
    this.setLocalBg();
},
//背景图上张 下张
clickWPNext: function() {
    this.localNewBg++;
    if (this.localNewBg === this.MAX_BG_NUM) {
        this.localNewBg = 0;
    }
    this.setBgDom(this.localNewBg);
    this.setLocalBg();
},

}
/**
 * 格式化模版
 */
var view={
    panels:[],
    s:'<div class="panel chat-panel" id="{panelid}" style="transition: transform 0.4s cubic-bezier(0, 1, 0, 1) 0s; transform: translate3d(0px, 0px, 0px); display: block;">',//开始
    c_head: '<header  class="panel_header"><div class= "btn btn_small btn_left btn_black btn_setting menu_btn "><span class="btn_img"></span></div><h1 class="text_ellipsis padding_20">{{=it.panel_title}}</h1><button class="btn btn_small btn_right btn_black btn_setting close_chat_btn" ><span class="btn_text">关闭</span></button></header >',
    c_body:'<div class="panel_body_container" style="top: 45px; bottom: 50px; overflow: hidden;"><div  class="panel_body chat_container chat_container_{{=it.fid}}" style="transition-property: transform; transform-origin: 0px 0px 0px; transform: translate(0px, 0px) scale(1) translateZ(0px);"></div>',
    c_menu_group:'<ul  class="pannel_menu_list" style="display: block;"><li _uin="{{=it.fid}}" cmd="viewGroupMembers"   class="viewMembers gxcmd"><div class="menu_list_icon"></div>群成员</li><li _uin="{{=it.fid}}" cmd="viewGroupInfo" class="gxcmd viewInfo"><div class="menu_list_icon"></div>群资料</li><li cmd="viewRecord" class="viewRecord"><div class="menu_list_icon"></div>聊天记录</li></ul>',
    c_menu_friend:'<ul class="pannel_menu_list" style="display: block;"><li _uin="{{=it.fid}}" _type="friend"  cmd="viewInfo" class="viewInfo gxcmd"><div class="menu_list_icon"></div>    详细资料</li><li cmd="viewRecord" class="viewRecord"><div class="menu_list_icon"></div>    聊天记录</li></ul>',
    c_foot:'<footer class="chat_toolbar_footer"> <div class="chat_toolbar" data-to="{{=it.fid}}" data-chat_type="{{=it.chat_type}}"><div class="btn btn_face"><span class="btn_img"></span></div><textarea id="chat_textarea" class="input input_white chat_textarea" style="height: 32px;"></textarea><button  id="send_chat_btn" class="send_chat_btn btn btn_small btn_blue" cmd="sendMsg"><span class="btn_text" style="font-size: 12px;">发送</span></button></div>'+
    '<div class="qq_face_area" style="display: none;"><ul class="wrap" style="width: 4200px; transform: translate3d(0px, 0px, 0px);transition: all 0.2s ease-out 0s;"><li class="faceIteam faceIteam1" cmd="chooseFace" style=""><i title="微笑" href="javascript:;"></i><i title="撇嘴" href="javascript:;"></i><i title="色" href="javascript:;"></i><i title="发呆" href="javascript:;"></i><i title="得意" href="javascript:;"></i><i title="流泪" href="javascript:;"></i><i title="害羞" href="javascript:;"></i><i title="闭嘴" href="javascript:;"></i><i title="睡" href="javascript:;"></i><i title="大哭" href="javascript:;"></i><i title="尴尬" href="javascript:;"></i><i title="发怒" href="javascript:;"></i><i title="调皮" href="javascript:;"></i><i title="呲牙" href="javascript:;"></i><i title="惊讶" href="javascript:;"></i><i title="难过" href="javascript:;"></i><i title="酷" href="javascript:;"></i><i title="冷汗" href="javascript:;"></i><i title="抓狂" href="javascript:;"></i><i title="吐" href="javascript:;"></i><i title="delKey" href="javascript:;"></i></li><li class="faceIteam faceIteam2" cmd="chooseFace" style=""><i title="偷笑" href="javascript:;"></i><i title="可爱" href="javascript:;"></i><i title="白眼" href="javascript:;"></i><i title="傲慢" href="javascript:;"></i><i title="饥饿" href="javascript:;"></i><i title="困" href="javascript:;"></i><i title="惊恐" href="javascript:;"></i><i title="流汗" href="javascript:;"></i><i title="憨笑" href="javascript:;"></i><i title="大兵" href="javascript:;"></i><i title="奋斗" href="javascript:;"></i><i title="咒骂" href="javascript:;"></i><i title="疑问" href="javascript:;"></i><i title="嘘" href="javascript:;"></i><i title="晕" href="javascript:;"></i><i title="折磨" href="javascript:;"></i><i title="衰" href="javascript:;"></i><i title="骷髅" href="javascript:;"></i><i title="敲打" href="javascript:;"></i><i title="再见" href="javascript:;"></i><i title="delKey" href="javascript:;"></i></li><li class="faceIteam faceIteam3" cmd="chooseFace" style=""><i title="擦汗" href="javascript:;"></i><i title="抠鼻" href="javascript:;"></i><i title="鼓掌" href="javascript:;"></i><i title="糗大了" href="javascript:;"></i><i title="坏笑" href="javascript:;"></i><i title="左哼哼" href="javascript:;"></i><i title="右哼哼" href="javascript:;"></i><i title="哈欠" href="javascript:;"></i><i title="鄙视" href="javascript:;"></i><i title="委屈" href="javascript:;"></i><i title="快哭了" href="javascript:;"></i><i title="阴险" href="javascript:;"></i><i title="亲亲" href="javascript:;"></i><i title="吓" href="javascript:;"></i><i title="可怜" href="javascript:;"></i><i title="菜刀" href="javascript:;"></i><i title="西瓜" href="javascript:;"></i><i title="啤酒" href="javascript:;"></i><i title="篮球" href="javascript:;"></i><i title="乒乓" href="javascript:;"></i><i title="delKey" href="javascript:;"></i></li><li class="faceIteam faceIteam4" cmd="chooseFace" style=""><i title="咖啡" href="javascript:;"></i><i title="饭" href="javascript:;"></i><i title="猪头" href="javascript:;"></i><i title="玫瑰" href="javascript:;"></i><i title="凋谢" href="javascript:;"></i><i title="示爱" href="javascript:;"></i><i title="爱心" href="javascript:;"></i><i title="心碎" href="javascript:;"></i><i title="蛋糕" href="javascript:;"></i><i title="闪电" href="javascript:;"></i><i title="炸弹" href="javascript:;"></i><i title="刀" href="javascript:;"></i><i title="足球" href="javascript:;"></i><i title="瓢虫" href="javascript:;"></i><i title="便便" href="javascript:;"></i><i title="月亮" href="javascript:;"></i><i title="太阳" href="javascript:;"></i><i title="礼物" href="javascript:;"></i><i title="拥抱" href="javascript:;"></i><i title="强" href="javascript:;"></i><i title="delKey" href="javascript:;"></i></li><li class="faceIteam faceIteam5" cmd="chooseFace" style=""><i title="弱" href="javascript:;"></i><i title="握手" href="javascript:;"></i><i title="胜利" href="javascript:;"></i><i title="抱拳" href="javascript:;"></i><i title="勾引" href="javascript:;"></i><i title="拳头" href="javascript:;"></i><i title="差劲" href="javascript:;"></i><i title="爱你" href="javascript:;"></i><i title="NO" href="javascript:;"></i><i title="OK" href="javascript:;"></i><i title="爱情" href="javascript:;"></i><i title="飞吻" href="javascript:;"></i><i title="跳跳" href="javascript:;"></i><i title="发抖" href="javascript:;"></i><i title="怄火" href="javascript:;"></i><i title="转圈" href="javascript:;"></i><i title="磕头" href="javascript:;"></i><i title="回头" href="javascript:;"></i><i title="跳绳" href="javascript:;"></i><i title="挥手" href="javascript:;"></i><i title="delKey" href="javascript:;"></i></li><li class="faceIteam faceIteam6" cmd="chooseFace" style=""><i title="激动" href="javascript:;"></i><i title="街舞" href="javascript:;"></i><i title="献吻" href="javascript:;"></i><i title="左太极" href="javascript:;"></i><i title="右太极" href="javascript:;"></i><i title="双喜" href="javascript:;"></i><i title="鞭炮" href="javascript:;"></i><i title="灯笼" href="javascript:;"></i><i title="发财" href="javascript:;"></i><i title="K歌" href="javascript:;"></i><i title="购物" href="javascript:;"></i><i title="邮件" href="javascript:;"></i><i title="帅" href="javascript:;"></i><i title="喝彩" href="javascript:;"></i><i title="强" href="javascript:;"></i><i title="爆筋" href="javascript:;"></i><i title="棒棒糖" href="javascript:;"></i><i title="喝奶" href="javascript:;"></i><i title="下面" href="javascript:;"></i><i title="香蕉" href="javascript:;"></i><i title="delKey" href="javascript:;"></i></li></ul><ul class="btnsWrap"><li class="selected" _index="0"></li><li _index="1" class=""></li><li _index="2" class=""></li><li _index="3" class=""></li><li _index="4"></li><li _index="5"></li></ul></div>'+
    '</footer>',
    s_head:'<div id="searchBar" class="search_wrapper"><div class="search_inner"><input id="searchInput" type="text" class="searchInput"/><button id="searchClear" class="searchClear" ></button></div><button id="searchSubmit" class="searchCancel"  >搜索</button></div><div id="search_container_scroll_area" class="scrollWrapper search"><div id="search_container" class="search_container"><ul id="search_result_list" class="list list_white catogory_List"></ul></div></div>',
    e:'</div>',//结束
    chatUser:'<li id="recent-item-{{? it.chat_type==1}}friend{{??}}group{{?}}-{{=it.chatto}}" class="list_item gxcmd" _uin="{{=it.chatto}}" _type="{{? it.chat_type==1}}friend{{??}}group{{?}}" cmd="clickMemberItem"><a href="javascript:void(0);" class="avatar gxcmd" cmd="clickMemberAvatar" _uin="{{=it.chatto}}" _type="{{? it.chat_type==1}}friend{{??}}group{{?}}"><img src="{{=it.chat_headimg}}" onerror="javascript:this.src=\'/static/image/{{? it.chat_type==1}}default{{??}}group_default{{?}}.jpg\'" class="lazyLoadImg loaded"></a><p class="member_nick" id="userNick-{{=it.chatto}}">{{=it.chat_nick}}{{? it.chat_remark}}<span>({{=it.chat_remark}})</span>{{?}}</p><p id="recent-item-{{? it.chat_type==1}}friend{{??}}group{{?}}-{{=it.chatto}}-msg" class="member_msg text_ellipsis">{{=it.content}}</p></li>',
    msgtpl: '<div class="chat_content_group {{=it.who}}  " _sender_uin="{{=it.sendUser.uid}}"><img class="chat_content_avatar" src="{{=it.sendUser.headimg}}" width="40px" height="40px" onerror="javascript:this.src=\'/static/image/default.jpg\'"><p class="chat_nick">{{=it.sendUser.nickname}}</p><p class="chat_content ">{{=it.msg.content}}</p></div>',
    friendListTpl:'<li class="list_group"><div id="groupTitle-{{=it.id}}" class="list_group_title list_group_white_title list_arrow_right" param="{{=it.id}}"><span>{{=it.group}}</span><span class="onlinePercent"><font class="onlineNum">0</font>/{{=it.total}}</span></div><ul id="groupBodyUl-{{=it.id}}" class="list_group_body list list_white catogory_List">{{=it.friendListHtml}}</ul></li>',
    friendItemTpl: '<li id="friend-item-friend-{{=it.fid}}" class="list_item gxcmd" _uin="{{=it.fid}}" _type="friend" cmd="clickMemberItem"><a href="javascript:void(0);" class="avatar" cmd="clickMemberAvatar" _uin="{{=it.fid}}" _type="friend"><img src="{{=it.u_headimg}}" class="lazyLoadImg loaded"  onerror="javascript:this.src=\'/static/image/default.jpg\'"></a><p class="member_nick" id="userNick-{{=it.fid}}">{{=it.u_nickname}}{{? it.remark}}<span>({{=it.remark}})</span>{{?}}</p><p class="member_msg text_ellipsis"><span class="member_state"></span><span class="member_signature">{{=it.u_autograph}}</span></p></li>',
    groupItemTpl: '<li id="group-item-group-{{=it.groupid}}" class="list_item gxcmd" _uin="{{=it.groupid}}" _type="group" cmd="clickMemberItem"><a href="javascript:void(0);" class="avatar" cmd="clickMemberAvatar" _uin="{{=it.groupid}}" _type="group"><img src="{{=it.headimg}}" onerror="javascript:this.src=\'/static/image/group_default.jpg\'"></a><p class="member_nick" >{{=it.group}}</p><p class="member_msg text_ellipsis"></p></li>',
    viewInfoTpl: '<div class="view_info_box"><div class="header_img"><img class="chat_content_avatar" src="{{=it.headimg}}" width="64px" height="64px" onerror="javascript:this.src=\'/static/image/default.jpg\'"></div><div class="header_username">{{=it.nickname}}</div><div class="user_view_info_item user_autograph"><label>个人签名</label>{{=it.autograph}}</div></div>',    
    groupUserTpl:'<div class="view_info_box"><div id="group_user_area_{{=it.group.fid}}"><ul></ul></div></div>',
    groupInfoTpl:'<div class="view_info_box"><div class="header_img "><img class="chat_content_avatar " src="{{=it.headimg}}" width="64px" height="64px" onerror="javascript:this.src=\'/static/image/group_default.jpg\'"></div><div class="header_username gxcmd" _uin="{{=it.fid}}"  cmd="{{=it.titlehandel}}">{{=it.group}}</div><div class="user_view_info_item user_autograph gxcmd" _uin="{{=it.fid}}"  cmd="{{=it.deschandel}}"><label>群公告</label><span>{{=it.desc}}</span></div></div>',
    friendGroupTpl:'<div class="view_info_box"><div id="friend_group_area"><ul></ul></div></div>',
    formatTpl:function(type,params) {
        
        s = this.s;
        var panel_html=[];
        var data ={};
        panel_html.push(s);
        if (type == 'chat') {
            panel_html.push(this.c_head);
            panel_html.push(this.c_body);
            if(params.type=='friend'){
                panel_html.push(this.c_menu_friend);
                 data = window.friend[params.uin];
                 data.panel_title= data.u_nickname;
                 
            }else{

                panel_html.push(this.c_menu_group); 
                data = window.groups[params.uin];
                data.panel_title = data.group;
                data.fid =data.groupid;
                //console.log(data);
            }
            panel_html.push(this.e);
            panel_html.push(this.c_foot);
            data.chat_type = params.type;
        }
        if (type == 'search') {
            panel_html.push(this.c_head);
            data.panel_title = '搜索';
            panel_html.push(this.s_head);
        }
        if (type == 'viewFriendInfo'){
            data = params;
            panel_html.push(this.c_head);
            data.panel_title = '用户信息';
            panel_html.push(this.viewInfoTpl); 
        }
        if(type =='group_user'){
            panel_html.push(this.c_head);
            data = params;
            data.panel_title = '群组用户';
            panel_html.push(this.groupUserTpl);
        }
        if(type =='group_info'){
            panel_html.push(this.c_head);
            data = params.data;
            data.panel_title = '群组信息';
            panel_html.push(this.groupInfoTpl);
        }
        if(type =='showFriendGroup'){
            panel_html.push(this.c_head);
            data = params.data;
            panel_html.push(this.friendGroupTpl);
        }

        

        panel_html.push(this.e);
        var tempFn = doT.template(panel_html.join(''));
       
        return tempFn(data);

        
    },
    formatChatItem: function (data) {
        var tempFn = doT.template(this.chatUser);
        return tempFn(data);
    },
    //格式化消息体
    formatMsgItem: function (msgdata) {
        let data =  msgdata;
        if (data.send == window.CHAT.user.uid){ //自己的消息
            data.who = 'self';
        }else{//其他人的消息
            data.who = 'buddy';
        }

        data.msg.content = iconToImg(data.msg.content);

        var tempFn = doT.template(this.msgtpl);
        return tempFn(data);
    },
    getView:function(type, params,cb) {
        cb = cb || function(){};
        var tmpIndex = params.index || '';
        var index = type + (type=='chat'? '_'+params.type+'_'+params.uin :tmpIndex);
        if (view.panels.indexOf(index)>-1){ //存在键值 切换显示状态即可
            $('#' + index).show().siblings('.panel').hide();
            return true;
        }
        $('#container > .panel').hide();
        $('#container').append(this.formatTpl(type, params).replace(new RegExp('{panelid}', "g"), index));
        view.panels.push(index);
        cb.call();
    }
}
/**
 * 窗体
 */
var planel={
    scroll:null,
    msgscroll: {},
    init:function(){
        var that = this;
        that.setMainPannel();
        $(window).resizeEnd(function() {
            that.setMainPannel();
        },500);
    },
    setScroll:function(dom) {
        this.scroll !== null && this.scroll.destroy();
        this.scroll = null;
        this.scroll = new IScroll('#' + dom, {
            scrollbars: true,
            mouseWheel:true,
            scrollX:false
        });
    },
    setMsgScroll: function (uid,dom,params){
        if (uid in this.msgscroll){
            this.msgscroll[uid] !== null && this.msgscroll[uid].destroy();
            this.msgscroll[uid] = null;
        }
        if (undefined === params){
            params={};
        }
        var param = Object.assign({
            scrollbars: true,
            mouseWheel: true,
            scrollX: false
        }, params);
        this.msgscroll[uid] = new IScroll(dom, param);
    },
    setMainPannel:function(){
        var mainPannel = $('.main-panel').prop("outerHTML");
        if(window.innerWidth < 1000){
            container = $('#container');
            $('#main_container .main-panel').remove(); 
        }else{
            container =  $("#main_container");
            $('#container .main-panel').remove();        
        }

        if(container.find('.main-panel').length==0){
            container.append(mainPannel);
        }
    },
    initChatUserPlanel: function (data) {
        var html = '';
        for (let index = 0; index < data.length; index++) {
            var  element = data[index];
            console.log('initChatUserPlanel',element);
           
            
            element.chat_remark ='';
            
            if(element.chat_type==2){//这里区分是否是群组
        		element.chatto = element.to;
                element.chat_nick = element.g_name; 
                element.chat_headimg = element.g_headimg;
               
            }else{
            
	            if (element.nowuser == element.send){
	                element.chatto = element.to;
	                element.chat_nick = element.t_nickname;
	                element.chat_username = element.t_username;
	                element.chat_mail = element.t_mail;
	                element.chat_tel = element.t_tel;
	                element.chat_addtime = element.t_addtime;
	                element.chat_headimg = element.t_headimg;
	                element.chat_autograph = element.t_autograph;
	            }else{
	                element.chatto = element.send;
	                element.chat_nick = element.s_nickname;
	                element.chat_username = element.s_username;
	                element.chat_mail = element.s_mail;
	                element.chat_tel = element.s_tel;
	                element.chat_addtime = element.s_addtime;
	                element.chat_headimg = element.s_headimg;
	                element.chat_autograph = element.s_autograph;     
	            }
	        
	            
	            if (element.chatto in window.friend){//如果在好友列表  更新备注
	                element.chat_remark = window.friend[element.chatto].remark;
	            }else{//否则添加到信息集合里 方便取数据
	                window.friend[element.chatto] = { 
	                    "uid": element.nowuser, 
	                    "fid": element.chatto, 
	                    "remark": '', 
	                    "u_username": element.chat_username,
	                    "u_nickname": element.chat_nick, 
	                    "u_mail": element.chat_mail, 
	                    "u_tel": element.chat_tel,
	                    "u_addtime": element.chat_addtime,
	                    "u_headimg": element.chat_headimg,
	                    "u_autograph": element.chat_autograph 
	                }
	            }
            
            
            }
            
         
            html += view.formatChatItem(element);
        }
        $('#current_chat_list').html(html);
        planel.setScroll('current_chat_scroll_area');
    },
    insertChatUserPlanel: function (data) {
        var element={};
        //console.log(data);
        element.content = data.msg.content;
        if(data.chatType=='friend'){
            element.chatto = data.chat_mark;
            element.chat_type = 1;
            element.chat_nick = data.sendUser.nickname;
            element.chat_username = data.sendUser.username;
            element.chat_mail = data.sendUser.mail;
            element.chat_tel = data.sendUser.tel;
            element.chat_addtime = data.sendUser.addtime;
            element.chat_headimg = data.sendUser.headimg;
            element.chat_autograph = data.sendUser.autograph;  
            
        }else{
            var groupInfo = window.groups[data.chat_mark];   

            element.chatto = data.chat_mark;
            element.chat_type = 2;
            element.chat_nick = groupInfo.group;
            element.chat_username = '';
            element.chat_mail = '';
            element.chat_tel = '';
            element.chat_addtime = '';
            element.chat_headimg = groupInfo.headimg;
            element.chat_autograph  = ''; 
          
        }
        var html= view.formatChatItem(element);
        //$('#current_chat_list').prepend(html);
        planel.upTopChatUserPlanel(html);
    },
    //最新消息置顶
    upTopChatUserPlanel:function(html){
        $('#current_chat_list').prepend(html);
    },

//初始化群组
    initChatGroupListPlanel:function(data) {
        console.log('initChatGroupListPlanel',data);
        var ghtml = '';
        var groupItemFn = doT.template(view.groupItemTpl);
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                ghtml += groupItemFn(element);
            }
        }
        $('#g_list').html(ghtml);
    },
    //初始化 好友列表
    initFriendPlanel: function (params) {
       
        function initFrinetHtml(data) {
            var html = '';
            var friendItemhtml = '';
            if(('friendlist' in data)==false){
                data.friendlist=[];
            }
            if (data.friendlist.length > 0) {
               
                var friendItemFn = doT.template(view.friendItemTpl);
                for (let index = 0; index < data.friendlist.length; index++) {
                    friendItemhtml += friendItemFn(data.friendlist[index]);
                }
            }

            data.total = data.friendlist.length;
            data.friendListHtml = friendItemhtml;
            var friendHtmlFn = doT.template(view.friendListTpl);
            html = friendHtmlFn(data);
            return html;
        }
       
        var fhtml = '';
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const element = params[key];

               fhtml += initFrinetHtml(element);
           }
       }
        $('#friend_groupList').html(fhtml);
    },
    initSearchPlanel:function(dom){ //设置搜索窗体
       
        view.getView('search',{});

        var type = dom.attr('_type');
        $('#search').removeClass('friend_search group_search').addClass(type+'_search');
        if(type == 'group'){
            $('#search').attr('data-group',dom.attr('data-group'));
            $('.group_search .panel_header .btn_left span').text('添加');
            $('.group_search .panel_header .btn_left span').removeClass('btn_img').addClass('btn_text');
            $('.group_search .panel_header .btn_left').addClass('gxcmd');
            $('.group_search .panel_header .btn_left').attr('cmd','subGroupUser');
            window.checkUser=[];
        }
        

        $('body').on('input','#searchInput',function(){

            if($(this).val() != ""){
                if(!$('#searchBar').hasClass("hascontent")){
                    $('#searchBar').addClass("hascontent");
                }
            }else{
                $('#searchBar').removeClass("hascontent");
            }

        })
 
    },

    initAddGroup:function(){
        layer.prompt({title: '输入群名称，并确认', formType: 0,maxlength: 10}, function(pass, index){
            layer.close(index);
            
            $.post('/api/friend/addgroup',{group:pass},function(res){
                layer.msg(res.info);
                if(res.status){
                    setTimeout(() => {
                        CHAT.getGroupListByDb(CHAT.user.uid, planel.initChatGroupListPlanel); //更新群组列表
                    }, 500);   
                }
            }) 

        });
    },
    clickMemberItem:function(dom){ //设置聊天窗体
        var uin = dom.attr('_uin');
        var type = dom.attr('_type');
        view.getView('chat',{type:type,uin:uin});
        dom.removeClass('notify');
        console.log($('#chat_' + type + '_' + uin + ' .chat_container').height());
        planel.setMsgScroll(uin,'#chat_' + type + '_' + uin + ' .panel_body_container', {
            startY: (0 - parseFloat($('#chat_' + type + '_' + uin + ' .chat_container').height() - $('#chat_' + type + '_' + uin + '.panel_body_container').height()))
        });
    },
    //点击头像
    clickMemberAvatar: function (param, target, e) {
        // var uin = target.parentNode.getAttribute('_uin');
        // var type = target.parentNode.getAttribute('_type');
        // $E.fire(mq.view, 'viewProfile', { from: $M('session'), account: uin, type: type });
    },
    //群组搜索用户
    subGroupUser:function(dom){
        if(checkUser.length==0){
            layer.msg('请选择要添加的好友');
            return false;
        }
        var gid = $('#search').attr('data-group');
        $('#search').remove();
        $('#container .main-panel').show();

        $.ajax({
            type:'post',
            url:'/api/group/add/user',
            data:{gid:gid,uids:checkUser},
            cache:false,
            dataType:'json',
            success:function(data){
                layer.msg(data.info);
                if( data.status =="1" )//删除成功告诉服务器
                {
                   
                }
            },
            error:function(){
                alert("服务器繁忙，请稍后重试。")
            }
        });


    },
    //查看用户资料
    viewInfo:function(dom){
       
        var uin = dom.attr('_uin');
        var type = dom.attr('_type');
        dom.parent('.pannel_menu_list').removeClass('show');    
        console.log('viewInfo',uin,type);
        switch (type) {
            case 'friend': //显示用户信息
                   $.getJSON('/api/user/'+uin,function(res){
                       if(res.status){
                           //debugger;
                           var tempData = {};
                           tempData = res.data;
                           tempData.isFriend = $.inArray(parseInt(uin),friendIds)>-1;
                           tempData.index = '_'+uin;
                           view.getView('viewFriendInfo',tempData,()=>{
                                if(tempData.isFriend){ //是好友
                                    
                                    

                                    $('#viewFriendInfo_'+uin+' .view_info_box').append('<div class="user_view_info_item arrow_r gxcmd" _uin="'+uin+'" cmd="upFriendMark"><label>好友备注</label><span class="mark">'+tempData.nickname+'</span></div>');
                                    $('#viewFriendInfo_'+uin+' .view_info_box').append('<div class="user_view_info_item arrow_r group_btn gxcmd" _uin="'+uin+'" _group="0" cmd="upFriendGroup"><label>好友分组</label><span class="group">我的好友</span></div>');
                                    
                                    let frinedInfo = window.friend[uin];
                                    if(!frinedInfo){
                                        //获取好友信息
                                        $.getJSON('/api/friend/info/'+uin,function(res) { //应该走不到这里
                                            if(res.status){
                                                window.friend[uin]=res.data;
                                                if(res.data.remark){
                                                    $('#viewFriendInfo_'+uin+' .view_info_box .mark').text(res.data.remark);
                                                } 
                                                $('#viewFriendInfo_'+uin+' .view_info_box .group').text(res.data.group_name); 
                                                $('#viewFriendInfo_'+uin+' .view_info_box .group_btn').attr('_group',res.data.group); 
                                            }
                                        })
                                    
                                    }else{
                                        if(frinedInfo.remark){
                                            $('#viewFriendInfo_'+uin+' .view_info_box .mark').text(frinedInfo.remark);
                                        } 
                                        $('#viewFriendInfo_'+uin+' .view_info_box .group').text(frinedInfo.group_name); 
                                        $('#viewFriendInfo_'+uin+' .view_info_box .group_btn').attr('_group',frinedInfo.group); 
                                    }
                                    


                                    setTimeout(() => {
                                        $('#viewFriendInfo_'+uin+' .view_info_box').append('<div class="info_btn_box"><a class="friend_btn red gxcmd" _uin="'+uin+'" _type="friend" cmd="delfriend" href="javascript:void(0);">删好友</a><a class="friend_btn green gxcmd" _uin="'+uin+'" _type="friend" cmd="clickMemberItem" href="javascript:void(0);">发消息</a></div>');
                                    }, 10);
                                }else{//不是好友 显示添加按钮

                                    $('#viewFriendInfo_'+uin+' .view_info_box').append('<div class="info_btn_box"><a class="friend_btn green gxcmd" _uin="'+uin+'" _type="friend" cmd="addfriend" href="javascript:void(0);">加好友</a></div>');
                                }
                           });   
                       }
                   }) 
                break;
            case 'group':
            
            break;
            default:
                break;
        }
    },
    //删除好友
    delfriend:function(dom){
        var fid = dom.attr('_uin');
        $.ajax({
            type:'post',
            url:'/api/friend/del',
            data:{fid:fid},
            cache:false,
            dataType:'json',
            success:function(data){
                layer.msg(data.info);
                if( data.status =="1" )//删除成功告诉服务器
                {
                    //关闭当前窗口
                    $('#viewFriendInfo_'+fid).remove();
                    $('#container .main-panel').show();
                    $('#friend-item-friend-'+fid).remove();
                    $('#chat_friend_'+fid).remove();
                    $('#recent-item-friend-'+fid).remove();
                }
            },
            error:function(){
                alert("服务器繁忙，请稍后重试。")
            }
        });
    },
    //添加好友通知
    addfriend:function(dom){
        var fid = dom.attr('_uin');
       
        $.ajax({
            type:'post',
            url:'/api/friend/add',
            data:{fid:fid},
            cache:false,
            dataType:'json',
            success:function(data){
                layer.msg(data.info);
                if( data.status =="1" )//删除成功告诉服务器
                {
                    //关闭当前窗口
                    $('#viewFriendInfo_'+fid).remove();
                }
            },
            error:function(){
                alert("服务器繁忙，请稍后重试。")
            }
        });
    },
    toggleMenuList:function(dom){//切换菜单显示状态
       var pannel_menu_arr = dom.closest('.chat-panel').find('ul.pannel_menu_list');
       console.log('pannel_menu_arr',pannel_menu_arr);
       if(pannel_menu_arr.length>0){
            var pannel_menu =pannel_menu_arr[0];
            if($(pannel_menu).hasClass('show')){
                $(pannel_menu).removeClass('show');
            }else{
                $(pannel_menu).addClass('show');
            }
       }

    },
    toggleFicePannel:function(dom){//切换菜单显示状态
        dom.closest('.chat-panel').find('.panel_body_container').toggleClass('panelShowFace');
        dom.closest('.chat-panel').find('.qq_face_area').toggle();
        
     },
     setFaceIndex:function(dom){//切换表情显示状态
        if(!dom.hasClass('selected')){
            var index = dom.attr('_index');
            let width = $('.faceIteam').width();
            dom.addClass('selected').siblings().removeClass('selected');
            dom.parent('ul.btnsWrap').prev('ul.wrap').css("transform","translate3d("+(0-index*width)+"px, 0px, 0px)");
        }       
     },
     //群组选人
     selectUser:function(dom){
         var uid =  dom.attr('_uin');
        if(dom.hasClass('selected')){
            if(checkUser.indexOf()>-1){
                checkUser.splice(checkUser.indexOf(uid), 1);
            }
            dom.removeClass('selected');
        }else{
            dom.addClass('selected');
            window.checkUser.push(uid);
        }
     },
     //获取通知列表
     getNoticlelist:function(){//获取用户通知消息
        $('#notice_list').html('');
        $.ajax({
            type:'get',
            url:'/api/notice/list',
            cache:false,
            dataType:'json',
            success:function(data){
                if( data.status =="1" )//删除成功告诉服务器
                {
                    let note_tpl={};
                    note_tpl='<li class="notice_item gxcmd" cmd="noticeAct" data-id="{{=it.id}}" data-type="{{=it.type}}" data-status="{{=it.status}}" ><div class="item_header"><label>{{=it.typestr}}通知</label><span>{{=it.timestr}}</span></div><div class="notice_body">{{=it.message}}</div>{{? it.type!=0}}<div class="notice_status_box"><span class="status_{{=it.status}}">{{? it.status==0}}未处理{{??}}已处理{{?}}</div></div>{{?}}</li>';
                 
                    let typeArr = ['系统','好友','群组'];

                   if(data.data.length>0){
                       for (let index = 0; index < data.data.length; index++) {
                           const element = data.data[index];
                            //2019-10-31T08:18:03.000Z
                           element.timestr = element.addtime.replace('T',' ').slice(5,16);
                           element.typestr=typeArr[element.type];
                           var friendHtmlFn = doT.template(note_tpl);
                           $('#notice_list').append(friendHtmlFn(element));
                       }
                   }
                }
            },
            error:function(){
                alert("服务器繁忙，请稍后重试。")
            }
        });
     },
     noticeAct:function(dom){

        var type = dom.attr('data-type');
        var status = dom.attr('data-status');
        var id = dom.attr('data-id');


        if(type==0 || status>0){  
            layer.confirm('删除消息？', {
                offset: 'auto',
                btn: ['删除','取消'] //按钮
              }, function(){
                
                $.ajax({
                    type:'post',
                    url:'/api/notice/del',
                    data:{id:id},
                    cache:false,
                    dataType:'json',
                    success:function(data){
                        layer.msg(data.info);
                        if( data.status =="1" )//删除成功告诉服务器
                        {
                            dom.remove();
                        }
                    },
                    error:function(){
                        alert("服务器繁忙，请稍后重试。")
                    }
                });

              }, function(){ //关闭弹窗
                
              });

        }else{

            function act(url,act,cb){
                cb = cb || function(){};
                $.ajax({
                    type:'post',
                    url:url,
                    data:{id:id,agree:act},
                    cache:false,
                    dataType:'json',
                    success:function(data){
                        layer.msg(data.info);
                        if( data.status =="1" )//删除成功告诉服务器
                        {
                            planel.getNoticlelist();
                            cb.call();
                        }
                    },
                    error:function(){
                        alert("服务器繁忙，请稍后重试。")
                    }
                });
            }

            function uplist(){
                setTimeout(() => {
                    if(type==2){//群组 
                            CHAT.getGroupListByDb(CHAT.user.uid, planel.initChatGroupListPlanel); //更新群组列表
                    }else{// 好友

                        CHAT.getFriendGroupByDb(function(){
                            CHAT.getChatByDb(planel.initChatUserPlanel);
                        });

                    }
                }, 500); 
            } 


            layer.confirm('是否同意'+(type==1?'好友':'群组')+'请求？', {
                offset: 'auto',
                btn: ['同意','不同意','取消'] //按钮
              }, function(){
                act('/api/notice/act',true,()=>{
                    //根据类型更新 列表
                    uplist();
                });
              }, function(){
                act('/api/notice/act','');
              }, function(index){
                //按钮【按钮二】的回调
               
              });
        }
     },
     //删除成员
     delGroupUser:function(dom){

        var group = dom.attr('data-group');
        var uid =  dom.attr('data-uid');

        $.ajax({
            type:'post',
            url:'/api/group/del/user',
            data:{group:group,uid:uid},
            cache:false,
            dataType:'json',
            success:function(data){
                layer.msg(data.info);
                if( data.status == "1" )//删除成功告诉服务器
                {
                    dom.closest('.list_item').remove();
                }
            },
            error:function(){
                alert("服务器繁忙，请稍后重试。")
            }
        });


     },
     //显示群组成员
     viewGroupMembers:function(dom){
         
        var gid = dom.attr('_uin');
        var groupInfo = window.groups[gid];
        dom.parent('.pannel_menu_list').removeClass('show');

        $.getJSON('/api/friend/groupuser/'+gid,function(res){
                //debugger;
                var param={};
                param.index = '_'+gid;
                param.data = res.data;
                param.group = groupInfo;
               view.getView('group_user',param,()=>{
               
                if(groupInfo.create_uid  == window.CHAT.user.uid){ //创建者 
                    $('#group_user_'+gid+' .panel_header .btn_left ').addClass('btn_add gxcmd').removeClass('btn_setting');
                    $('#group_user_'+gid+' .panel_header .btn_left ').attr('cmd','initSearchPlanel');
                    $('#group_user_'+gid+' .panel_header .btn_left ').attr('data-group',gid);
                    $('#group_user_'+gid+' .panel_header .btn_left ').attr('_type','group');
                }else{
                    $('#group_user_'+gid+' .panel_header .btn_left').remove();
                }

                $('#group_user_area_'+gid+' ul').html('');
                for (let index = 0; index < res.data.length; index++) {
                    let element = res.data[index];
                    
                    var rigth_str = "";
                    if(element.mamager==2){
                        rigth_str='<span class="icon_create"><img src="/static/image/creater_icon.png"></span>';
                    }
                    if(element.mamager==1){
                        rigth_str='<span class="icon_create"><img src="/static/image/manager_icon.png"></span>';
                    }
                    if(groupInfo.create_uid  == window.CHAT.user.uid){ //创建者 
                        rigth_str = '<span class="icon_create gxcmd" cmd="delGroupUser" data-group="'+gid+'" data-uid="'+element.uid+'"><img src="/static/image/user_del.png"></span>';
                        if(element.uid==window.CHAT.user.uid){
                            rigth_str='<span class="icon_create"><img src="/static/image/creater_icon.png"></span>';
                        }
                        
                    }
                    var friendItemTpl ='<li class="list_item gxcmd" cmd="viewInfo" _uin="{{=it.uid}}" _type="friend" ><a href="javascript:void(0);" class="avatar " cmd="clickMemberAvatar" _uin="{{=it.id}}" _type="friend"><img src="{{=it.headimg}}" onerror="javascript:this.src=\'/static/image/default.jpg\'" class="lazyLoadImg loaded"></a><p class="member_nick" id="userNick-6">{{=it.nickname}}</p>'+rigth_str+'</li>';
                   
                    var friendHtmlFn = doT.template(friendItemTpl);
                    $('#group_user_area_'+gid+' ul').append(friendHtmlFn(element));
                }
                    setTimeout(() => {
                        planel.setScroll('group_user_area_'+gid);
                    }, 100);
                
               })
        })

     },
     //显示群信息
     viewGroupInfo:function(dom){

        var gid = dom.attr('_uin');
        var groupInfo = window.groups[gid]; //群信息
            console.log(groupInfo);
        dom.parent('.pannel_menu_list').removeClass('show');

        var param={};
        param.index = '_'+gid;
        param.data = groupInfo;
        param.data.imghandel = '';
        param.data.deschandel = '';
        if(groupInfo.mamager==2){
            param.data.titlehandel = 'upGroupHeader';
            param.data.deschandel = 'upGroupDesc';
        }
        

       view.getView('group_info',param,()=>{

        if(groupInfo.mamager==2){
            $('#group_info_'+gid+' .view_info_box').append('<div class="info_btn_box"><a class="friend_btn red gxcmd" _uin="'+gid+'" _type="group" _txt="解散" cmd="outGroup" href="javascript:void(0);">解散群组</a></div>');
        }else{
            $('#group_info_'+gid+' .view_info_box').append('<div class="info_btn_box"><a class="friend_btn red gxcmd" _uin="'+gid+'" _type="group" _txt="退出" cmd="outGroup" href="javascript:void(0);">退出群组</a></div>');
        }


          upload.render({
            elem: '#group_info_'+gid+' .chat_content_avatar'
            ,url: '/api/fileup' //上传接口
            ,data:{subdir:'group_hader',filename:gid}
            ,done: function(res){
            //上传完毕回调  
                if(res.status){
                    $.post('/api/group/update/headimg',{data:res.data.url,group:gid},function(res){
                        layer.msg(res.info);
                        if(res.status){
                           $('#group_info_'+gid+' .chat_content_avatar').attr('src',res.data.url+'?t='+Math.random());
                           window.groups[gid].headimg=res.data.url;
                        }
                    })
                }else{
                    alert('图片上传失败');
                }
            }
            ,error: function(){
                //请求异常回调
                    alert('图片上传失败');
                }
          })
  
       });


     },
     upGroupHeader:function(dom){//修改群名称
        var gid = dom.attr('_uin');
        layer.prompt({title: '输入群名称', formType:0,maxlength: 10}, function(pass, index){
            layer.close(index);
            $.post('/api/group/update/group',{data:pass,group:gid},function(res){
                layer.msg(res.info);
                if(res.status){
                    dom.text(pass);
                    window.groups[gid].group=pass;
                }
            }) 
        });

     },
     upGroupDesc:function(dom){//修改群公告
        var gid = dom.attr('_uin');
        layer.prompt({title: '输入群公告', formType:2,maxlength: 50}, function(pass, index){
            layer.close(index);
            $.post('/api/group/update/desc',{data:pass,group:gid},function(res){
                layer.msg(res.info);
                if(res.status){
                    dom.children('span').text(pass);
                    window.groups[gid].desc=pass;
                }
            }) 
        });
     },
     upFriendMark:function(dom) { //修改好友备注
        var fid = dom.attr('_uin');
        layer.prompt({title: '输入好友备注', formType:0,maxlength: 10}, function(pass, index){
            layer.close(index);
            $.post('/api/friend/update/remark',{data:pass,fid:fid},function(res){
                layer.msg(res.info);
                if(res.status){
                    dom.children('.mark').text(pass);
                    window.friend[fid].remark = pass;

                    setTimeout(() => {
                        CHAT.getFriendGroupByDb(function(){
                            CHAT.getChatByDb(planel.initChatUserPlanel);
                        });
                    }, 100);

                }
            }) 
        });
     },
     outGroup:function(dom){ //退出群组，创建者退出 则解散
        var gid = dom.attr('_uin');
        var txt = dom.attr('_txt');

        layer.confirm('确定要'+txt+'群组？', {
            btn: [txt,'取消'] //按钮
          }, function(index){
            layer.close(index);
            $.post('/api/group/out',{group:gid},function(res){
                layer.msg(res.info);
                if(res.status){
                   $('#group_info_'+gid).remove();
                   $('#container  > .main-panel').show();

                   setTimeout(() => {
                    CHAT.getGroupListByDb(CHAT.user.uid, planel.initChatGroupListPlanel); //更新群组列表
                    }, 500);  

                }
             }) 
          });
     },
     clickLogout:function(dom){ //退出
        CHAT.logout();
        window.location.replace("/logout");
     },
     updateAutograph:function(dom){//更改签名
        layer.prompt({title: '输入个人签名', formType:2,maxlength: 50}, function(pass, index){
            layer.close(index);
            $.post('/api/user/update/autograph',{data:pass},function(res){
                layer.msg(res.info);
                if(res.status){
                   $('#now_user_autograph').text(pass);
                   CHAT.user.autograph = pass;
                }
            }) 

        });
     },
     updateNickname:function(dom){//更改昵称
        layer.prompt({title: '输入昵称', formType:0,maxlength: 8}, function(pass, index){
            layer.close(index);
            $.post('/api/user/update/nickname',{data:pass},function(res){
                layer.msg(res.info);
                if(res.status){
                   $('#now_user_nickname').text(pass);
                   CHAT.user.nickname = pass;
                }
            }) 

        });
     },
     updateHeadImg:function(src){//更改头像
            $.post('/api/user/update/headimg',{data:src},function(res){
                layer.msg(res.info);
                if(res.status){
                   $('.now_user_header').attr('src',src+'?t='+Math.random());
                   CHAT.user.headimg = src;
                }
            })
     },
     addUserGroup:function (dom) {//添加用户分组
        layer.prompt({title: '输入分组名称', formType:0,maxlength: 10}, function(pass, index){
            layer.close(index);
            $.post('/api/user/group/add',{data:pass},function(res){
                layer.msg(res.info);
                if(res.status){
                    planel.upUserGroupList();

                    setTimeout(() => {
                        CHAT.getFriendGroupByDb(function(){
                            CHAT.getChatByDb(planel.initChatUserPlanel);
                        });
                    }, 100);

                }
            }) 

        });
     },

     editUserGroup:function (dom) {//添加用户分组
        let id=dom.attr('data-id');
        let oldName = dom.siblings('.group_name').text();
        layer.prompt({title: '输入分组名称', formType:0,value:oldName,maxlength: 10}, function(pass, index){
            layer.close(index);
            $.post('/api/user/group/edit',{data:pass,gid:id},function(res){
                layer.msg(res.info);
                if(res.status){
                    planel.upUserGroupList();
                    
                    setTimeout(() => {
                        CHAT.getFriendGroupByDb(function(){
                            CHAT.getChatByDb(planel.initChatUserPlanel);
                        });
                    }, 100);

                }
            }) 

        });
     },

     delUserGroup:function (dom){//删除用户分组
        let id=dom.attr('data-id');
       
        layer.confirm('确定删除分组?\n分组好友将移动到默认分组下', function(index){
            //do something
            
            $.post('/api/user/group/del',{gid:id},function(res){
                layer.msg(res.info);
                if(res.status){
                    planel.upUserGroupList();
                    
                    setTimeout(() => {
                        CHAT.getFriendGroupByDb(function(){
                            CHAT.getChatByDb(planel.initChatUserPlanel);
                        });
                    }, 100);

                }
            }) 
            layer.close(index);
        }); 
     },

     upUserGroupList:function(cb) {
         cb = cb || function () {};
        $('#friend_group_area ul').html('');
        $.getJSON('/api/friend/group/'+nowUserId,function(res) {
            var friendItemTpl ='<li class="user_group_item list_item"><span class="group_name">{{=it.group}}</span>{{=it.right_btn}}</li>';
            var friendHtmlFn = doT.template(friendItemTpl);
            var rigth_str = "";
          
            if(res.status){
                for (let index = 0; index < res.data.length; index++) {
                    const element = res.data[index];
                    element.right_btn='';
                    if(element.id>0){
                        element.right_btn='<span class="icon_create gxcmd" data-id="'+element.id+'" cmd="delUserGroup"><img src="/static/image/user_del.png"></span><span class="icon_create_2 gxcmd" data-id="'+element.id+'" cmd="editUserGroup"><img src="/static/image/group_edit.png"></span>';
                    }
                    
                    $('#friend_group_area ul').append(friendHtmlFn(element));
                }
                cb.call();
            }

        })
     },
     showFriendGroup:function() { //显示分组管理
        $('#showFriendGroup').remove();
        delete view.panels['showFriendGroup'];

        var tempData = {};
        tempData.index = '';
        tempData.data={};
        tempData.data.panel_title="管理分组";

        view.getView('showFriendGroup',tempData,()=>{
            
            $('#showFriendGroup .panel_header .btn_left ').addClass('btn_add gxcmd').removeClass('btn_setting');
            $('#showFriendGroup .panel_header .btn_left ').attr('cmd','addUserGroup');

            $('#friend_group_area ul').html('');

            $.getJSON('/api/friend/group/'+nowUserId,function(res) {
                var friendItemTpl ='<li class="user_group_item list_item"><span class="group_name">{{=it.group}}</span>{{=it.right_btn}}</li>';
                var friendHtmlFn = doT.template(friendItemTpl);
                var rigth_str = "";
            
                if(res.status){
                    for (let index = 0; index < res.data.length; index++) {
                        const element = res.data[index];
                        element.right_btn='';
                        if(element.id>0){
                            element.right_btn='<span class="icon_create gxcmd" data-id="'+element.id+'" cmd="delUserGroup"><img src="/static/image/user_del.png"></span><span class="icon_create_2 gxcmd" data-id="'+element.id+'" cmd="editUserGroup"><img src="/static/image/group_edit.png"></span>';
                        }
                        
                        $('#friend_group_area ul').append(friendHtmlFn(element));
                    }
                    cb.call();
                }

            })
           

        });
     },
     //更改用户所在好友分组
     upFriendGroup:function(dom){

        $('#showFriendGroup').remove();
        delete view.panels['showFriendGroup'];

        let fid = dom.attr('_uin');
        let gid = dom.attr('_group');

        var tempData = {};
        tempData.index = '';
        tempData.data={};
        tempData.data.panel_title="修改分组";

        view.getView('showFriendGroup',tempData,()=>{
            
            $('#friend_group_area ul').html('');
            $.getJSON('/api/friend/group/'+nowUserId,function(res) {
                var friendItemTpl ='<li class="user_group_item list_item {{=it.selected}} gxcmd" _uin="'+fid+'" _gid="{{=it.id}}" cmd="changeFriendGroup"><span class="group_name">{{=it.group}}</span></li>';
                var friendHtmlFn = doT.template(friendItemTpl);
                var rigth_str = "";
            
                if(res.status){
                    for (let index = 0; index < res.data.length; index++) {
                        const element = res.data[index];
                        element.selected='';
                        if(element.id==gid){
                            element.selected='selected';
                        }
                        
                        $('#friend_group_area ul').append(friendHtmlFn(element));
                    }
                    
                }

            })
            
        });

     },
     changeFriendGroup:function(dom){
         let fid = dom.attr('_uin');
         let gid = dom.attr('_gid');
         var load = layer.load(2);
         $.post('/api/user/group/change',{gid:gid,fid:fid},function(res){
            layer.close(load);   
            if(res.status){
               
                dom.addClass('selected').siblings().removeClass('selected');
                
                setTimeout(() => {
                    CHAT.getFriendGroupByDb(function(){
                        CHAT.getChatByDb(planel.initChatUserPlanel);
                    });
                }, 100);

            }else{
                layer.msg(res.info);
            }
        })

     }
}

function initSearchFriend(data,type){
    let fnname = 'viewInfo';
    if(type =='group'){
        fnname = 'selectUser'; 
    }
    //debugger;
    var friendItemTpl ='<li class="list_item gxcmd" cmd="'+fnname+'" _uin="{{=it.id}}" _type="friend" ><a href="javascript:void(0);" class="avatar" cmd="clickMemberAvatar" _uin="{{=it.id}}" _type="friend"><img src="{{=it.headimg}}" onerror="javascript:this.src=\'/static/image/default.jpg\'" class="lazyLoadImg loaded"></a><p class="member_nick" id="userNick-6">{{=it.nickname}}</p></li>';
    var friendHtmlFn = doT.template(friendItemTpl);
    //var html = friendHtmlFn(data); 
    return friendHtmlFn(data); 
}


//操作监听
$(function(){
    //隐藏聊天窗口
    $('body').on('click','.close_chat_btn',function(){
        $(this).closest('.chat-panel').hide();
        if($(this).closest('#container').find('.main-panel').length>0){
            if($(this).closest('#container').find('.main-panel').is(':hidden')){
                $(this).closest('#container').find('.main-panel').show();
            }    
        }
    });
    //菜单按钮
    $('body').on('click','.menu_btn',function(){
        planel.toggleMenuList($(this));
    });
    //表情框
    $('body').on('click','.btn_face',function(){
        planel.toggleFicePannel($(this));
    });
    //表情列表操作
    $('body').on('click','ul.btnsWrap li',function(){
        planel.setFaceIndex($(this));
    });
    //点击发送
    $('body').on('click','.send_chat_btn',function() {
        var parent = $(this).closest('.chat_toolbar');
        var textarea = parent.find('.chat_textarea');
        var to = parent.attr('data-to');
        var chat_type = parent.attr('data-chat_type');
        if(textarea.val()==''){
            //layer.msg('不能发送空消息');
            return false;
        }
        CHAT.sendMsg(to, chat_type, { content: textarea.val(),type:1},function(){
        	textarea.val('');
        });
    })
    //点击好友分组
    $('body').on('click', '#friend_groupList > .list_group > .list_group_title', function (e) {
        var parent = $(this).parent();
        parent.toggleClass('active');
        setTimeout(function () {
            window.planel.scroll.refresh();
        },5);
    });
    //绑定事件
    $('body').on('click', '.gxcmd', function(e) {
        var event = $(this).attr('cmd');
        
        if(event in planel){
            planel[event]($(this));
        }
        e.stopPropagation();    //  阻止事件冒泡
    });
    //点击表情
    $('body').on('click','.qq_face_area .wrap i',function(){
        let icon = $(this).attr('title');
        let content =  $(this).closest('.chat_toolbar_footer').find('.chat_textarea').val();
        if(icon=='delKey'){
            if(content!=''){
                $(this).closest('.chat_toolbar_footer').find('.chat_textarea').val(content.slice(0,content.length-1));    
            }
            return;
        }
        
        $(this).closest('.chat_toolbar_footer').find('.chat_textarea').val(content+'[:'+icon+']');
    });

    //清空搜索框
    $('body').on('click', '#searchClear', function() {
        $('#searchInput').val('');
        $('#searchBar').removeClass("hascontent");
        $('#search_result_list').html('');
    });
     //提交搜索框
    $('body').on('click', '#searchSubmit', function() {
        var keyword = $('#searchInput').val();
        if(keyword==''){
            return ; 
        }
        $('#search_result_list').html('');
        $.getJSON('/api/user/search/'+keyword,function(res){
           
            if(res.status){
                if(res.data.length>0){
                    //debugger
                        let type = 'friend';
                        if($('#search').hasClass('group_search')){
                             type = 'group';
                        }

                        for (let index = 0; index < res.data.length; index++) {
                            if(res.data[index].id == nowUserId){
                                continue;
                            }
                           
                            res.data[index].isFriend = $.inArray(res.data[index].id,friendIds);
                            $('#search_result_list').append(initSearchFriend(res.data[index],type));
                            setTimeout(() => {
                                planel.setScroll('search_container_scroll_area'); 
                            }, 100);
                        }
                }else{
                    layer.msg('未搜索到用户');
                }                
            }else{
                layer.msg(res.info);
            }

        })  

    });
    

})
//表情 字符串转图片
function iconToImg(content){
    let icons = content.match(/\[:(([\u4e00-\u9fa5]|[\w])+)\]/g);
    if(icons!==null){
        for (let index = 0; index < icons.length; index++) {
            let element = icons[index];
            let text = element.match(/([\u4e00-\u9fa5]|[\w])+/g);
            if( text!==null &&  text[0] in iconImg){
                let iconSrc = '<img class="eif" src="/static/qq_eif/'+iconImg[text[0]]+'.gif"/>';
                content = content.replace(element,iconSrc);
            }
        }
    }
    return content;
}