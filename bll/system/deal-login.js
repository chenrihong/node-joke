//
//  陈日红 @ 2015-1-5
//
//  处理登录事物


exports.doLogin = function(req){
    var obj = {flag:false,msg:""}
        ,username = req.body.account
        ,password = req.body.password;


    if(!username){
        obj.msg = "帐号不允许为空！";
        return obj;
    }
    if(!password){
        retobj.msg = "密码不允许为空！";
        return obj;
    }

    obj.flag = true;
    obj.msg  = "登录成功！"

    req.session.current_user_account = username;

    return obj;
};