// node web spider
//==========================================
var http  = require("http");
var iconv = require('iconv').Iconv;
function spiderFn(host,port,path,isUtf8,callback){

    http.get({
        hostname:host,
        port:port || 80,
        path:path || "/",
        headers:{
            "User-Agent":"Mozilla\/5.0 (Windows NT 6.1; WOW64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/38.0.2125.104 Safari\/537.36"
        }
     },function(res){
        res.setEncoding('binary');
        var buffers = "";
        res.on('data',function(chunk){
            buffers += chunk;
        }).on('end',function(){
            var html;
            if(isUtf8 == false){
                html = (new iconv('GBK', 'UTF-8')).convert(new Buffer(buffers, 'binary')).toString();
            }else{
                html = new Buffer(buffers, 'binary').toString();
            }
            callback && callback(html,host,port,path);
        });
    });
}

exports.start = spiderFn;