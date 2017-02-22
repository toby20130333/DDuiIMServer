/**
 * Created by tobyyi on 14/12/25.
 */
"use strict";
var chatDBModel = require('../models/chat.js');
var crypt = require('../utils/crypt.js');
var validator = require('validator');
var mail = require('../common/mail');
//var tools = require('../common/tools');
var utility = require('utility');
var config = require('../config');
var chats =new chatDBModel.Schema("chat").model;

exports.create = function (msg, next ){
    console.log("create msg "+msg);
    new chats({
        contents: msg.contents,
        friend_name    : msg.friend_name,
        create_at : Date.now(),
        to_name:msg.to_name,
        from:msg.from,
        color:msg.color,
        head_image:msg.head_image
    }).save( function ( err, chatdo, count ){
            if( err )
                return next( err );

        });
};

//exports.destroy = function ( req, res, next ){
//    Todo.findById( req.params.id, function ( err, todo ){
//        var user_id = req.cookies ?
//            req.cookies.user_id : undefined;
//
//        if( todo.user_id !== user_id ){
//            return utils.forbidden( res );
//        }
//
//        todo.remove( function ( err, todo ){
//            if( err ) return next( err );
//
//            res.redirect( '/' );
//        });
//    });
//};
//
//exports.edit = function( req, res, next ){
//    var user_id = req.cookies ?
//        req.cookies.user_id : undefined;
//
//    Todo.
//        find({ user_id : user_id }).
//        sort( '-updated_at' ).
//        exec( function ( err, todos ){
//            if( err ) return next( err );
//
//            res.render( 'edit', {
//                title   : 'Express Todo Example',
//                todos   : todos,
//                current : req.params.id
//            });
//        });
//};
//

//
//// ** express turns the cookie key to lowercase **
//exports.current_user = function ( req, res, next ){
//    var user_id = req.cookies ?
//        req.cookies.user_id : undefined;
//
//    if( !user_id ){
//        res.cookie( 'user_id', utils.uid( 32 ));
//    }
//
//    next();
//};