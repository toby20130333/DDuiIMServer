/**
 * Created by Administrator on 14-12-2.
 */
/**
 * Created by Administrator on 14-11-28.
 */
var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var citySchema = new Schema({
    city:{ type: String, unique: true },
    code:String,
    province:String,
    country: { type: String, default:'China' }
});
citySchema.index({city: 1}, {unique: true});
//访问users对象模型

var Cities = mongoose.model('cities', citySchema);

module.exports.Schema =function (modelName){
    return{model:mongoose.model(modelName)};
}