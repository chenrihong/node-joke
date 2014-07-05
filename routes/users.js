var express = require('express');
var router = express.Router();
var jsdom = require("jsdom");
var contribute = require("../bll/contribute");


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});



function catchCore(site){

    jsdom.env(
        site,
        ["http://code.jquery.com/jquery.js"],
        function (errors, window) {
            if(!window.$){
                return;
            }
            var content =  window.$("#Article .content");
            if(content.length){
                var txt = content.text();
                contribute.saveContribute(txt);
            }
            return;
        }
    );
}

function getWebContent(callback){

    //http://www.liaima.com/html/2012/fuqixiaohua_0111/251.html
    var website = "http://www.liaima.com/html/2012/fuqixiaohua_0111/";

    for(var i=0;i<300;i++){
        var site = website + i.toString() + ".html";
        catchCore(site)
    }

    callback && callback();
}

router.get('/welcome', function(req, res) {
    getWebContent(function(){
        res.render("\\users\\welcome",{title:"抓取成功"});
    });

});

module.exports = router;
