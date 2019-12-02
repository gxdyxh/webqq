
const untils = require('../libs/tool')
const fs = require('fs');
const path= require('path');
async function  fileup(ctx,next){

    let file_input =  ctx.request.body.filekey || 'file'; //字段名称
    let sub_dir = ctx.request.body.subdir || 'fn_day'; //二级目录
    
    if(sub_dir=='fn_day'){
        sub_dir = untils.formatTime('yyMMdd');
    }

    let file_name =  ctx.request.body.filename || untils.formatTime('hhmmss')+'_'+untils.randStr(4,'0123456789abcdefghijk');//文件名

   
    const file = ctx.request.files.file; // 获取上传文件
    let  filename = file.name;
    var index = filename.lastIndexOf(".");
    var suffix = filename.substr(index);

    var save_dir = path.join('/server/public/upload/',sub_dir);

    //文件夹兼容
    if(!fs.existsSync(path.join(process.cwd(), save_dir))){
        mkdirsSync(path.join(process.cwd(), save_dir));
    }

    function mkdirsSync(dirname) {
        if (fs.existsSync(dirname)) {
            return true;
        } else {
            if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
            }
        }
    }


try {
   
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    const saveName = file_name+suffix;
    let filePath = path.join(process.cwd(),save_dir) + `/${saveName}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = {"status":1,"info":"上传成功",data:{"url":"/upload/"+(sub_dir? sub_dir+'/':'')+saveName,"size":file.size}};
} catch (error) {
    conso.log(error);
    return ctx.body = {"status":0,"info":error.message};
}

    
}

module.exports = {
    fileup
};