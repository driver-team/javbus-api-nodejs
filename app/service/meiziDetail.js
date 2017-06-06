/**
 * Created by cly on 2017/5/15.
 */
"use stricts";

module.exports = app => {
  class MeiziDetail extends app.Service{
    async thumbList(page = 1) {
      const  ctx = this.ctx;
      const { pageSize } = this.app.config.javbus;
      try{
        var start = pageSize * (page - 1);
        var count = await ctx.model.MeiziDetail.find({}).count();
        var detailList = await ctx.model.MeiziDetail
          .find({})
          .sort('-date')
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
      const ctx = this.ctx;
      try{
        var data = await ctx.model.MeiziDetail.findOne({id:id.toString()});
        console.log("data",data);
        if(data)
          return data._doc;
        else
          return {};
      }
      catch(e){
        ctx.logger.error(e);
        return new Error(e);
      }
    }

  }

  return MeiziDetail;
}