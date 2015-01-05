var router = require('express').Router();

router.get('/', function(req, res) {
    res.render("signin/login",{title:"用户登录"});
});

router.post('/checklogin',function(req, res){

    var resultJson = require('../bll/system/deal-login').doLogin(req);
    res.send(resultJson);

});

module.exports = router;