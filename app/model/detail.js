/**
 * 无码 详情
 * Created by cly on 2017/5/11.
 */

"use stricts";
module.exports = app =>{
  const mongoose = app.mongoose.javbus;
  const Schema = mongoose.Schema;
  //var connection = mongoose.createConnection("mongodb://localhost:27017/javbus");
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
  //return null;
  return mongoose.model("detail",detailSchema);
}