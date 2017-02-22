/**
 * Created by tobyyi on 14/12/10.
 */
var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var topicSchema = new Schema({
    title: { type: String },
    contents: { type: String },
    top: { type: Boolean, default: false }, // 置顶帖
    good: {type: Boolean, default: false}, // 精华帖
    reply_count: { type: Number, default: 0 },
    visit_count: { type: Number, default: 0 },
    collect_count: { type: Number, default: 0 },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    last_reply: { type: ObjectId,uppercase:true },
    last_reply_at: { type: Date, default: Date.now },
    content_is_html: { type: Boolean },
    friend_name:{type:String},
    from:{type:String},
    user_id:{type:String},
    picarr:{type:String},
    head_image:{type:String,default:"http://static.nduoa.com/apk/387/387519/icon_72.png"}
});
//topicSchema.index({author_id: 1}, {unique: true});
//访问users对象模型

var Topics = mongoose.model('topics', topicSchema);

module.exports.Schema =function (modelName){
    return{model:mongoose.model(modelName)};
}