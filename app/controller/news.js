/**
 * Created by cly on 2017/5/9.
 */

module.exports = app=>{
  class NewsController extends app.Controller{
    //加*表示这是一个generator协程
    async list(){
      const ctx = this.ctx;
      const { pageSize } = this.app.config.news;
      const page = ctx.query.page || 1;


      /** 测试service 以及模板渲染
      const newsList = await this.ctx.service.news.list(page);
      ctx.logger.info("远程获得newsList length",newsList.length);
     const dataList = {list: newsList, page, pageSize};
      await this.ctx.render('news/list.tpl', dataList);
      **/

      /** 测试restfullx
      ctx.body = ["1.","2"];
      ctx.status = 201;
       **/

      /**测试外部重定向
      this.ctx.redirect('https://www.baidu.com/');
       **/
      /**测试基类的方法**/
      this.success(["111","2222"]);
    }




  }

  return NewsController;
};
