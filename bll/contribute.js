var dbc = require('../inc/mysql-client').init();

exports.saveContribute = function(strText){
    var sql = "insert into joke_contribute (id,contribute_text,contribute_datetime,contribute_userid)";
    sql += " values(2,'"+ strText+"','2013-1-1 1:1:1','1234')";
  dbc.insert(sql,null,function(err, res){
      console.log(err);
  });

};