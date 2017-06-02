/**
 * Created by cly on 2017/5/26.
 */

module.exports = app=>{

  class UserService extends app.Service{

    async isRegistered(email){
      //const {email} = this.ctx.params;
      try{
        let result =  await  this.ctx.model.User.find({email:email});
        if(result && result.length >0){
          return {isRegistered:true};
        }
        return {isRegistered:false};
      }catch(e){
        throw  e;
      }

    }

  }


  return UserService;
}
