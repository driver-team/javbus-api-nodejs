'use strict';
const fs = require('fs');
const path = require('path');

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1494295163932_6734';

  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/favicon.png')),
  };

  //配置模板插件默认属性
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  //配置的属性可以全局使用
  config.news = {
    pageSize: 30,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };
  //配置javabus站点属性
  config.javbus = {
    pageSize: 30,
  }

  //配置日志相关属性
  config.logger = {
    consoleLevel: 'DEBUG',
  };

  //配置mongoose数据库
  config.mongoose = {
    url: [{meizi:'mongodb://hammer1:*#06#@localhost:27017/meizi'},{javbus:'mongodb://hammer2:*#06#@localhost:27017/javbus'}],
    //url:"mongodb://localhost:27017/meizi",
    options: {},
  };
  
  //配置跨域白名单
  config.security = {
    domainWhiteList: [ 'http://localhost:8899' ],
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求,
      enable: false,
    },
  };

  //配置调试端口
  config.proxyworker = {
    port: 10086,
  };
  config.mailCode = {
    overTime:1800 //时间戳超时时间30分钟
  };

  //token的配置
  config.tokenTime = {
    refreshTime: 604800, // refreshToken超时时间7天 =  3600*24*7（s）
    accessTime:86400,//accessToken的超时时间1天
  };

  //jswt的配置
  config.jwt = {
    secret: '$#06#'
  };

  // 配置需要的中间件，数组顺序即为中间件的加载顺序
   config.middleware = ['accessLogger','tokenValidate'];

   //配置tokenValidate中间件的属性
   config.tokenValidate = {
     enable:true,//false为关闭
     //match:'/meizi',//匹配开启 math ignore不允许同时配置
     ignore:/(\/oauth*)|(\/user\/isRegistered)|(\/mail\/*)/, //不校验部分
   };

  return config;
};



