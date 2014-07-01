/**
 * Created by Administrator on 2014/7/1.
 */
// mysql CRUD
var sqlclient = module.exports;

var _pool = null;

var DB = {};

/*
 * Innit sql connection pool
 * @param {Object} app The app for the server.
 */
DB.init = function(){
    if(!_pool)
        _pool = require('./mysql-pool').createMysqlPool();
};

/**
 * Excute sql statement
 * @param {String} sql Statement The sql need to excute.
 * @param {Object} args The args for the sql.
 * @param {fuction} callback Callback function.
 *
 */
DB.query = function(sql, args, callback){
    _pool.getConnection(function(err, client) {
        if (!!err) {
            console.error('[sqlqueryErr] '+err.stack);
            return;
        }
        client.query(sql, args, function(err, res) {
            _pool.releaseConnection(client);
            callback.apply(null, [err, res]);
        });
    });
};

/**
 * Close connection pool.
 */
DB.shutdown = function(){
    _pool.end();
};

/**
 * init database
 */
sqlclient.init = function() {
    if (!!_pool){
        return sqlclient;
    } else {
        DB.init();
        sqlclient.insert = DB.query;
        sqlclient.update = DB.query;
        //sqlclient.delete = DB.query;
        sqlclient.query = DB.query;
        return sqlclient;
    }
};

/**
 * shutdown database
 */
sqlclient.shutdown = function() {
    DB.shutdown();
};