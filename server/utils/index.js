const $http = require('axios');
const config = require('../../config');
const proxy = require('http-proxy-middleware');
const isDev = process.env.NODE_ENV === 'development';
// console.log(`静态资源请求地址: http://${config.dev.host}:${config.dev.port}/`);

const getTemplate = filename => {
  return $http.get(`http://${config.dev.host}:${config.dev.port}${config[isDev ? 'dev' : 'build'].assetsPublicPath}views/${filename}`) // 注意这个 'public' 公共资源前缀非常重要
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err;
    });
};

const processProxy = app => {
  for (const [key, value] of Object.entries(config.dev.proxyTable)) {
    app.use(key, proxy(value));
  }
};

module.exports = {
  getTemplate,
  processProxy
};
