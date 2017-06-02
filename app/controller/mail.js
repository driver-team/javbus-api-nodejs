/**
 * Created by cly on 2017/5/25.
 */


module.exports = app=>{

  class MailController extends app.Controller{

    /**
     * 发送验证码
     * @returns {Promise.<void>}
     */
    async sendCode(){
      const ctx = this.ctx;
      //校验规则
      const createRule = {
        toEmail: { type: 'string' },
      };
      try {
        ctx.validate(createRule,ctx.params);
      } catch (err) {
        ctx.logger.warn(err);
        this.fail({status:422,message:"邮箱格式不正确"});
        //this.fail(err);
        return;
      }

      //校验完成
      const email = ctx.params.toEmail;
      try{
        const data = await ctx.service.mail.sendCode(email);
        this.success(data)
      }catch (e){
        this.fail(e);
      }
    }

    /**
     * 校验验证码
     * @returns {Promise.<void>}
     */
    async validateCode(){
      const {ctx} = this;
      ctx.logger.info('[debugger]', ctx.request.body);
      //校验规则
      const createRule = {
        email: { type: 'email' },
        code:  { type: 'number'}
      };
      try {
        ctx.validate(createRule); //默认是校验ctx.request.body
      } catch (err) {
        ctx.logger.warn(err.errors);
        this.fail({status:422,message:err.errors});
        return;
      }
      //post 参数 ctx.request.body;
      //校验完成
      const {email,code} = ctx.request.body;
      try{
        const data = await ctx.service.mail.validateCode({email,code});
        this.success(data)
      }catch (e){
        this.fail(e);
      }
    }



  }

  return MailController;
};
