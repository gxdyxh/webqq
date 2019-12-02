const until = require('util')
const crypto = require('crypto');


until.crypto = crypto

//加密
until.md5 = (str)=>{
    return crypto.createHash('md5').update(str).digest('hex');
}
until.sha1 = (str)=>{
    return crypto.createHash('sha1').update(str).digest('hex');
}


until.randStr=(len,str)=>{
    str = str  || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    len = len || 4;
    let strArr = str.split("");
    strArr.sort(function(){ return Math.random() - 0.5})
    return strArr.join("").substr(0, len);
}


//base64 加密
until.base64_encode=(str)=>{
    return Buffer.from(str).toString("base64");
}
//base64 解密
until.base64_decode=(str)=>{
    return Buffer.from(str, "base64").toString();
}

//str_rot13 
until.str_rot13=(str)=>{
    
    return (str + '').replace(/[a-z]/gi, function (s) {
      return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13))
    })

}   

//字符串加密
until.str_encrypt=(str,key)=>{
	key = key||'';
	return until.base64_encode (until.str_rot13 (until.base64_encode ( str + key ) ) );
}
//字符串解密
until.str_decrypt=(str,key)=>{
	key = key||'';
	str = until.base64_decode ( until.str_rot13 ( until.base64_decode ( str + key ) ) );
    if (key){
        str = str.replace(key,'');
    }
	return str;
}
/**
 * 格式化时间
 * @param {*} format  格式 
 * @param {*} date  Date实体
 * formatTime("yyyy年MM月dd日",new Date());
 * formatTime("MM/dd/yyyy",new Date());
 * formatTime("yyyyMMdd",new Date());
 * formatTime("yyyy-MM-dd hh:mm:ss",new Date());
 */
until.formatTime = (format, date)=>{
    if (undefined === date){
        date = new Date();
    }
    var that = date;
    var o = {
        "M+": that.getMonth() + 1, //month 
        "d+": that.getDate(), //day 
        "h+": that.getHours(), //hour 
        "m+": that.getMinutes(), //minute 
        "s+": that.getSeconds(), //second 
        "q+": Math.floor((that.getMonth() + 3) / 3), //quarter 
        "S": that.getMilliseconds() //millisecond 
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (that.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
        for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}


module.exports = until