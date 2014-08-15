var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

    res.render("map/index",{title:"地图相关"});

});

module.exports = router;