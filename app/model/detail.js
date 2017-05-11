/**
 * 无码 详情
 * Created by cly on 2017/5/11.
 */

module.exports = app=>{
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const detailSchema = Schema({
    href:String,
    title:String,
    thumb:String,
    tag:Array,
    id:{type:String,unique:true,required:true,index:true},
    date:String,
    series:String,
    cover:String,
    mvLength:String,
    mvProducers:String,
    mvPublisher:String,
    mvDirector:String,
    mvActors:Array,
    mvImageSmall:Array,
    mvImageBig:Array,
    mvMagnets:Array,
  });



  return mongoose.model("detail",detailSchema);

}