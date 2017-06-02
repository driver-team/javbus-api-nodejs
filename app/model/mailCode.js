/**
 * 邮件验证码
 * Created by cly on 2017/5/26.
 */


"use stricts";
var moment = require("moment");
module.exports = app =>{
  const mongoose = app.mongoose.javbus;
  const Schema = mongoose.Schema;
  //var connection = mongoose.createConnection("mongodb://localhost:27017/javbus");
  const codeSchema = Schema({
    code:{type: Number},
    email:{type:String},
    time:{type:String}, //时间
    timestamp:{type: Number} //时间戳
  });
  //return null;
  return mongoose.model("mailCode",codeSchema);
}