var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {

    res.render("index",{title:"简惠开发手册"});

});

module.exports = router;