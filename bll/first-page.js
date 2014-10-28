var http = require("http");
var fs   = require("fs");
var cheerio = require("cheerio");

function downloadText(doc){
    var $ = cheerio.load(doc);

    $(".content").each(function(idx,obj){
        fs.writeFile('public/qiushibaike.txt','',function(err){
            if (err) throw err;
            fs.appendFile('public/qiushibaike.txt',$(obj).text());
            fs.appendFile('public/qiushibaike.txt',"\r\n\r\n");
        });
    });

    $(".thumb").find("img").each(function(idx,obj){
        var src = $(obj).attr("src");
        if(/pic.qiushibaike.com/.test(src)){

            http.get(src, function(res) {
                res.setEncoding('binary');//二进制（binary）
                var imageData ='';
                res.on('data',function(data){//图片加载到内存变量
                    imageData += data;
                }).on('end',function(){//加载完毕保存图片
                    var imageName = src.substr(src.length-12,12);
                    fs.writeFile('public/images/'+imageName, imageData, 'binary', function (err) {//以二进制格式保存
                        if (err) throw err;
                        console.log('file saved');
                    });
                });

            }).on('error', function(e) {
                console.log("Got error: " + e.message);
            });
        }
    });
}

function catchCore(){

    http.get({hostname:'www.qiushibaike.com', port:80, path:'/', headers:{"User-Agent":"Mozilla\/5.0 (Windows NT 6.1; WOW64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/38.0.2125.104 Safari\/537.36"}}, function (res) {
        var html = "";
        res.on('data',function(data){
            html += data;
        }).on('end',function(){
            downloadText(html);
        });
    })
}

exports.first = catchCore;
