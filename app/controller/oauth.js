/**
 * 授权模块
 * Created by cly on 2017/5/26.
 */

/**
 * Created by cly on 2017/5/25.
 */

var moment = require("moment");

module.exports = app=>{

  class OauthController extends app.Controller{

    /**
     * 获得用户refreshToken
     * @returns {Promise.<void>}
     */
    async login(){
      const {ctx} = this;
      //校验规则
      const createRule = {
        email:   { type: 'email' },
        password:{type: 'string',max:16,min:6 }
      };
      try {
        ctx.validate(createRule,ctx.request.body);
      } catch (err) {
        ctx.logger.warn(err);
        this.fail({status:422,message:err.errors});
        return;
      }

      //校验完成
      try {
        let result = await ctx.service.oauth.login();
        this.success(result)
      }catch(e){
        this.fail(e.toString());
      }
    }




    /**
     * 用户注册
     * @returns {Promise.<void>}
     */
    async register(){
      const {ctx} = this;
      //校验规则
      const createRule = {
        email:   { type: 'email' },
        password:{type: 'string',max:16,min:6 }
      };
      try {
        ctx.validate(createRule,ctx.request.body);
      } catch (err) {
        ctx.logger.warn(err);
        this.fail({status:422,message:err.errors});
        return;
      }

      try {
        let result = await ctx.service.oauth.register();
        this.success(result)
      }catch(e){
        this.fail(e.toString());
      }
    }

    /**
     * 获得accessToken
     * @returns {Promise.<void>}
     */
    async accessToken(){
      const {ctx} = this;
      try{
        //校验refreshToken
        await ctx.service.oauth.validateRefreshToken();
        let userId = ctx.state.user.sub.toString();
        let result = await ctx.service.oauth.accessToken(userId);
        this.success({accessToken:result});
      }catch (e){
        ctx.logger.error(e.toString());
        this.fail(e);
      }
    }




  }

  return OauthController;
};
