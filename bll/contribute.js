var db = require('../inc/db');

exports.saveContribute = function(strText){
  db.execSql("INSERT INTO NODE_CONTRIBUTE(ID,CONTENT_TEXT) VALUES('1111','"+strText+"')");
};