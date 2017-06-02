'use strict';

// had enabled by egg
exports.static = true;
console.log("__dirname",__dirname);
const extendPath = __dirname.replace("config","app/extend/");
console.log("extend路径",extendPath);
// 开启校验插件
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

//开启nunjucks插件
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

//开启mongoose 自定义路径
exports.mongoose = {
  enable: true,
  //package: 'egg-mongoose',
  //path:"/Users/cly/Desktop/nodeProject/egg-mongoose-multiple",
  path:extendPath+"egg-mongoose-multiple"
};

//开启jwt插件
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

//开启跨域请求
exports.cors = {
  enable: true,
  package: 'egg-cors',
}
//vs code调试插件
exports.proxyworker = {
  enable: true,
  package: 'egg-development-proxyworker',
};