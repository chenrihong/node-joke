var mysql = require('mysql');
var fs = require('fs');

var connectionPool = null;

function getCon(callback) {
    connectionPool.getConnection(function (err, connection) {
        if (err) throw err;
        callback(connection);
    });
};

exports.createDatabase = function (config, callback) {
    var connection = mysql.createConnection({
        host: config.MySqlHost,
        port: config.MySqlPort,
        user: config.MySqlUser,
        password: config.MySqlPass,
        multipleStatements: true,
        debug: false
    });
    connection.query("CREATE DATABASE IF NOT EXISTS " + config.dbname, null, function (err) {
        connection.query("USE " + config.MySqlDatabase, null, function (err) {
            var schemas = fs.readFileSync('PowerTeam.database.schemas.sql').toString();
            connection.query(schemas, null, function (err) {
                connection.end();
                callback();
            });
        });
    });
};

exports.testConnection = function (config, callback) {
    var connection = mysql.createConnection({
        host: config.MySqlHost,
        port: config.MySqlPort,
        user: config.MySqlUser,
        password: config.MySqlPass,
        debug: false
    });
    connection.connect(callback);
}

exports.createConnectionPool = function (config) {
    connectionPool = mysql.createPool({
        host: config.MySqlHost,
        port: config.MySqlPort,
        user: config.MySqlUser,
        password: config.MySqlPass,
        database: config.MySqlDatabase,
        multipleStatements: true,
        debug: false
    });
};

exports.execSql = function (sql, params, callback) {
    getCon(function (con) {
        con.query(sql, params, callback);
        con.release();
    });
};