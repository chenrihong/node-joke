var express = require('express');
var session = require('express-session');

var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require("./config");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'CRH_NODE_JOKE',
    resave: false,
    saveUninitialized: true,
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: 30 * 60 * 1000 }//30min
}))

if(config.STOP_WEB){
    app.use(function(req, res, next){
        res.send(config.STOP_WEB_DESC);
    });
}

require("./bll/system/deal-route").doRoute(app);

require("./bll/system/deal-http-error").dealHttpError(app);

module.exports = app;
