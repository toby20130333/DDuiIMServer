
//var bcrypt = require('bcrypt');
var moment = require('moment');
moment.locale('zh-cn'); // 使用中文

// 格式化时间
exports.formatDate = function (date, friendly) {
  date = moment(date);

  if (friendly) {
    return date.fromNow();
  } else {
    return date.format('YYYY-MM-DD HH:mm');
  }

};

exports.validateId = function (str) {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};

//exports.bhash = function (str, callback) {
//  bcrypt.hash(str, 10, callback);
//};
//
//exports.bcompare = function (str, hash, callback) {
//  bcrypt.compare(str, hash, callback);
//};

/**
 * 从文本中提取出@username 标记的用户名数组
 * @param {String} text 文本内容
 * @return {Array} 用户名数组
 */

var fetchUsers = function(text){

        var ignore_regexs = [
            /```.+?```/, // 去除单行的 ```
            /^```[\s\S]+?^```/gm, // ``` 里面的是 pre 标签内容
            /`[\s\S]+?`/g, // 同一行中，`some code` 中内容也不该被解析
            /^    .*/gm, // 4个空格也是 pre 标签，在这里 . 不会匹配换行
            /\b.*?@[^\s]*?\..+?\b/g, // somebody@gmail.com 会被去除
            /\[@.+?\]\(\/.+?\)/g, // 已经被 link 的 username
        ];

        ignore_regexs.forEach(function(ignore_regex) {
            text = text.replace(ignore_regex, '');
        });

        var results = text.match(/@[a-z0-9\-_]+\b/igm);
        var names = [];
        if (results) {
            for (var i = 0, l = results.length; i < l; i++) {
                var s = results[i];
                //remove leading char @
                s = s.slice(1);
                names.push(s);
            }
        }
        return names;

};
exports.fetchUsers = fetchUsers;

exports.linkUsers  =function(text,callback){
    var users = fetchUsers(text);
    for (var i = 0, l = users.length; i < l; i++) {
        var name = users[i];
        text = text.replace(new RegExp('@' + name + '\\b', 'g'), '[@' + name + '](/user/' + name + ')');
    }
    return callback(null, text);
};
