/**
 * 邮件服务
 * Created by cly on 2017/5/25.
 */

"use strict";
const nodemailer = require("nodemailer");
var moment = require("moment");
const hostEmail = "laocuidezhang@sina.com";
const pass = "c77882507788";
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  //service:"gmail",
  host: "smtp.sina.com",
  secureConnection: true,
  //port:25,
  auth:{
    user:hostEmail,
    pass:pass
  }
});

module.exports = app => {

  class MailService extends app.Service {

    async sendCode(email) {
      const  ctx = this.ctx;
      //生成随机6位数
      let code = Math.floor(Math.random()*(999999-100000+1)+100000);
      let mailOptions = {
        from:hostEmail,
        to:email,
        subject: 'j网站的验证码', // Subject line
        //text: 'Hello world ?', // plain text body
        html: `<b>您的验证码是:【${code}】，有效期30分钟</b>` // html body
      }
      ctx.logger.info("[发送目标邮箱: %s]",email);

      try{
        //插入验证码到数据库
        let mailCode = new ctx.model.MailCode({
          code:code,
          email:email,
          time:moment().format('YYYY-MM-DD HH:mm:ss'),
          timestamp:moment().format("X")//时间戳
        });
        await mailCode.save();
        //发送验证码
        let result = await transporter.sendMail(mailOptions);
        ctx.logger.info("Send mail success",result);
        //ctx.logger.info('Message %s sent: %s', info.messageId, info.response);
        return {};
      }catch(e){
        ctx.logger.error(e);
        throw e;
      }
    }

    async validateCode({email,code}){
     // const  ctx = this.ctx;
      try{
        let currTime = moment().format("X");
        let selectTime = currTime - this.app.config.mailCode.overTime;
        //console.log('selectTime',selectTime);
        let result = await this.ctx.model.MailCode
          .find({email:email,code:code})
          .where("timestamp").gte(selectTime)
          .sort("-timestamp")
          .limit(1)
          .exec();
        //console.log(result);
        if(result && result.length>0){
          return {validate:1,message:"校验成功"}
        }
        else{
          return {validate:0,message:"校验失败，验证码错误"}
        }
      } catch(e){
        throw  e;
      }

    }

  }

  return MailService;
};