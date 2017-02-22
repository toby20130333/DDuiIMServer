/**
 * Created by tobyyi on 14/12/10.
 */
"use strict";
var topicDBModel = require('../models/topics.js');
var crypt = require('../utils/crypt.js');
var validator = require('validator');
var mail = require('../common/mail');
var tools = require('../common/tools');
var utility = require('utility');
var config = require('../config');
var topics =new topicDBModel.Schema("topics").model;
var upload = require('./upload.js'),
    fs = require('fs'),
    url = require('url'),
    querystring = require('querystring');

//exports.addContents=function(req,res){
////        console.log("addContents.............."+req.body['friend_name']);
//    var pathname = url.parse(req.url).pathname;
//    var arument = url.parse(req.url).query;
//    var obj = querystring.parse(arument);
//    console.log("friend_name is "+obj.friend_name+"  contents"+obj.contents);
//       //保存文字后 执行上传图片操作
//        upload.upload(req,res,function(info){
//            console.log("info "+info);
//            var urlImg = "http://www.heilqt.com:8080/public/upload/"+info;
//            var topicsEntity = new topics();
//            topicsEntity.contents=obj.contents;
//            topicsEntity.friend_name=obj.friend_name;
//            topicsEntity.from=obj.from;
//            topicsEntity.head_image = obj.image;
//            topicsEntity.user_id = obj.userid;
//
////            var t = "{imgarr:"+urlImg+"}";
//            topicsEntity.picarr = urlImg;
//            topicsEntity.save(function (err,userInfo){
//                console.log("save.....xxxxxxxxxxx..topicsEntity.............. "+err);
//                return res.send(JSON.stringify(topicsEntity));
//            });
//        });
//};
exports.searchtopics = function(req,res){
    topics.
        find().
        sort( '-update_at' ).
        limit(10).
        exec( function ( err, topicinfo ){
            if( err ) return next( err );
            return res.send(JSON.stringify(topicinfo));
        });
};
//exports.update = function( req, res, next ){
//    topics.findById( req.params.id, function ( err, topicinfo ){
//        topicinfo.content    = req.body.content;
//        topicinfo.updated_at = Date.now();
//        topicinfo.save( function ( err, todo, count ){
//            if( err ) return next( err );
//            res.redirect( '/' );
//        });
//    });
//};

exports.addContents=function(req,res){
        console.log("addContents.............."+req.body['friend_name']);
        var topicsEntity = new topics();
        topicsEntity.contents=req.body['contents'];
        topicsEntity.friend_name=req.body['friend_name'];
        topicsEntity.from=req.body['from'];
        topicsEntity.head_image = req.body['image'];
        topicsEntity.user_id = req.body['userid'];
        topicsEntity.picarr = req.body['serverurl'];
        topicsEntity.save(function (err,userInfo){
            console.log("save.....xxxxxxxxxxx..topicsEntity.............. "+err);
            return res.send(JSON.stringify(topicsEntity));
        });
};
exports.addZan = function(req,res){
    var toppicId = req.body['topic_id'];
    topics.update({_id:toppicId},{$inc:{collect_count:1,update_at:new Date()}},function(err,updateinfo){
        if(err)
        {
            var result3 = '{"message":"赞失败","code":101,"data":{}}';
            return res.send(JSON.parse(result3));
        }else{
            var result4 = '{"message":"赞成功","code":100,"data":{}}';
            return res.send(JSON.parse(result4));
        }
    });

};
exports.addComment = function(req,res){
    var toppicId = req.body['topic_id'];
    topics.update({_id:toppicId},{$inc:{reply_count:1,update_at:new Date()}},function(err,updateinfo){
        if(err)
        {
            var result3 = '{"message":"评论失败","code":101,"data":{}}';
            return res.send(JSON.parse(result3));
        }else{
            var result4 = '{"message":"评论成功","code":100,"data":{}}';
            return res.send(JSON.parse(result4));
        }
    });

};