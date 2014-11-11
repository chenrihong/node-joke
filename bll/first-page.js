var http = require("http");
var cheerio = require("cheerio");

function pickHtml(doc,callback){
    var $ = cheerio.load(doc);
    var arr = [],len = $(".article").length;
    $(".article").each(function(i,divobj){
        var div = $(this);
        var obj = {};
        obj.content = div.find(".content").text();
        obj.picture = "";
        div.find(".thumb img").each(function(){
            obj.picture = $(this).attr("src");
        });
        arr.push(obj);

        if(+i + 1 == len){
            callback && callback(arr);
        }
    });

}

function start(pagenum,callback){
    http.get({hostname:'www.qiushibaike.com', port:80, path:'/8hr/page/'+pagenum, headers:{"User-Agent":"Mozilla\/5.0 (Windows NT 6.1; WOW64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/38.0.2125.104 Safari\/537.36"}}, function (res) {
        var html = "";
        res.on('data',function(data){
            html += data;
        }).on('end',function(){
            pickHtml(html,function(arr){
                callback && callback(arr);
            });
        });
    });
}

exports.start = start;
