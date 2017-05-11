/**
 * 有码 api
 * Created by cly on 2017/5/11.
 */

module.exports = app=>{

  class DetailController extends app.Controller{

    async thumbList(){
      const ctx = this.ctx;
      //校验参数
      /**
      const createRule = {
        page: { type: 'number' },
      };

      try {
        ctx.validate(createRule);
      } catch (err) {
        ctx.logger.warn(err);
        this.fail(err);
        return;
      }
      **/
      //校验完成
      const page = ctx.params.page || 1;
      try{
        const data = await ctx.service.detail.thumbList(page);
        this.success(data)
      }catch (e){
        this.fail(e);
        return;
      }
    }

    async detail(){
      const ctx = this.ctx;
      if(!ctx.params.id){
        this.fail("id 属性 为空");
        return;
      }

      //校验完成
      const id = ctx.params.id;
      try{
        const data = await ctx.service.detail.detail(id);
        this.success(data)
      }catch (e){
        this.fail(e);
        return;
      }

    }


  }

  return DetailController;
};
