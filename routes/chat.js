/**
 * Created by Administrator on 2014/7/7.
 */


var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

    res.render("chat\\index",{title:"即时聊天"});
});

module.exports = router;