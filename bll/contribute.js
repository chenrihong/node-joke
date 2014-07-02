var dbc = require('../inc/mysql-client').init();

exports.saveContribute = function(strText){

    var guid = require("guid").create();

    var sql = "insert into joke_contribute (id,contribute_text,contribute_datetime,contribute_user_id)";
    sql += " values('"+ guid +"','"+ strText+"',now(),'1234')";
  dbc.insert(sql,null,function(err, res){
      console.log(err);
  });

};