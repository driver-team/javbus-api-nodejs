'use strict';

module.exports = app => {
  //app.get('/', 'home.index');
  app.redirect('/', '/page');
  //app.get("/news","news.list");
  app.get("/page","detail.thumbList");
  app.get("/page/:page","detail.thumbList");
  app.get("/detail/:id","detail.detail");
  app.get("/meizi/page/:page","meiziDetail.thumbList");
  app.get("/meizi/detail/:id","meiziDetail.detail");
  app.get("/mail/sendCode/:toEmail","mail.sendCode");
  app.post("/mail/validateCode","mail.validateCode");

  //oauth 身份认证
  app.post("/oauth/register","oauth.register");
  app.post("/oauth/login","oauth.login");
  app.get( "/oauth/accessToken",app.jwt,"oauth.accessToken");


  app.get("/user/isRegistered/:email","user.isRegistered");
};
