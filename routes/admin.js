var router = require('express').Router();

router.get('/', function(req, res) {
    res.render("admin/index",{title:"管理首页"});
});
router.get('/iwell', function(req, res) {
    res.render("admin/iwell",{title:"AAA"});
});

module.exports = router;