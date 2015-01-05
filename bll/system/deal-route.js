//
//  陈日红 @ 2015-1-5
//
//  处理所有路由  由 ./app.js 调用

function route(){
    return {
        index:[{
            title:"首页",url:"/"
        }],
        signin:[{
            title:"登录",url:"/signin"
        }],
        admin:[{
            title:"开发文档", url:"/admin"
        }]
    }
}

/*
 var routes = require('./routes/index');
 var chat = require("./routes/chat");
 var admin = require("./routes/admin")
 var map = require("./routes/map")
 app.use('/', routes);
 app.use('/chat', chat);
 app.use("/admin",admin);
 app.use("/map",map);

*/

exports.doRoute = function(app){

    var websitemap = route();
    for(var r in websitemap){

        var maps = websitemap[r] || [];
        for(var i in maps){
            var map = maps[i];
            app.use(map.url,require('../../routes/'+r));
        }
    }

}