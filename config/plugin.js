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