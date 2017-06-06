/**
 * token校验中间件
 * Created by cly on 2017/5/27.
 */
'use strict';
var moment = require("moment");
module.exports = (options,app)=>{

  return async function tokenValidate(ctx,next) {
    //校验
    const createRule = {
      platform: ['android','ios','mobileWeb','web'],
    };
    try {
      ctx.validate(createRule,ctx.request.headers);
    } catch (err) {
      ctx.logger.warn(err);
      ctx.status = 200;
      ctx.body = {status:422,message:err.errors};
      return;
    }
    console.log("校验accessToken");


    try{
      //执行jwt解码
      await app.jwt(ctx,next);
      //检测超时
      let clientAToken = ctx.state.user;
      //console.log("clientAToken",clientAToken);
      let currTime = moment().format("X");
      if(currTime  > clientAToken.exp){
        ctx.status = 200;
        ctx.body = {status:401,message:"token已超时，请重新登录"};
        return;
      }
      //校验accessToken
      await ctx.service.oauth.validateAccessToken();
    } catch (e){
      ctx.status = 200;
      ctx.body = {status:401,message:"token已超时，请重新登录"};
      return;
    }

    await  next() ;
  }
};