/**
 * Created by Administrator on 2014/7/1.
 */
var mysql        =  require('mysql');
var mysqlConfig = {
    "host":"localhost",
    "user":"root",
    "password":"",
    "database":"crh-mysql"
};

var env = process.env.NODE_ENV || 'development';
if(mysqlConfig[env]) {
    mysqlConfig = mysqlConfig[env];
}
exports.createMysqlPool= module.exports.createMysqlPool = function(){
    return mysql.createPool({
        host: mysqlConfig.host,
        user: mysqlConfig.user,
        password: mysqlConfig.password,
        database: mysqlConfig.database
    });
}