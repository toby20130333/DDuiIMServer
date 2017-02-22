
/*
 * GET home page.
 */
var User = require('../models/user');

var crypt = require('../utils/crypt.js');
exports.index = function(req, res){
  res.render('index', { title: '对子应用' });
};

exports.login = function(req, res){
    console.log("用户登陆.................");
	res.render('login', { title: '用户登陆'});
};

//exports.doLogin=function(req,res){
//    var user = "{\"name\":\""+req.body['username']+"\",\"password\":\""+crypt.md5(req.body['password'])+"\"}";
//    var mdPassword=crypt.md5(req.body['password']);
//    var queryObj = {userName:req.body['username'],password:mdPassword};
//    console.log("user information "+queryObj);
//    User.findOne(queryObj,function(err,userInfo){
//        if(!err){
//            console.log("can get it........"+userInfo);
//            if(userInfo){
//                res.send('用户名或密码正确-------------------------------------------');
//            } else{
//                console.log('用户名或密码不正确--------------------------------------');
//                res.send('用户名或密码不正确------------------------------------------');
//            }
//
//        }else{
//            //console.log("Something happend.");
//        }
//    })
//};
exports.logout = function(req, res){
	req.session.user=null;
	res.redirect('/');
};

exports.home = function(req, res){
  	res.render('home', { title: 'Home'});
};