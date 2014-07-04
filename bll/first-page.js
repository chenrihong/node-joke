var dbc = require('../inc/mysql-client').init();

exports.queryContribute = function(callback){
    var sql = "SELECT * FROM joke_contribute WHERE 1 = 1 ORDER BY contribute_datetime DESC LIMIT 0 , 300"

    dbc.query(sql,null,function(err, res){
        if(err){
            console.log(err);
        }else{
            callback && callback(res);
        }
    });
};