
/**
 * Module dependencies.2015
 */
var config = require('./config');
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , movie = require('./routes/movie')
  , cities = require("./routes/cities")
  , topics = require("./routes/topics")
  , chats = require("./routes/chat")
  , upload = require("./routes/upload")
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs')
  , qiniu = require('qiniu')
  , fs = require('fs')
  , ddwebsocket = require('./routes/ddwebsocket.js')
  , dduisocketio = require('./routes/dduisocketio.js')
  , formidable = require('formidable')
  , busboy = require('busboy')
  , SessionStore = require("session-mongoose")(express);

//设置七牛的认证keys
qiniu.conf.ACCESS_KEY = config.qiqiu_acess;
qiniu.conf.SECRET_KEY = config.qiqiu_scret;

var imagepath= path.join(__dirname, '/public/upload/'),
    fileurl= '/public/upload/'

var store = new SessionStore({
    url: "mongodb://localhost/session",
    interval: 120000 // expiration check worker run interval in millisec (default: 60000)
});

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');// app.set('view engine', 'ejs');
app.use(express.favicon());//网页图标中间件
app.use(express.logger('dev'));//用户请求日志中间件
//app.use(express.bodyParser());//请求内容解析中间件
app.use(express.methodOverride());//Http伪造中间件

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(require('cookie-parser')(config.session_secret));//cookie解析中间件
app.use(express.session({
    secret : config.session_secret,
    store : store,
    resave : true,
    saveUninitialized : true,
    cookie: { maxAge: 100000 } // expire session in 15 min or 900 seconds
}));//会话管理中间件

// 静态文件目录
var staticDir = path.join(__dirname, 'public');
app.use('/public', express.static(staticDir));

app.use(function(req, res, next){
    //console.log("app.use res.local.user......."+req.session.user);
  res.locals.user = req.session.user;
  var err = req.session.error;
  delete req.session.error;
  res.locals.message = '';
  if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
  next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//basic
app.get('/', routes.index);

//app.all('/login', notAuthentication);
app.get('/login', routes.login);


app.get('/logout', authentication);
app.get('/logout', routes.logout);

app.get('/home', authentication);
app.get('/home', routes.home);


app.post('/register',user.register);
app.get('/register',user.getregister);
app.post('/login', user.onLogin);
app.post('/logins',user.onLogins);

app.get('/active_account',user.active_account);
app.get('/friendlist',user.friendlist);
app.post('/logout',user.onLogout);
//mongo
app.get('/movie/add',movie.movieAdd);
app.post('/movie/add',movie.doMovieAdd);
app.get('/movie/:name',movie.movieAdd);
app.get('/movie/json/:name',movie.movieJSON);

//city manager
app.post('/showcities',cities.showAllCity);
app.post('/cities',cities.addCities);
app.post('/findcity',cities.findCities);

app.get('/users', user.list);

//topics 2014-12-10
app.post('/addtopics',topics.addContents);
app.get('/searchtopics',topics.searchtopics);
//app.post('/upload',upload.upload);

//app.get('/topics/')
var server =http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//加入websocket模块 监听所有用户行为
//ddwebsocket.ddweb(server,app.get('port'));
dduisocketio.dsocketio(server,app.get('port'));

function authentication(req, res, next) {
  if (!req.session.user) {
    req.session.error='请先登陆';
    return res.redirect('/login');
  }
  next();
}

function notAuthentication(req, res, next) {
    console.log("用户登陆....notAuthentication.............");
	if (req.session.user) {
    	req.session.error='已登陆';
        var result4 = '{"message":"已经在其他设备登录","code":101,"data":{}}';
        return res.send(JSON.parse(result4));
  	}
  next();
}
module.exports = app;
