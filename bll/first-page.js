var dbc = require('../inc/mysql-client').init();

exports.queryContribute = function(callback){
    var sql = "SELECT * FROM JOKE_CONTRIBUTE WHERE 1 = 1 LIMIT 0 , 30"

    dbc.query(sql,null,function(err, res){
        if(err){
            console.log(err);
        }else{
            callback && callback(res);
        }
    });
};