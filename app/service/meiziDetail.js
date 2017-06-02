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
      const  ctx = this.ctx;
      try{

        var data = await ctx.model.MeiziDetail.find({index:id});
        // var data = await ctx.model.MeiziDetail.find({});
        // data.forEach(function (x) {
        //   //if(x.id == 5460){
        //     var index = Number.parseInt(x.id);
        //     ctx.model.MeiziDetail.update({"href":x.href},{"$set":{"index":index}})
        //       .then(result=>{
        //         console.log("success",result);
        //       })
        //       .catch(e=>console.log(e));
        //   //}
        // });
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

  return MeiziDetail;
}