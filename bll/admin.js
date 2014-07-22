/**
 * Created by Administrator on 2014/7/22.
 */


//var dbc = require('../inc/mysql-client').init();

var admin  = {};

/*
 {
   url:[ 'http://www.liaima.com/html/2012/jiaowangxiaohua_0112/', '.html' ],
   begin: '130',
   end: '200',
   selector: ''
  }
*/
admin.catchJokes = function(options,callback){

    var catchCore = function(site){

        var contribute = require("../bll/contribute");
        var jsdom = require("jsdom");
        jsdom.env(
            site,
            ["http://code.jquery.com/jquery.js"],
            function (errors, window) {
                if(!window){
                    // page 404
                    return;
                }
                if(!window.$){
                    return;
                }
                var content =  window.$(options.selector);
                if(content.length){
                    var txt = content.text();
                    txt = window.$.trim(txt);
                    txt = txt.replace(new RegExp("/\?", "gi"), "&nbsp;");
                    contribute.saveContribute(txt);
                }
                return;
            }
        );
    }
    var getWebContent = function(callback){
        for(var i = options.begin; i < options.end; i++){
            var site =  options.url[0] + i +  options.url[1];
            catchCore(site)
        }
        callback && callback(true,"已经提交后台抓取！因为 Node 非阻塞I/O 模型，所抓取数据可能要等一会才能看到");
    }

    getWebContent(callback)

}



module.exports = admin;