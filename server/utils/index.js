const $http = require('axios');
const config = require('../../config');
console.log(`静态资源请求地址: http://${config.dev.host}:${config.dev.port}/`);

const getTemplate = filename => {
  return $http.get(`http://${config.dev.host}:${config.dev.port}${config.dev.assetsPublicPath}views/${filename}`) // 注意这个 'public' 公共资源前缀非常重要
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err;
    });
};

module.exports = {
  getTemplate
};
