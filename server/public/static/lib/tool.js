;(function ($) {
	//debugger;
    //上传文件
    $.fn.uploader = function (options) {
    	//debugger;
        var date = new Date();
        var settings = {
            btnid: $(this).attr('id'),
            action_url: '',//提交url地址
            input_id: '', //接收图片ID
            exts:'|.bmp|.jpg|.jpeg|.png|.gif|',  //图片文件的后缀名（注意：前后都要加“|”）
            //input_name: 'img',
            up_name:'filedata', //隐藏文件域name 字段名 需要与后台统一
            up_id:'id_'+date.getMonth()+date.getDate()+Math.ceil(Math.random()*10000), //隐藏文件域id
			callback:''
        };
        if (options) {
            $.extend(settings, options);
        }
		var tmp_text=$('#'+settings.btnid).html();
        //TODO  类型判断  大小判断
        $(document).on('change', '#'+settings.up_id, function () {
        	
            var cur = $(this);
          
            var fileVal = cur.val();
            //检验后缀名是否是图片
            var ext = fileVal.slice( fileVal.lastIndexOf('.') - fileVal.length );
            ext = '|' + ext.toLowerCase() + '|';
            if(settings.exts.indexOf(ext) === -1){
                alert('请上传'+settings.exts+'格式文件');
                return false;
            }
			//debugger;
			$('#'+settings.btnid).html('上传中..');
			$('#'+settings.btnid).attr('up_off',false);
			
            cur.wrap('<form enctype="multipart/form-data"/>');
            var options = {
                url : settings.action_url,
                type : "post",
                success : function(data) {
                    
					$('#'+settings.btnid).html(tmp_text);
			      	$('#'+settings.btnid).removeAttr('up_off',false);
					
					// 取消form包裹
                    cur.unwrap();
                    //移除上传表单
                    cur.remove();
                    //上传成功失败判断
                    if(data.status == '1'){
                        $('#'+settings.input_id).val(data.data);
                        if (typeof settings.callback === "function"){
                        	settings.callback(data);
						}
                    }else{
                        alert(data.info);
                    }
                    
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
					$('#'+settings.btnid).text(tmp_text);
			        $('#'+settings.btnid).removeAttr('up_off',false);
                    alert(textStatus + "," + errorThrown);
                }
            };
            cur.parent("form").ajaxSubmit(options);    // 异步提交

        });


//        $(this).click(function () {      //给this绑定click事件
//            if(settings.action_url==''){
//                alert('请设置提交地址');
//                return false;
//            }
//            if(settings.input_id==''){
//                alert('请设置回调字段id');
//                return false;
//            }
//			
//			if($('#'+settings.btnid).attr('up_off')=='false'){
//				return false;
//			}
//            $('#'+settings.up_id).length > 0 && $('#'+settings.up_id).remove(); //检查是否存在 上传文件框
//            $('body').append('<input type="file" name="'+settings.up_name+'" id="'+settings.up_id+'" style="display:none;"/>');
//            $('#'+settings.up_id).click();
//            return false;
//        });
        
        
        $(this).on('click',function () {      //给this绑定click事件
            if(settings.action_url==''){
                alert('请设置提交地址');
                return false;
            }
            if(settings.input_id==''){
                alert('请设置回调字段id');
                return false;
            }
			
			if($('#'+settings.btnid).attr('up_off')=='false'){
				return false;
			}
            $('#'+settings.up_id).length > 0 && $('#'+settings.up_id).remove(); //检查是否存在 上传文件框
            $('body').append('<input type="file" name="'+settings.up_name+'" id="'+settings.up_id+'" style="display:none;"/>');
            $('#'+settings.up_id).click();
            return false;
        });
    }
})(jQuery);