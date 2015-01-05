//
//  陈日红 @ 2015-1-5
//
//  处理http错误

exports.dealHttpError = function(app){

    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // CODE 1
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // 本段代码将不会把服务错误发送给客户端
    // CODE1 则会
    // CODE1 代码执行，则本代码不会执行，因为已经调用了 res.render
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};





