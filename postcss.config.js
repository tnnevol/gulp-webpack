// 主要用于css的兼容性处理，px转rem 配合 amfe-flexible 使用
// https://github.com/michael-ciniawsky/postcss-load-config
// postcss-px2rem 这个插件会报错，不兼容postcss插件 已替换成postcss-plugin-px2rem
// https://github.com/pigcan/postcss-plugin-px2rem

module.exports = ({ file, options, env }) => ({
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {}

    // ☠ 老夫已将封印，这个适用于移动端的适配 暂时不用，需要的直接解封
    /* 'postcss-plugin-px2rem': {
      rootValue: /\\mobile\\/i.test(file.dirname) ? 75 : 192,
      exclude: /(node_module)/,
      // 白名单 允许css属性转换成rem
      propWhiteList: [],
      // 黑名单 不允许css属性转换成rem
      propBlackList: ['font-size'],
      // 黑名单 类名禁止转换rem
      selectorBlackList: ['no2rem'],
      minPixelValue: 6
    } */
  }
});
