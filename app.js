/**
 * Created by cly on 2017/5/9.
 */
"use strict";
// app.js
module.exports = app => {
   //app.logger.debug('开始启动');
  // app.logger.info('启动耗时 %d ms', Date.now() - start);
  // app.logger.warn('warning!');
  //app.logger.error(someErrorObj);

  //测试启动之前的一些操作，不建议耗时操作
  app.beforeStart(function* () {
    // 应用会等待这个函数执行完成才启动
    // app.cities = yield app.curl('http://example.com/city.json', {
    //   method: 'GET',
    //   dataType: 'json',
    // });

    app.logger.debug('启动之前的操作 ');
  });


  //定义Controller的父类
  class CustomController extends app.Controller{
    /**
     * api成功，返回数据
     * @param data
     */
    success(data){
      let message = data.hasOwnProperty("message")?data.message:"";
      if(data.message){
        data.message = undefined;
        delete data.message;
      }
      this.ctx.body = {
        status:data.hasOwnProperty("status")?data.status:200,
        message:message,
        data,
      };
      this.ctx.status = 200;
      this.ctx.set("Access-Control-Allow-Origin","*");
      this.ctx.set("Access-Control-Allow-Credentials","true");
      this.ctx.set("Access-Control-Allow-Methods","*");
    }

    notFound(msg){
      msg = msg|| "not found";
      this.ctx.throw(404,msg);
    }

    fail(e){
      if(e.hasOwnProperty("status") && e.hasOwnProperty("message")){
        this.ctx.body = e
      }
      else{
        this.ctx.body = {status:500, message:e};
      }
      this.ctx.status = 200;
    }

  }
  app.Controller = CustomController;
};