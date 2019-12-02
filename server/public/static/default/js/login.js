;$(document).ready(function(){
	
	///文本框选中
	 $('.quc-input').focus(function(){
			 if($(this).attr("name") == "code" || $(this).attr("name") == "smscode"){
			 	 $(this).parents('span.quc-input-bg').addClass('input-focus');
			 }else{
				 $(this).parents('p.quc-field').addClass('input-focus');
			 }
		
	 });
	 $('.quc-input').focusout(function(){
		 if($(this).attr("name") == "code" || $(this).attr("name") == "smscode"){
			 	 $(this).parents('span.quc-input-bg').removeClass('input-focus');
			 }else{
				 $(this).parents('p.quc-field').removeClass('input-focus');
			 }
	 });
	 ///文本框选中


	$('#sendMailCode').click(function(){
		if($(this).attr('data-click')!='true'){
			return false;
		}
        if(CheckMail($("#mail").val())==false){
            layer.msg($("#mail").attr("data-tip"));
            return false;
        }
		var url = $(this).attr('data-url');
        var yz=$.ajax({
            type:'post',
            url:url,
            data:{mail:$("#mail").val()},
            cache:false,
            dataType:'json',
            success:function(data){
                if( data.status =="1" ) //服务器返回false，就将validatePassword2的值改为pwd2Error，这是异步，需要考虑返回时间
                {
                	layer.msg('验证码发送成功，请登录邮箱查看。十分钟内有效！');
					setbtn('#sendMailCode',60);
                }else{
                    layer.msg(data.info);
                }
            },
            error:function(){
                alert("服务器繁忙，请稍后重试。")
            }
        });
    });
	 
	 
});


function login(that){
   
	$submit=true;
	//用户名


	if (CheckLength($("#username").val(),4)==false) {
		$submit=false;
		layer.msg($("#username").attr("data-tip"));
		return false;
	}
	
	// 密码
	
	if (CheckLength($("#password").val(),4)==false) {
		$submit=false;	
		layer.msg($("#password").attr("data-tip"));
		return false;
	}
	// 图片验证码
	if (CheckLength($("#code").val(),4)==false) {
		$submit=false;	
		layer.msg($("#code").attr("data-tip"));
		return false;
	}

	if($submit){
		var yz=$.ajax({  
		     type:'post',   
             url:$("#"+that).attr('action'),
		     data: $("#"+that).serialize(),
		     cache:false,  
		     dataType:'json',  
		     success:function(data){  
		          if( data.status =="1" ) //服务器返回false，就将validatePassword2的值改为pwd2Error，这是异步，需要考虑返回时间  
		          {

					  layer.alert('登录成功。', {icon: 1}, function(index){
						  window.location.href=url_index;
					  });
		           }else{
		        	   layer.msg(data.info);
		        	   $('.quc-captcha-img').click();
		           }
		      },  
		      error:function(){
		    	  alert("服务器繁忙，请稍后重试。")
		      }  
		}); 
		
	}
	 return false;
};

function bind(that){

    $submit=true;
    //用户名


    if (CheckLength($("#"+that+" .username").val(),4)==false) {
        $submit=false;
        layer.msg($("#"+that+" .username").attr("data-tip"));
        return false;
    }

    // 密码

    if (CheckLength($("#"+that+" .password").val(),4)==false) {
        $submit=false;
        layer.msg($("#"+that+" .password").attr("data-tip"));
        return false;
    }
    // 图片验证码
    if (CheckLength($("#"+that+" .code").val(),4)==false) {
        $submit=false;
        layer.msg($("#"+that+" .code").attr("data-tip"));
        return false;
    }

    if($submit){
        var yz=$.ajax({
            type:'post',
            url:$("#"+that).attr('action'),
            data: $("#"+that).serialize(),
            cache:false,
            dataType:'json',
            success:function(data){
                if( data.status =="1" ) //服务器返回false，就将validatePassword2的值改为pwd2Error，这是异步，需要考虑返回时间
                {

                    layer.alert('登录成功。', {icon: 1}, function(index){
                        window.location.href=url_index;
                    });
                }else{
                    layer.msg(data.info);
                }
            },
            error:function(){
                alert("服务器繁忙，请稍后重试。")
            }
        });

    }
    return false;
};
function register(that){

    $submit=true;
    //用户名

    if (CheckLength($("#username").val(),4)==false) {
        $submit=false;
        layer.msg($("#username").attr("data-tip"));
        return false;
    }

    // 密码
    if (CheckLength($("#password").val(),4)==false) {
        $submit=false;
        layer.msg($("#password").attr("data-tip"));
        return false;
    }
    if ($("#password").val()!=$("#repassword").val()) {
        $submit=false;
        layer.msg($("#repassword").attr("data-tip"));
        return false;
    }
    // if(CheckMail($("#mail").val())==false){
    //     $submit=false;
    //     layer.msg($("#mail").attr("data-tip"));
    //     return false;
	// }
    // // 邮件验证码
    // if (CheckLength($("#mcode").val(),4)==false) {
    //     $submit=false;
    //     layer.msg($("#mcode").attr("data-tip"));
    //     return false;
    // }
    // 图片验证码
    if (CheckLength($("#code").val(),4)==false) {
        $submit=false;
        layer.msg($("#code").attr("data-tip"));
        return false;
    }

    if($submit){
      
        var yz=$.ajax({
            type:'post',
            url: $("#"+that).attr('action'),
            data: $("#"+that).serialize(),
            cache:false,
            dataType:'json',
            success:function(data){
                if( data.status =="1" ) //服务器返回false，就将validatePassword2的值改为pwd2Error，这是异步，需要考虑返回时间
                {
                    layer.alert('注册成功，请登录！', {icon: 1}, function(index){
                        window.location.href=url_login;
                    });
                }else{
                    layer.msg(data.info);
                }
            },
            error:function(){
                alert("服务器繁忙，请稍后重试。")
            }
        });

    }
    return false;
};
