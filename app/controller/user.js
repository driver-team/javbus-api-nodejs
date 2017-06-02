/**
 * 用户信息
 * Created by cly on 2017/5/27.
 */

module.exports = app=>{


  class UserController extends app.Controller{


    async isRegistered(){

      const {email} = this.ctx.params;

      try{
        let result =  await this.ctx.service.user.isRegistered(email);
        this.success(result);
      }catch(e){
        //throw  e;
        this.ctx.logger.error(e);
        this.fail(e);
      }

    }

  }


  return UserController;
}