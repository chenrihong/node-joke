var mysqlClient = require('./mysql-client').init();

var orgdao = module.exports;

orgdao.queryOrgByPId = function (pid, cb){
    var sql = 'YOUR SQL';
    var args = [pid];
    mysqlClient.query(sql,args,function(err, res){
        if(err !== null){
            utils.invokeCallback(cb, err.message, null);
        }
        else {
            if (!!res) {
                utils.invokeCallback(cb, null, res);
            }
            else{
                utils.invokeCallback(cb, null, null);
            }
        }
    });
};