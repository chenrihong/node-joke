var dbc = require('../inc/mysql-client').init();

exports.saveContribute = function(strText){

    var guid = require("guid").create();

    var sql = "insert into joke_contribute (id,contribute_text,contribute_datetime,contribute_user_id,contribute_good,contribute_bad)";
    sql += " values('"+ guid +"','"+ strText+"',now(),'1234',0,0)";
  dbc.insert(sql,null,function(err, res){
      console.log(err);
  });

};

exports.saveGoodBad = function(json,callback){
    if(typeof json === "object"){
        var id = json.id;
        var what = json.what;
        var sql = "";

        if(what === "good"){
            sql = "update joke_contribute set contribute_good = contribute_good + 1 where id = '"+ id +"'";
        }else if(what == "bad"){
            sql = "update joke_contribute set contribute_bad = contribute_bad + 1 where id = '"+ id +"'";
        }

        dbc.update(sql,null,function(err, res){
            if(err){
                console.log(err);
                callback && callback(false);
            }else{
                callback && callback(true)
            }

        });
    }

};