/**
 * 验证邮箱
 * 
 * @param mail
 * @returns
 */
function CheckMail(mail) {
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(mail)){
		return true;
	}else {
		return false;
	}
}
/**
 * 验证手机号
 * 
 * @param mobile
 * @returns
 */
function CheckMobile(mobile) {
	var filter = /^1[0-9]{10}$/i;
	if (filter.test(mobile)){
		return true;
	}else {
		return false;
	}
}
/**
 * 验证用户名
 * 
 * @param mobile
 * @returns
 */
function CheckUsername(username) {
	var filter = /^[a-zA-Z0-9]{1}([a-zA-Z0-9]|[._]){5,16}$/;
	if (filter.test(username)){
		return true;
	}else {
		return false;
	}
}
/**
 * 验证密码
 * 
 * @param pwd
 * @returns
 */
function CheckPasswd(pwd) {
	var filter = /^[a-zA-Z0-9]{1}([a-zA-Z0-9]|[._]){5,16}$/;
	if (filter.test(pwd)){
		return true;
	}else {
		return false;
	}
}
/**
 * 验证身份证
 * 
 * @param cardid
 * @returns
 */
function CheckCardId(cardid) {
	var filter = /\d{17}[\d|X]|\d{15}/;
	if (filter.test(cardid)){
		return true;
	}else {
		return false;
	}
}

/**
 * 验证正整数
 * 
 * @param str
 * @returns
 */
function CheckPInt(str) {
    var g = /^[1-9]*[1-9][0-9]*$/;
    return g.test(str);
}
/**
 * 验证整数
 * 
 * @param str
 * @returns
 */
function CheckInt(str)
{
    var g=/^-?\d+$/;
    return g.test(str);
}
/**
 * 验证是否是数字
 * 
 * @param input
 * @returns
 */
function CheckFloat(nubmer)
{
     var re = /^[0-9]+.?[0-9]*$/;   // 判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
     if (re.test(nubmer)){
    	 return true;
     }else {
    		return false;
     }
}
/**
 * 判断两值相等
 * @param str1
 * @param str2
 * @returns
 */
function CheckEqual(str1,str2)
{
     if (str1==str2){
    	 return true;
     }else {
    		return false;
     }
}
/**
 * 检查长度
 * @param str1
 * @param str2
 * @returns
 */
function CheckLength(str1,str2){
	if (str1.length<str2){
   	 	return false;
    }else {
   		return true;
    }
}

