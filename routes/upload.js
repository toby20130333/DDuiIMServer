var http = require('http'),
    path = require('path'),
    os = require('os'),
    utility = require('utility'),
    fs = require('fs')
    url = require('url'),
    querystring = require('querystring'),
    inspect = require('util').inspect,
    busboymid = require('busboy');
    formidable = require('formidable');
var multiparty = require('multiparty');
var util = require('util');
var crypt = require('../utils/crypt.js');

var imagepath= path.join(__dirname, '../public/upload/'),
    fileurl= '../public/upload/'

var filePath="";
var curTime="";
exports.upload = function(req, res ,next) {
        var busboy = new busboymid({ headers: req.headers });
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            file.on('data', function(data) {
//                console.log("loading..........");
            });
            file.on('end', function() {
            });
            var curDate = new Date();
            curTime = crypt.md5(filename+curDate.toString());
            filePath = path.join(imagepath, curTime);
            console.log("loading...and saveTo......."+filePath);
            file.pipe(fs.createWriteStream(filePath));
        });
        busboy.on('finish', function() {
            console.log("finish..........");
            return next(curTime);
//            return res.send(JSON.stringify({message:'上传成功',code:100,data:{}}));

        });
        busboy.on('error',function(err){
            console.log("error "+err);
            return next(err);
//            return res.send(JSON.stringify({message:err,code:101,data:{}}));
        })
         req.pipe(busboy);
};