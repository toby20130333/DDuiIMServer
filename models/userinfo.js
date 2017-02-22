/**
 * Created by Administrator on 14-11-25.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    name: String
    , password: String
    , email:String
//    pass: { type: String },
//    email: { type: String},
//    url: { type: String },
//    profile_image_url: {type: String},
//    location: { type: String },
//    signature: { type: String },
//    profile: { type: String },
//    avatar: { type: String },
//    is_block: {type: Boolean, default: false},
//    score: { type: Number, default: 0 },
//    topic_count: { type: Number, default: 0 },
//    reply_count: { type: Number, default: 0 },
//    follower_count: { type: Number, default: 0 },
//    following_count: { type: Number, default: 0 },
//    collect_tag_count: { type: Number, default: 0 },
//    collect_topic_count: { type: Number, default: 0 },
//    create_at: { type: Date, default: Date.now },
//    update_at: { type: Date, default: Date.now },
//    is_star: { type: Boolean },
//    level: { type: String },
//    active: { type: Boolean, default: false },
//    receive_reply_mail: {type: Boolean, default: false },
//    receive_at_mail: { type: Boolean, default: false },
//    from_wp: { type: Boolean },
//    retrieve_time: {type: Number},
//    retrieve_key: {type: String}
});

module.exports = mongoose.model('User', UserSchema);
//var mongodb = require('./mongodb');
//
//var Schema = mongodb.mongoose.Schema;
//
//var UserSchema = new Schema({
//    name: { type: String},
//    loginname: { type: String},
//    pass: { type: String },
//    email: { type: String},
//    url: { type: String },
//    profile_image_url: {type: String},
//    location: { type: String },
//    signature: { type: String },
//    profile: { type: String },
//    avatar: { type: String },
//    is_block: {type: Boolean, default: false},
//    score: { type: Number, default: 0 },
//    topic_count: { type: Number, default: 0 },
//    reply_count: { type: Number, default: 0 },
//    follower_count: { type: Number, default: 0 },
//    following_count: { type: Number, default: 0 },
//    collect_tag_count: { type: Number, default: 0 },
//    collect_topic_count: { type: Number, default: 0 },
//    create_at: { type: Date, default: Date.now },
//    update_at: { type: Date, default: Date.now },
//    is_star: { type: Boolean },
//    level: { type: String },
//    active: { type: Boolean, default: false },
//
//    receive_reply_mail: {type: Boolean, default: false },
//    receive_at_mail: { type: Boolean, default: false },
//    from_wp: { type: Boolean },
//
//    retrieve_time: {type: Number},
//    retrieve_key: {type: String}
//});
//
//module.exports = mongodb.mongoose.model("users", UserSchema);

//var UsersDAO = function(){};
//
//UsersDAO.prototype.save = function(obj, callback) {
//    var instance = new Users(obj);
//    instance.save(function(err){
//        callback(err);
//    });
//};
//
//UsersDAO.prototype.findByIdAndUpdate = function(obj,callback){
//    var _id=obj._id;
//    delete obj._id;
//    Users.findOneAndUpdate(_id, obj, function(err,obj){
//        callback(err, obj);
//    });
//}
//
//
//UsersDAO.prototype.findByName = function(name, callback) {
//    Users.findOne({name:name}, function(err, obj){
//        callback(err, obj);
//    });
//};
////访问todo对象模型
////mongoose.model('users', userSchema);
////module.exports.Schema =function (modelName){
////    return{model:mongoose.model(modelName)};
////}
//module.exports = new UsersDAO();