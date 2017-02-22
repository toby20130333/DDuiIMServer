// DB Connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ddui');
exports.mongoose = mongoose;
