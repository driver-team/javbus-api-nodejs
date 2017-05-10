/**
 * Created by cly on 2017/5/9.
 */
'use strict';
module.exports = app => {
  class NewsService extends app.Service {
    async list(page = 1) {
       const  ctx = this.ctx;
      // read config
      const { serverUrl, pageSize } = this.app.config.news;
      // use build-in http client to GET hacker-news api
      const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
        data: {
          orderBy: '"$key"',
          startAt: `"${pageSize * (page - 1)}"`,
          endAt: `"${pageSize * page - 1}"`,
        },
        dataType: 'json',
      });
      // parallel GET detail, see `yield {}` from co
      const newsListPromise = await Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, { dataType: 'json' });
      });
      const newsList = await Promise.all(newsListPromise);

      return newsList.map(res => res.data);
    }
  }

  return NewsService;
};