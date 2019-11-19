module.exports = {
  proxy: {
    // server: http://gov.snkoudai.com
    '/freetekApi': {
      // test地址
      target: 'http://govtest.snkoudai.com',
      secure: false, // https 需要配置
      ws: true, // proxy websockets
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        '^/freetekApi': '/api' // 需要的rewrite
      }
    },
    // 腾讯
    '/tencent': {
      target: 'https://apis.map.qq.com',
      secure: true, // https 需要配置
      changeOrigin: true, // 是否跨域
      ws: true, // proxy websockets
      pathRewrite: {
        '^/tencent/ws': '/ws', // 需要的rewrite
        '^/tencent/tools': '/tools' // 需要的rewrite
      }
    },
    // 腾讯地图
    '/tencentMap': {
      target: 'https://map.qq.com',
      secure: true, // https 需要配置
      changeOrigin: true, // 是否跨域
      ws: true, // proxy websockets
      pathRewrite: {
        '^/tencentMap': '/api' // 需要的rewrite
      }
    },
    // 微信公众号
    '/cgi-bin': {
      target: 'https://api.weixin.qq.com',
      secure: true, // https 需要配置
      changeOrigin: true, // 是否跨域
      ws: true, // proxy websockets
      pathRewrite: {
        '^/cgi-bin': '/cgi-bin' // 需要的rewrite
      }
    },
    // 阿里云
    '/areas': {
      target: 'http://datavmap-public.oss-cn-hangzhou.aliyuncs.com',
      secure: true, // https 需要配置
      changeOrigin: true, // 是否跨域
      ws: true, // proxy websockets
      pathRewrite: {
        '^/areas': '/areas' // 需要的rewrite
      }
    }
  }
};
