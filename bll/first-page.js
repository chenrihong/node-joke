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

exports.queryContributeMonthRanking = function(callback){
    var sql = "SELECT *  FROM joke_contribute where date_sub(now(), INTERVAL 30 DAY) <= contribute_datetime ORDER BY contribute_good DESC LIMIT 0,30"

    dbc.query(sql,null,function(err, res){
        if(err){
            console.log(err);
        }else{
            callback && callback(res);
        }
    });
};