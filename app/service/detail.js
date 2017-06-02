/**
 * 无码的service
 * Created by cly on 2017/5/11.
 */
//{status:200,data:{total:333000,page:1,pageNum:30,data:[]}}

"use strict";
module.exports = app => {

  class DetailService extends app.Service {

    async thumbList(page = 1) {
      const  ctx = this.ctx;
      const { pageSize } = this.app.config.javbus;
      try{
        var start = pageSize * (page - 1);
        var count = await ctx.model.Detail.find({}).count();
        var detailList = await ctx.model.Detail
          .find({})
          .sort('-dateNumber') //按日期排序
          .skip(start)
          .limit(pageSize);
        var list = detailList.map(t=>{
          return {thumbUrl:t.thumb,title:t.title,id:t.id};
        });

        return {total:count,page:page,pageSize:pageSize,data:list};
      }
      catch(e){
        ctx.logger.error(e);
        return [];
      }
    }

    async detail(id){
      const  ctx = this.ctx;
      try{
        var data = await ctx.model.Detail.find({id:id});
        if(data)
          return data;
        else
          throw new Error("id 不存在");
      }
      catch(e){
        ctx.logger.error(e);
        return new Error(e);
      }
    }


  }

  return DetailService;
};