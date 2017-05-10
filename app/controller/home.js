'use strict';

module.exports = app => {
  class HomeController extends app.Controller {

    * index() {
      this.ctx.logger.debug("i am an warn");
      this.ctx.body = 'hi, egg';
    }
  }
  return HomeController;
};
