/**
 * Created by cly on 2017/5/15.
 */
"use stricts";
//var mongoose = require('mongoose');
module.exports  = app =>{
  const mongoose = app.mongoose.meizi;
  //var connection = mongoose.createConnection(app.config.mongoose.url2);
  const Schema = mongoose.Schema;
  const detailSchema = Schema({
    href:String,
    title:String,
    thumb:String,
    tag:Array,
    id:{type:String,unique:true,required:true,index:true},
    images:Array,
    date:String,
    index:{type:Number}
  });

  return mongoose.model("detail",detailSchema);
}