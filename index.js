'use strict';

// npm run dev DO NOT read this file
require('egg').startCluster({
  baseDir: __dirname,
  port: process.env.PORT || 8899, // default to 7001
});
