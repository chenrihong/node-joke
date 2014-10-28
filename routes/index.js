var router =  require('express').Router();

router.get('/', function(req, res) {

    require("../bll/first-page").first();

    res.render("index",{title:"笑话集市"});
});

router.get('/browser_version_is_too_low',function(req,res){
    res.send("您的浏览器版本过低，请使用谷歌浏览器访问，下载地址：<a target='_blank' href='http://rj.baidu.com/soft/detail/14744.html?ald'>http://rj.baidu.com/soft/detail/14744.html?ald</a>");
});

router.get('/game/cleanmine', function(req, res) {
    var html = '<html><head><title>扫雷游戏</title></head><body>' +
        '<h6 style="margin: 10px"><a style="text-decoration: none;" target="_blank" href="http://runjs.cn/code/amrfihrt">源码分享在RUNJS.CN</a></h3>'+
        '<iframe style="width: 100%; height: 800px" src="http://sandbox.runjs.cn/show/amrfihrt" allowfullscreen="allowfullscreen" frameborder="0"></iframe></body></html>';

    res.send(html);
});

module.exports = router;