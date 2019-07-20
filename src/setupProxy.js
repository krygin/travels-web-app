const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/sync/', { target: 'http://travels.dev.ktsstudio.ru', "changeOrigin": true }));
};