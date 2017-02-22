/**
 * Created by tobyyi on 14/12/25.
 */
/**
 * Created by tobyyi on 14/12/10.
 */
var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var chatSchema = new Schema({
    contents: { type: String },
    create_at: { type: Date, default: Date.now },
    content_is_html: { type: Boolean,default:false },
    friend_name:{type:String},
    to_name:{type:String},
    from:{type:String},
    color:{type:String,default:""},
    head_image:{type:String,default:"http://download.easyicon.net/png/1087086/72/"}
});

var Chats = mongoose.model('chat', chatSchema);

module.exports.Schema =function (modelName){
    return{model:mongoose.model(modelName)};
}