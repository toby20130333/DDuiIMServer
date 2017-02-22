/**
 * Created by tobyyi on 14/12/31.
 */
/**
 * WebSocket server
 */
var chats = require("./chat.js");
var config = require('../config');


exports.ddweb = function(server,iport){
//加入Websocket模块
    var webSocketsServerPort = iport;

// 初始化websocket模块
    var webSocketServer = require('websocket').server;
// 保存聊天记录历史
    var history = [ ];
// 保存当前加入群聊的用户
    var clients = [ ];
//处理聊天内容的一些特殊字符
    function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

// 生成随机聊天背景颜色
    config.colors.sort(function(a,b) { return Math.random() > 0.5; } );
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    var connection = request.accept(null, request.origin);
    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;
    var userName = false;
    var userColor = false;
    var headimg = false;
    var userid = false;
    console.log((new Date()) + ' Connection accepted.');

    // send back chat history
    var iHistoryLen = history.length;
    //当用户登入服务器聊天室 即可推送未读历史记录 如果少于五条 全部推送，如果多余五条 取最近的五条记录
    if (iHistoryLen > 0) {

        if(iHistoryLen <= 3){
            connection.sendUTF(JSON.stringify( { type: 'history', data: history} ));
        }else{
            var historyarr=[];
            for(var ii = iHistoryLen-1;ii>iHistoryLen-3;ii--){
                historyarr.push(history[ii]);
            }
            connection.sendUTF(JSON.stringify( { type: 'history', data: historyarr} ));
        }

    }

    // 监听客户端消息
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            //如果是新用户加入进来
            if (userName === false) {
            // 如果用户是第一次登入 会分配用户信息
                // remember user name
                console.log("message from Qt Client "+message.utf8Data);
                var newUser = JSON.stringify(message.utf8Data);
                console.log("--------- "+newUser);
                if(typeof(message) !='object'){
                    return;
                }
                var arr = eval('('+message.utf8Data+')');
                userName = htmlEntities(arr.author);
                headimg =htmlEntities(arr.image);
                userid = htmlEntities(arr.userid);
                // get random color and send it back to the user
                userColor = htmlEntities(arr.color);

                // we want to keep history of all sent messages
                var obj2 = {
                    time: (new Date()).getTime(),
                    author: userName,
                    color: userColor,
                    image:headimg,
                    userid:userid
                };

                var loginObj = (JSON.stringify({ type:'color', data: obj2 }));
                console.log((new Date()) + ' User is known as: ' + userName
                    + ' with ' + userColor + ' color.');
                //用户登入向登入服务器所有的用户进行广播
                for (var i=0; i < clients.length; i++) {
                    clients[i].sendUTF(loginObj);
                }

            }
            else { // log and broadcast the message
                console.log((new Date()) + ' Received Message from '
                    + userName + ': ' + message.utf8Data);

                // we want to keep history of all sent messages
                var obj = {
                    time: (new Date()).getTime(),
                    text: htmlEntities(message.utf8Data),
                    author: userName,
                    color: userColor,
                    image:headimg,
                    userid:userid
                };
                history.push(obj);
                history = history.slice(-100);

                var msg = {
                    create_at: (new Date()).getTime(),
                    friend_name: userName,
                    color: userColor,
                    head_image:headimg,
                    contents:htmlEntities(message.utf8Data),
                    to_name:"all",
                    from:userid
                };
                //保存聊天记录
                chats.create(msg,function(err){
                    console.log("create err "+err);
                });
                // broadcast message to all connected clients
                var json = JSON.stringify({ type:'message', data: obj });
                for (var i=0; i < clients.length; i++) {
                    clients[i].sendUTF(json);
                }
            }
        }
    });
    // 监听用户登出信息 网络断开连接 或者用户登出
    connection.on('close', function(disconnection) {
        if (userName !== false && userColor !== false) {
            console.log((new Date()) + " Peer "
                + userName + " disconnected."+disconnection);
            // remove user from the list of connected clients
            clients.splice(index, 1);
            // push back user's color to be reused by another user
            config.colors.push(userColor);

            var obj1 = {
                time: (new Date()).getTime(),
                text: htmlEntities(""),
                author: userName,
                color: userColor,
                image:headimg
            };
            //通知在线用户 有人已经离线
            var otherconnect = JSON.stringify({ type:'offline', data: obj1 });
            for (var i=0; i < clients.length; i++) {
                clients[i].sendUTF(otherconnect);
            }
            console.log((new Date()) + "Emit close message: User: "
                + userName + " disconnected "+clients.length);
        }
    });

});



}