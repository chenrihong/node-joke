// sand king
//=========================================

var cheerio = require("cheerio");
var dbc = require('../inc/mysql-client').init();
var spider = require('./spider');


function findDownloadUrl($,callback){
    $("table").each(function(i,obj){

            var url = $(this).find("a").attr("href");

            if(/ftp/gi.test(url)){
                console.log(url);
                callback && callback(url);
                return false;
            }
    });
}

function detailPage(id,doc){
    var $ = cheerio.load(doc);

    findDownloadUrl($,function(downloadurl){
        var arrsql = [];

        var remark =  $("#Zoom").text();
        remark = remark.replace(/'/g,"’");

        var sql = "UPDATE mv_resource SET cate='"+ $(".position a").text() +"', remark='"+ remark +"', ressrc='"+ downloadurl +"' WHERE (id='"+ id +"');"
        arrsql.push(sql);
        $("img").each(function(i){
            var img = $(this);
            var src = img.attr("src");
            arrsql.push("INSERT INTO mv_images (mv_id, mv_imgurl, mv_imgtitle,mv_imgindex) VALUES('"+ id +"','"+ src +"','','"+ i +"')");
        });

        for(var i in arrsql){
            dbc.insert(arrsql[i],null,function(err, res){
                err && console.log(err);
            });
        }
    });
}

function pickHtml(doc){

    var $ = cheerio.load(doc);
    var date = new Date();
    var dbdate = date.getFullYear()+"-"+(date.getMonth()*1+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

    $(".ulink").each(function(){
        var a = $(this);

        var sql = "INSERT INTO mv_resource (id, title, cate, remark, ressrc, fromurl, catchtime) VALUES ";
        sql +="('"+ a.attr("href") +"', '"+ a.attr("title") +"', '新片精品', '描述', '下载地址', 'www.dy2018.com', '"+ dbdate +"')";
        dbc.insert(sql,null,function(err, res){
            if(err){
                console.log(err)
                return;
            }
            spider.start('www.dy2018.com',80,a.attr("href"),false,function(detaildoc,host,port,path){
                detailPage(path,detaildoc);
            });
        });
    });
}

function start(){
    spider.start('www.dy2018.com',80,'/html/gndy/dyzz/index.html',false,function(doc){
        if(doc){
            pickHtml(doc);
        }
    });
}

exports.start = start;
