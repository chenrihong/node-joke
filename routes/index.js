var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  require('../bll/first-page').queryContribute(function(data){
      res.render('index', { title: '笑话集市',jokes:data });
  });
});
router.get('/month_ranking', function(req, res) {
    res.render('month_ranking', { title: '月排行' });
});
router.get('/joke_gif', function(req, res) {
    res.render('joke_gif', { title: '搞笑动画' });
});
router.get('/contribute', function(req, res) {
    res.render('contribute', { title: '我要投稿' });
});

router.post('/index/savegoodbad',function(req,res){
    var contribute = require('../bll/contribute');
    var obj = req.body;//{ id: '6a39393e-a6e3-7999-e1c1-c098b892e1d2', what: 'good' }
    contribute.saveGoodBad(obj,function(isok){
        res.send({flag:isok});
    });

});

router.post('/contribute/save', function(req, res) {
   var content = req.body.contribute.content;

    var contribute = require('../bll/contribute');
    contribute.saveContribute(content);

    res.send("我们收到你的来稿啦：" + content);

});


router.get('/reg', function(req, res) {
    res.render('reg', { title: '用户注册' });
});

router.post('/reg-save', function(req, res) {
    var u  = req.body.user.uname;
    var p  = req.body.user.upass;
    res.redirect("/users/welcome?u="+u+"");
});

module.exports = router;
