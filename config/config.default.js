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
  //配置日志相关属性
  config.logger = {
    consoleLevel: 'DEBUG',
  };
  return config;
};



