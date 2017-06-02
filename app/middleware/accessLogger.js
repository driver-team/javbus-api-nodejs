/**
 * Created by cly on 2017/5/27.
 */

'use strict';
module.exports = (options,app)=>{

  return async function  logHttpInfo(ctx,next) {
    app.logger.info("======>收到请求 ip",ctx.ip);
    if(ctx.body){
      app.logger.info("======>收到请求body",ctx.body);
    }
    await next();
    app.logger.info("<======请求结束，返回body");
  }
};
