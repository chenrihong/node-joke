var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/welcome', function(req, res) {
    res.render("\\users\\welcome",{title:"......................",username:req.query.u});
    res.end();

    res.send('welcome');
});

module.exports = router;
