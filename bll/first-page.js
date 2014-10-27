var jsdom = require("jsdom");
var http = require("http");
var fs   = require("fs");

function catch2(cb){
    var html = "";

    http.get('http://www.qiushibaike.com',function(res){
        res.setEncoding("utf8");
        res.on('data',function(data){//图片加载到内存变量
            html += data;
        }).on('end',function(){//加载完毕保存图片
            console.log(html);
            cb && cb(html);
        });
    });
}

function catchCore(){
    jsdom.env(
        "http://www.qiushibaike.com/hot/",
        ["http://code.jquery.com/jquery.js"],
        function (errors, window) {
            if(errors){
                console.log(errors);
            }
            var $ = window.$;
            console.log($("body").html());
            console.log($("img").length);
            return;
            $("img").each(function(idx,obj){
                var src = obj.src;
                if(/pic.qiushibaike.com/.test(src)){

                   http.get(src, function(res) {
                        res.setEncoding('binary');//二进制（binary）
                        var imageData ='';
                        res.on('data',function(data){//图片加载到内存变量
                            imageData += data;
                        }).on('end',function(){//加载完毕保存图片
                            var imageName = src.substr(src.length-8,8);
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
    );
}

exports.first = catchCore;
/*
var dbc = require('../inc/mysql-client').init();

exports.queryContribute = function(callback){
    var sql = "SELECT * FROM joke_contribute WHERE 1 = 1 ORDER BY contribute_datetime DESC LIMIT 0 , 30"

    dbc.query(sql,null,function(err, res){
        if(err){
            console.log(err);
        }else{
            callback && callback(res);
        }
    });
};

exports.queryContributeMonthRanking = function(callback){
    var sql = "SELECT *  FROM joke_contribute where date_sub(now(), INTERVAL 30 DAY) <= contribute_datetime ORDER BY contribute_good DESC LIMIT 0,30"

    dbc.query(sql,null,function(err, res){
        if(err){
            console.log(err);
        }else{
            callback && callback(res);
        }
    });
};*/
