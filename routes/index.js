var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '笑话集市' });
});
router.get('/month_ranking', function(req, res) {
    res.render('month_ranking', { title: '月排行' });
});
router.get('/cold_joke', function(req, res) {
    res.render('cold_joke', { title: '冷笑话' });
});
router.get('/contribute', function(req, res) {
    res.render('contribute', { title: '我要投稿' });
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
