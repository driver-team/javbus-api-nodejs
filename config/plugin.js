'use strict';

// had enabled by egg
exports.static = true;


//开启nunjucks插件
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
};

//开启mongoose
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

//开启跨域请求
exports.cors = {
  enable: true,
  package: 'egg-cors',
}