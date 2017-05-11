'use strict';

module.exports = app => {
  //app.get('/', 'home.index');
  app.redirect('/', '/page');
  //app.get("/news","news.list");
  app.get("/page/:page","detail.thumbList");
  app.get("/detail/:id","detail.detail");
};
