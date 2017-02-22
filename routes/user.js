
/*
 * GET users listing.
 */
"use strict";
var userDBModel = require('../models/user.js');
var crypt = require('../utils/crypt.js');
var validator = require('validator');
var mail = require('../common/mail');
var tools = require('../common/tools');
var utility = require('utility');
var config = require('../config');
var pinyin = require('pinyin');

var user =new userDBModel.Schema("user").model;
exports.login = function (req, res, next) {
    res.render('login.html',{message:""});
};

function getRom(arr){
    var angelarray= arr;
    var n=Math.floor(Math.random()*angelarray.length+1)-1;
    return angelarray[n];
}

function isAllChinese(str)
{
    var reg=/^[\u4E00-\u9FA5]+$/;
    if(!reg.test(str)){
        console.log("不全是中文");
        return false;
    }
    console.log("全是中文");
    return true;
};
/*
 * 用户登录接口，根据用户名和密码进行校验
 */
exports.onLogin = function (req, res, next) {
    //console.log("req.body "+req.body);
    //判断req.body是否不为undefined
    if(req.body == 'undefined'){
        console.log("username is undefined");
        var errorStr = '{"message":"用户名或者密码错误","code":101,"data":{}}';
        return res.send(JSON.parse(errorStr));

    }else{

    var mdPassword=crypt.md5(req.body['password']);

    var queryObj = {userName:req.body['username'],password:mdPassword};

    //console.log("queryObj "+obj['username']);
    config.headimg.sort(function(a,b){return Math.random() > 0.5 ;});
    var code = 100;//100:success 101 :fail 102:argment 不合法 103：token过期
    user.findOne(queryObj,function(err,userInfo){
        if(err){
            var result4 = '{"message":"登陆失败","code":101,"data":{}}';
            return res.send(JSON.parse(result4));
        }else{
            if(userInfo){
                user.update({userName:req.body['username']},{$set:{online:true,update_at:new Date()}},function(err,updateinfo){
               if(err)
               {
                   var result3 = '{"message":"登陆失败","code":101,"data":{}}';
                   return res.send(JSON.parse(result2));
               }else{
                   if(updateinfo)
                   {
                       console.log("skajskajskaj...xxxxx.."+(userInfo).toJSON()['userName']);
                       var username = userInfo.toJSON()['userName'];
                       var nickname = userInfo.toJSON()['nickname'];
                       var chatcolor = userInfo.toJSON()['chat_color'];
                       var _id = userInfo.toJSON()['_id'];
                       var img = userInfo.toJSON()['url'];
                       var bg = config.duibackgroud[0];
                       var result = "{\"message\":\"登录成功\",\"code\":100,\"data\":{"+
                           "\"userName\":\""+username+"\",\"nickname\":\""+nickname+
                           "\",\"_id\":\""+_id+"\",\"img\":\""+img+"\",\"color\":\""+chatcolor+"\",\"bg\":\""+bg+"\"}}";
                       console.log("data is "+result);
                       //登录成功后修改session
                       req.session.user = req.body['username'];
                       return res.send(JSON.parse(result));
                   }else{
                       var result2 = '{"message":"用户名或者密码错误","code":101,"data":{}}';
                       return res.send(JSON.parse(result2));
                   }
               }
            })
            }else{
                var result5 = '{"message":"用户名或者密码错误","code":101,"data":{}}';
                return res.send(JSON.parse(result5));
            }
        }
    })
    }
    //console.log(req.body);
};
exports.onLogout = function(req,res,next){
    console.log("fuck "+req.session.user+" \n"+req.body['username']);
    req.session.user = null;
    user.update({userName:req.session.user},{$set:{online:false,update_at:new Date()}},function(err,updateinfo){
        if(err)
        {
            var result3 = '{"message":"登出失败","code":101,"data":{}}';
            return res.send(JSON.parse(result3));
        }else{
            var result4 = '{"message":"正常退出","code":100,"data":{}}';
            req.session.user = null;
            return res.send(JSON.parse(result4));
        }
    });

}
exports.userManager = function (req,res,next){

};

exports.list = function(req, res){
  res.send("respond with a resource");
};
/**
 * //如果是Post 请使用req.body['argument']来处理数据 参考 https://cnodejs.org/topic/50a333d7637ffa4155c62ddb
 * 用户注册接口,注册之前 检测是否已经注册
**/
exports.getUsersByQuery = function (query, opt, callback) {
    user.find(query, '', opt, callback);
};
//{'$or
exports.register=function(req,res){
    console.log("register..................... "+req.body['username']);
    user.find({'$or': [
        {'userName':req.body['username']},
        { 'email':req.body['email']}
    ]}, {}, function (err, users) {
        if (err) {
            return next(err);
        }
        if (users.length > 0) {
            var result = '{"message":"用户名或者邮箱已经注册","code":101,"data":{}}';
            return res.send(JSON.parse(result));
        }else{
//是新用户
            var username = validator.trim(req.body['username']).toLowerCase();
            var email = validator.trim(req.body['email']).toLowerCase();
            var pass = validator.trim(req.body['password']);
            var rePass = validator.trim(req.body['password']);

            // 验证信息的正确性
            if ([username, pass, rePass, email].some(function (item) { return item === ''; })) {
                var result = '{"message":"信息不完整","code":101,"data":{}}';
                return res.send(JSON.parse(result));
            }
            if (username.length < 5) {
                return res.send(JSON.parse('{"message":"用户名至少需要5个字符","code":101,"data":{}}'));
            }
            if (!tools.validateId(username)) {

                return res.send(JSON.parse('{"message":"用户名不合法","code":101,"data":{}}'));
            }
            if (!validator.isEmail(email)) {
                return res.send(JSON.parse('{"message":"邮箱不合法","code":101,"data":{}}'));
            }
            if (pass !== rePass) {
                return res.send(JSON.parse('{"message":"两次密码输入不一致","code":101,"data":{}}'));
            }
        var userEntity = new user();
        userEntity.userName=req.body['username'];
        userEntity.password=crypt.md5(req.body['password']);
        userEntity.email = req.body['email'];
        userEntity.nickname = req.body['nickname'];
        userEntity.sex = req.body['sex'];
        userEntity.profession = req.body['profession'];
        userEntity.location = req.body['location'];
            //判断字符串是否含有英文字符
        var isChina = isAllChinese(req.body['nickname']);
        var obj = pinyin(req.body['nickname'], {
            style: pinyin.STYLE_INITIALS, // 设置拼音风格
            heteronym: false
        });
            if(!isChina){
                var str = obj[0]+"";
                console.log("str is "+str);
                userEntity.initial = str.substring(0,1);
            }else{
                userEntity.initial = obj[0];
            }

        var obj1 = pinyin(req.body['nickname'],{
            style:pinyin.STYLE_NORMAL,
            heteronym:false
        });
        var string = "";
            for(var i=0;i<obj1.length;i++){
                string += obj1[i];
            }
        userEntity.pinyin = string;
            var img="";
            if(req.body['sex'] == 0){
                img = getRom(config.headimg);
                if(img === undefined){
                    img = config.headimg[0];
                }
            }else{
                img = getRom(config.headimg2);
                if(img === undefined){
                    img = config.headimg2[0];
                }
            }

        var mycolor = getRom(config.colors);
        if(mycolor === undefined){
           mycolor = config.colors[0];
        }
        userEntity.url = img;
        userEntity.chat_color = mycolor;
        userEntity.save(function (err,userInfo){
//        console.log("save..................... "+err);
        if(!err) {
            //console.log(userEntity);
            // 发送激活邮件
            var tokenstr = utility.md5(email + pass + config.session_secret);
            //mail.sendActiveMail(email,tokenstr , username);
            console.log("sendActiveMail "+username+" "+pass+" tokenstr is "+tokenstr);
            res.send(JSON.parse('{"message":"注册成功","code":100,"data":{}}'));
        }else{
            res.send(JSON.parse('{"message":"注册失败","code":101,"data":{}}'));
        }
    })}
    });
    //console.log(req.body);
};
//如果是Get,请使用query.argument来处理
exports.getregister = function(req,res){
    console.log(JSON.stringify(req.query.username));
    res.send('getfucker  username is: '+req.query.username+" And passwd: "+req.query.password+ " and he or she is: "+req.query.age +" old");
}

//账号激活
exports.active_account = function (req, res, next) {
    console.log("账号激活 "+req.query.key );
    var key = req.query.key;
    var name = req.query.name;
    user.find({'$or': [{userName:name}]}, {}, function (err, users){
        if (err) {
            console.log("error "+err.message );
            return next(err);
        }
        console.log("key "+key+"-------------------"+name);
        if(name =='undefined')
        {
            console.log("信息有误，帐号无法被激活")
            return res.render('notify/notify', {error: '信息有误，帐号无法被激活。'});
        }
        var passhash = user.password;
        console.log("passwd "+passhash+" "+user.username+" "+user.email);
        if (!user || utility.md5(user.email + passhash + config.session_secret) !== key) {
            console.log("信息有误，帐号无法被激活2")
            return res.redirect('/');
        }
        if (user.active) {
            console.log("帐号被激活");
            return res.redirect('/');
        }
        user.active = true;
        user.save(function (err) {
            if (err) {
                return next(err);
            };
            var msg = '帐号已被激活,请登录'
            console.log("帐号已被激活,请登录");
            return res.redirect('/home');
        });
    });
};
exports.update = function(msg, next ){
    console.log("update user color "+msg);
    user.find( {userName:msg.author}, function ( err, userinfo ){
        console.log("select user color "+userinfo);
        if( userinfo.userName === msg.author ){
            userinfo.is_block    = msg.color;
            userinfo.updated_at = Date.now();
            userinfo.save( function ( err, todo, count ){
            if( err ) return next( err );
        });
    }
    });
};
exports.friendlist = function(req,res,next){
    user.
        find().
        sort( 'nickname' ).
        exec( function ( err, lstcinfo ){
            if( err ) return next( err );
            return res.send(JSON.stringify(lstcinfo));
        });
};

/*
 * 用户登录接口，根据用户名和密码进行校验
 */
exports.onLogins = function (req, res, next) {
    console.log("req.body "+req.body);
    //先将req.body对象进行字符串化，再进行base64解码
        var string = JSON.stringify(req.body);
        console.log("string is"+string);
        var decodedstr = new Buffer(string, 'base64');
        console.log("get the decodestr "+decodedstr);
        // decodedstr = decodedstr.append('=');
        var obj = JSON.parse(decodedstr.toString());
        var mdPassword=crypt.md5(obj['password']);
        var queryObj = {userName:obj['username'],password:mdPassword};

    //console.log("queryObj "+obj['username']);
    config.headimg.sort(function(a,b){return Math.random() > 0.5 ;});
    var code = 100;//100:success 101 :fail 102:argment 不合法 103：token过期
    user.findOne(queryObj,function(err,userInfo){
        if(err){
            var result4 = '{"message":"登陆失败","code":101,"data":{}}';
            return res.send(JSON.parse(result4));
        }else{
            if(userInfo){
                user.update({userName:obj['username']},{$set:{online:true,update_at:new Date()}},function(err,updateinfo){
                    if(err)
                    {
                        var result3 = '{"message":"登陆失败","code":101,"data":{}}';
                        return res.send(JSON.parse(result2));
                    }else{
                        if(updateinfo)
                        {
                            console.log("skajskajskaj...xxxxx.."+(userInfo).toJSON()['userName']);
                            var username = userInfo.toJSON()['userName'];
                            var nickname = userInfo.toJSON()['nickname'];
                            var chatcolor = userInfo.toJSON()['chat_color'];
                            var _id = userInfo.toJSON()['_id'];
                            var img = userInfo.toJSON()['url'];
                            var bg = config.duibackgroud[0];
                            var result = "{\"message\":\"登录成功\",\"code\":100,\"data\":{"+
                                "\"userName\":\""+username+"\",\"nickname\":\""+nickname+
                                "\",\"_id\":\""+_id+"\",\"img\":\""+img+"\",\"color\":\""+chatcolor+"\",\"bg\":\""+bg+"\"}}";
                            console.log("data is "+result);
                            //登录成功后修改session
                            req.session.user = obj['username'];
                            return res.send(JSON.parse(result));
                        }else{
                            var result2 = '{"message":"用户名或者密码错误","code":101,"data":{}}';
                            return res.send(JSON.parse(result2));
                        }
                    }
                })
            }else{
                var result5 = '{"message":"用户名或者密码错误","code":101,"data":{}}';
                return res.send(JSON.parse(result5));
            }
        }
    })
    console.log(req.body);
};


/*
* 根据ID
* */
exports.getUserById = function(id,callback){
    user.findOne({_id:id},callback);
}
