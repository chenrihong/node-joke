var router = require('express').Router();

router.get('/', function(req, res) {
    res.render("signin/login",{title:"用户登录"});
});

router.post('/checklogin',function(req, res){
    res.send({flag:1,msg:"登录成功"});
});

module.exports = router;