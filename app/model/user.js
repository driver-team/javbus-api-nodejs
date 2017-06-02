/**
 * 用户信息
 * Created by cly on 2017/5/25.
 */

"use stricts";

module.exports = app =>{
  const mongoose = app.mongoose.javbus;
  const Schema   = mongoose.Schema;

  const userSchema = Schema({
    email:{type:String},
    phone:{type:String},
    password:{type:String},
    thumb:{type:String},
    userId:{type:Number,unique:true,required:true,index:true},
  });
  //return null;
  return mongoose.model("user",userSchema);
}