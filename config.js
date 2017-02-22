/**
 * config
 */

var path = require('path');

var debug = true;

var config = {
  // debug 为 true 时，用于本地调试
  debug: false,
  mini_assets: !debug, // 是否启用静态文件的合并压缩，详见视图中的Loader
  name: '多多指教：Qt/QML专业中文社区', // 社区名字
  description: '多多指教：Qt/QML专业中文社区', // 社区的描述
  keywords: 'qt, c++, qml, javascript, socket.io',
  site_logo: '/public/images/duo-logo-48.png', // default is `name`
  site_icon: '/public/images/duo-logo-128.png', // 默认没有 favicon, 这里填写网址
  // 右上角的导航区
  site_navs: [
    // 格式 [ path, title, [target=''] ]
    [ '/about', '关于' ]
  ],
  // cdn host，如 http://cnodejs.qiniudn.com
  site_static_host: '', // 静态文件存储域名
  // 社区的域名
  host: 'localhost',
  // 默认的Google tracker ID，自有站点请修改，申请地址：http://www.google.com/analytics/
  google_tracker_id: 'UA-4175xxxx-x',

  // mongodb 配置
  db: 'mongodb://127.0.0.1/qt_club_dev',
  db_name: 'qt_club_dev',


  session_secret: 'qt_club_secret', // 务必修改
  auth_cookie_name: 'qt_club',

  // 程序运行的端口
  port: 3000,

  // 话题列表显示的话题数量
  list_topic_count: 20,

  // 限制发帖时间间隔，单位：毫秒
  post_interval: 2000,

  // RSS配置
  rss: {
    title: '多多指教：Qt/QML专业中文社区',
    link: 'http://ddzhj.com',
    language: 'zh-cn',
    description: '多多指教：Qt/QML专业中文社区',
    //最多获取的RSS Item数量
    max_rss_items: 50
  },

  // 邮箱配置
  mail_opts: {
    host: 'smtp.126.com',
    port: 25,
//    secureConnection: true,
    auth: {
      user: 'yiyidaishui520@126.com',
      pass: 'Yitb121058520'
    }
  },  //weibo app key

  // admin 可删除话题，编辑标签，设某人为达人
  admins: { user_login_name: true },

  // github 登陆的配置
  GITHUB_OAUTH: {
    clientID: 'tb1210582007@126.com',
    clientSecret: 'Yitb121058520',
    callbackURL: 'https://github.com/toby20130333'
  },
  // 是否允许直接注册（否则只能走 github 的方式）
  allow_sign_up: true,

  // newrelic 是个用来监控网站性能的服务
  newrelic_key: 'qtclub',


  //文件上传配置
  qiqiu_acess:'AID6F9TpwRN32NmXOpULE93NYZPOPqlDtrQWQufP',
  qiqiu_scret:'QVhK3kA9e-9ntWlSoHwh1HryG4rH6IX3diVzj_6m',
  //注：如果填写 qn_access，则会上传到 7牛，以下配置无效
  upload: {
    path: path.join(__dirname, 'public/upload/'),
    url: '/public/upload/'
  },
    // Array with some colors
   colors: [
       '#9E9E9E',
       '#D74F37',
       '#4CAF50',
       '#009688',
       '#2C79C0',
       '#00BCD4',
       '#FFC107'
   ],
// Array with some colors
    headimg: [
        'http://qtclub.qiniudn.com/_dduiboy1.png',
        'http://qtclub.qiniudn.com/_dduiboy2.png',
        'http://qtclub.qiniudn.com/_dduiboy3.png',
        'http://qtclub.qiniudn.com/_dduiboy4.png',
        'http://qtclub.qiniudn.com/_dduiboy5.png'
    ],
    headimg2:[
        'http://qtclub.qiniudn.com/_dduigirl1.png',
        'http://qtclub.qiniudn.com/_dduigirl2.png',
        'http://qtclub.qiniudn.com/_dduigirl3.png',
        'http://qtclub.qiniudn.com/_dduigirl4.png',
        'http://qtclub.qiniudn.com/_dduigirl5.png'
    ],
    duibackgroud:['http://qtclub.qiniudn.com/_dduibaozhu240.png','http://qtclub.qiniudn.com/_dduihuadeng240.png','http://qtclub.qiniudn.com/_dduimeihua240.png'],


};
module.exports = config;
