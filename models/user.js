/**
 * Created by Administrator on 14-11-28.
 */
var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    userName:{ type: String, unique: true },
    password:String,
    email:String,
    create_date: { type: Date, default: Date.now },
    nickname: { type: String},
    url: { type: String,default:"http://download.easyicon.net/png/1087086/72/"},
    profile_image_url: {type: String},
    location: { type: String },
    signature: { type: String },
    profession: { type: String },
    avatar: { type: String },
    is_block: {type: Boolean, default: false},
    score: { type: Number, default: 0 },
    topic_count: { type: Number, default: 0 },
    reply_count: { type: Number, default: 0 },
    follower_count: { type: Number, default: 0 },
    following_count: { type: Number, default: 0 },
    collect_tag_count: { type: Number, default: 0 },
    collect_topic_count: { type: Number, default: 0 },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    is_star: { type: Boolean },
    level: { type: String },
    active: { type: Boolean, default: false },
    receive_reply_mail: {type: Boolean, default: false },
    receive_at_mail: { type: Boolean, default: false },
    sex: { type: Number },
    retrieve_time: {type: Number},
    retrieve_key: {type: String},
    chat_color:{type:String,default:"#4CAF50"},
    online:{type:Boolean,default:false},
    initial:{type:String},
    pinyin:{type:String}
});
userSchema.index({userName: 1}, {unique: true});
//访问users对象模型

var User = mongoose.model('user', userSchema);
exports.getUserByLoginName = function (loginName, callback) {
    User.findOne({'userName': loginName}, callback);
};
module.exports.Schema =function (modelName){
    return{model:mongoose.model(modelName)};
}