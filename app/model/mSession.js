/**
 * 用做session存储
 * Created by cly on 2017/6/1.
 */
"use stricts";
module.exports = app =>{
  const mongoose = app.mongoose.javbus;
  const Schema   = mongoose.Schema;

  const  mSessionSchema = Schema({
    key:{type: String,unique:true,required:true,index:true},//session的id
    web:{type:String}
  });
  //return null;
  return mongoose.model("mSession",mSessionSchema);
}