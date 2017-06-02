/**
 * 用户的令牌
 * Created by cly on 2017/5/26.
 */

"use stricts";
var moment = require("moment");
module.exports = app =>{
  const mongoose = app.mongoose.javbus;
  const Schema   = mongoose.Schema;

  const tokenSchema = Schema({
    refreshToken:{type: String},//用户token
    userId:{type:String}, //用户唯一id
    startTime:{type:String}, //令牌生效时间
    startTimestamp:{type:Number},//令牌生效时间戳
    expTime:{type:String}, //令牌失效时间戳
    expTimestamp:{type: Number}, //令牌失效时间戳
    platform:{type:String},//设备类别 目前只包含0ios 1android 2web 3mobileWeb
    uuid:{type:String},//访问设备的uuid
    ip:{type:String},// 访问设备的ip
    mac:{type:String},//访问设备的mac地址
  });
  //return null;
  return mongoose.model("token",tokenSchema);
}