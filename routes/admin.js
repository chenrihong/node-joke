var router = require('express').Router();

router.get('/', function(req, res) {
    res.render("admin/index",{title:"管理首页"});
});
router.get('/iwell', function(req, res) {
    res.render("admin/iwell",{title:"AAA"});
});

router.post('/catchjokes', function(req, res) {
    var content = req.body;


    /*
     console.log(content);
    { catch:
        { url:
            [ 'http://www.liaima.com/html/2012/jiaowangxiaohua_0112/',
                '.html' ],
                begin: '130',
            end: '200',
            selector: '' }
    }*/
    var admin = require('../bll/admin');

    if(typeof req.body.catch != undefined){
       admin.catchJokes(req.body.catch,function(flag,message){
           res.send({flag:flag,msg:message});
       });
    }
    else{
        res.send({flag:false,msg:"非预期的表单"});
    }
});

module.exports = router;