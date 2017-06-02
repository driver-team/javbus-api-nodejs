/**
 * Created by cly on 2017/5/27.
 */

'use strict';
module.exports = (options,app)=>{

  return function * logHttpInfo(next) {
    app.logger.info("======>收到请求host header",this.header.host);
    app.logger.info("======>收到请求body",this.body);
    yield next;
    app.logger.info("<======请求结束，返回body");
  }
};
