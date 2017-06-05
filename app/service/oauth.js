/**
 * 用户的令牌
 * Created by cly on 2017/5/26.
 */

var moment = require("moment");
var crypto = require('crypto');
var uuidV1 = require("uuid/v1");

module.exports = app=>{

  class OauthService extends app.Service{

    /**
     * 校验令牌是否超时 true为超时
     * @returns {Promise.<void>}
     */
    async validate(){
      const {ctx } = this;
      //token生成规则 超时时间戳,userId,platform
      //使用AES对字符串加密解密
      //使用crypto的Cipher加密
      //使用crypto的Decipher解密
      /**
       * token校验
       * 1 解析token获得超时时间戳,userId platform
       * 2 根据platform+userId从session获得token 或者根据platform+userId从数据库获得token
       * 3 判断token是否相等，并判断时间戳是否超时
       */

      /**
      //加密测试
      let currTime = moment().format("X");
      let test = currTime+','+0+','+'android';
      ctx.logger.info("加密前数据",test);
      let cipher   = crypto.createCipher('aes-128-cbc',sshKey);
      let decStr  = cipher.update(test,'utf8','hex');
      decStr += cipher.final('hex');
      ctx.logger.info("加密后数据",decStr);

      const maxTime =  this.app.config.accessToken.maxTime;
      //解密Authorization
      let decipher = crypto.createDecipher('aes-128-cbc',sshKey);
      let fromToken = decipher.update(decStr,'hex','utf8');
      fromToken    += decipher.final('utf8');
      ctx.logger.info("解密后数据",fromToken);
      let fromArray  = fromToken.split(',');
      let fromUserId = fromArray[1];
      let fromPlatform   = fromArray[2];
       //从session或者数据库获得realToken

      let decodeBody = ctx.state.user;
      let {platform} = ctx.request.headers;
      if(platform !== decodeBody.platform)
        return true;
       **/
    }

    /**
     * 注册Service
     * @returns {Promise.<void>}
     */
    async register(){
      const {ctx} = this;
      const {email,password} = ctx.request.body;
      try {
        let check = await ctx.service.user.isRegistered(email);
        if(check.isRegistered)
          return {message:"用户已存在",isRegistered:true};
        let count = await ctx.model.User.find({}).count();
        let userId = count+1;
        let user = new ctx.model.User({
          email: email,
          password: password,
          userId:userId
        });
        //存储用户
        await user.save();
        //获得refreshToken
        let refreshToken = await ctx.service.oauth.refreshToken(userId);
        let accessToken = await  ctx.service.oauth.accessToken(userId);
        return {refreshToken:refreshToken,accessToken:accessToken,message:"注册成功"};
        //return {refreshToken:refreshToken,message:"登陆成功"};
      }catch (e){
        ctx.logger.error(e);
        throw e;
      }
    }

    async login(){
      const {ctx} = this;
      const {email,password} = ctx.request.body;
      try{
        let queryResult =   await ctx.model.User.findOne({email:email});
        //账号不存在
        if(!queryResult){
          return {status:204, message:"账号不存在"}
        }
        //账号存在
        queryResult = queryResult._doc;
        if(queryResult.password === password){
          let userId = queryResult.userId;
          //获得refreshToken
          let refreshToken = await ctx.service.oauth.refreshToken(userId);
          let accessToken  = await  ctx.service.oauth.accessToken(userId);
          return {refreshToken:refreshToken,accessToken:accessToken,message:"登陆成功"};
          //return {refreshToken:refreshToken,message:"登陆成功"};
        }
        else{
          return {status:204, message:"密码错误"}
        }
      }catch(e){
        throw e;
      }

    }

    /**
     * 生成refreshToken 用来获得accessToken的token
     * @returns {Promise.<void>}
     */
    async refreshToken(userId){
      const {ctx} = this;
      const maxTime =  this.app.config.tokenTime.refreshTime;
      //生成用户token并存储
      const {email}    = ctx.request.body;
      const {platform} = ctx.request.headers;
      let ip = ctx.ip;
      try{
        if(userId === undefined || undefined === null){
          let queryUser = await ctx.model.User.findOne({email:email}).select('userId').exec();
          userId = queryUser.userId;
        }
        let startTimestamp = moment().format('X');
        let expTimestamp   = Number.parseInt(moment().add(maxTime,'seconds').format("X"));
        let tokenObj = {
          email:email,
          userId:userId, //用户唯一id
          startTime:moment().format('YYYY-MM-DD HH:mm:ss'), //令牌生效时间
          startTimestamp:startTimestamp,//令牌生效时间戳
          expTime:moment().add(maxTime,'seconds').format('YYYY-MM-DD HH:mm:ss'), //令牌失效时间戳
          expTimestamp:expTimestamp, //令牌失效时间戳
          platform:platform,//设备类别 目前只包含ios android web mobileWeb
          ip:ip
        };
        //生成refreshToken
        let refreshToken = app.jwt.sign({sub:userId,exp:expTimestamp,data:{plt:platform,ip:ip}},app.config.jwt.secret);
        tokenObj.refreshToken = refreshToken;
        //判断是否存在token，不存在保存，存在更新
        let isExist = await ctx.model.Token.find({userId:userId,platform:platform}).exec();
        //更新
        if(isExist && isExist.length>0){
          await ctx.model.Token.where({userId:userId,platform:platform}).update(tokenObj).exec();
        }else{
          //保存
          let token = new ctx.model.Token(tokenObj);
          await token.save();
        }
        return refreshToken;
      }catch (e){
        throw  e;
      }
    }


    /**
     * 获得accessToken
     * @returns {Promise.<void>}
     */
    async accessToken(userId){
      const {ctx} = this;
      const {platform} = ctx.request.headers;
      const maxTime =  this.app.config.tokenTime.accessTime;
      let expTimestamp = Number.parseInt(moment().add(maxTime,'seconds').format("X"));
      let uuid = uuidV1();
      //uuid存入mongodb的session存储
      try{
        let userIdStr = userId.toString();
        //查询userId对应的session
        let result = await  ctx.model.MSession.findOne({key:userIdStr});
        result = result?result._doc:undefined;
          //session存在,更新
        if(result){
          await ctx.model.MSession.where({key:userIdStr}).update({[platform]:uuid}).exec();
        } else{
          //session不存在，保存
          let _mSession = new ctx.model.MSession({
            key:userIdStr,
            [platform]:uuid,
          });
          await _mSession.save();
        }
      }catch(e){
        ctx.logger.error(e.toString());
      }

      let accessToken  = app.jwt.sign({sub:userId,exp:expTimestamp,data:{plt:platform},jti:uuid},app.config.jwt.secret);
      return accessToken;
    }

    /**
     * 校验refreshToken
     * @returns {Promise.<void>}
     */
    async validateRefreshToken(){
      const {ctx} = this;
      const {platform} = ctx.request.headers;
      let clientRToken = ctx.state.user;
      //ctx.logger.info("clientRToken内容：",clientRToken);
      //console.log("platform",platform);
      if(!clientRToken)
        throw {status:401,message:"token超时，请重新登录"};
      let currTime = moment().format("X");
      if(currTime > clientRToken.exp)
        throw {status:401,message:"token超时，请重新登录"};
      if(clientRToken.data.plt !== platform)
        throw {status:401,message:"账号已经被登陆了"};
      let userId = clientRToken.sub.toString();

      try{
        let result = await ctx.model.Token.findOne({userId:userId});
        let queryToken = result?result._doc:undefined;
        if(!queryToken || queryToken.platform !== clientRToken.data.plt ||
            queryToken.expTimestamp !== clientRToken.exp){
           throw {status:401,message:"token超时，请重新登录"};
        }
      }catch(e){
        throw e;
      }
    }

    /**
     * 校验accessToken
     * @returns {Promise.<void>}
     */
    async validateAccessToken(){
      const {ctx} = this;
      const {platform} = ctx.request.headers;
      let clientAToken = ctx.state.user;
      //ctx.logger.info("clientAccessToken",clientAToken);
      let userId = clientAToken.sub.toString();
      try{
         //查询
        let result = await  ctx.model.MSession.findOne({key:userId});
        let querySession = result?result._doc:undefined;
        //console.log(querySession[platform] === clientAToken.jti);
        if(! querySession ||  querySession[platform] !== clientAToken.jti ){
           throw {status:401,message:"token超时，请重新登录2"};
        }
      }catch (e){
        throw e;
      }
    }


  }
  return OauthService;
}
