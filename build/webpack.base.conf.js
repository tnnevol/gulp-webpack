'use strict';

// 项目的整个入口在src目录下，请勿修改
// The entire entry of the project is in the src directory, please do not modify

// node_modules
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

// config variable(全局变量)
const config = require('../config');
const babelConf = require('../babel.config.js');
const isDev = process.env.NODE_ENV === 'development';
// 处理路径的正则 \\双反向斜杠浏览器会返回这样的路径
const pathREG = /[/|//|\\|\\\\]/g;

const resolve = dir => {
  return path.join(__dirname, '..', dir);
};

// webpack base setting
module.exports = {
  name: 'ejs',
  // 入口通过自调用函数会读取/src/js路径下的所有js文件
  entry: (filePathList => {
    const entry = {};
    filePathList.forEach(_path => {
      const splitPath = _path.split(pathREG);
      const fileName = splitPath.slice(-1)[0].split('.')[0];
      entry[fileName] = isDev ? [_path, 'webpack-hot-middleware/client?reload=true'] : _path;
    });
    return entry;
  })(glob.sync(resolve(`${config.entry}/js/*.js`))),
  // 输出js
  output: {
    path: config.build.assetsRoot, // 默认 dist
    publicPath: config[isDev ? 'dev' : 'build'].assetsPublicPath, // 默认 /
    filename: path.posix.join(config.build.assetsSubDirectory, 'js/[name].[hash:5].js'),
    chunkFilename: path.posix.join(config.build.assetsSubDirectory, 'js/[id].[chunkhash].js')
  },
  // 路径超级变量
  resolve: {
    alias: {
      '@': resolve(config.entry),
      _js: resolve(`${config.entry}/js`),
      _less: resolve(`${config.entry}/less`),
      _css: resolve(`${config.entry}/less`)
    }
  },
  module: {
    rules: [
      { // js
        test: /\.js$/,
        exclude: /(node_modules|bower_components|lib|libs)/,
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        use: ['babel-loader']
      },
      { // img
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:5].[ext]',
              limit: 1000,
              outputPath: 'static/img'
            }
          },
          {
            // 图片压缩工具
            loader: 'image-webpack-loader'
          }
        ]
      },
      { // font
        test: /\.(eot|woff2|woff|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/font'
            }
          }
        ]
      },
      { // html
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src']
            }
          }
        ]
      },
      { // ejs
        test: /\.ejs/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src']
            }
          },
          {
            loader: 'ejs-html-loader',
            options: {
              production: !isDev
            }
          }
        ]
      },
      { // less
        test: /\.less|\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-cssnext')()
                ]
              }
            },
            // 可能有朋友会有搭建响应式的需求，这块需要用到 postcss-px2rem 或者 px2rem-loader 之类的插件
            // 由于这类插件需要指定 remUnit 即设计图文件尺寸，我们可能需要分别打包 750px 和 1920px 的版本
            // 如何让 px2rem-loader 分别识别两种版本并进行分离打包呢？
            // 这边可以用到 loader 的另一种函数写法，其中 options.realResource 就是当前被处理文件的绝对路径
            // 这边可以用样式文件夹来区分，如果是 /pc/ 文件夹下的样式文件，就使用 1920px 版本，否则使用 750px
            /*
                        ({ realResource }) => {
                            return /\\pc\\/i.test(realResource) ? 'px2rem-loader?remUnit=192' : 'px2rem-loader?remUnit=75'
                        },
                        */
            'less-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    // 定义全局变量，定义后不再需要import或require
    new webpack.ProvidePlugin({

    }),

    // html 输出
    ...glob.sync(resolve(`${config.entry}/views/*.ejs`)).map((_path) => {
      const splitPath = _path.split(pathREG);
      // ejs ---> html文件 输出路径
      const fileName = (buildName => buildName.split('.')[0])(`${splitPath.slice(-2)[0]}/${splitPath.slice(-1)[0]}`);
      const chunkName = splitPath.slice(-1)[0].split('.')[0];
      const chunks = isDev ? [chunkName] : ['manifest', 'vendors', chunkName];
      return new HtmlWebpackPlugin({
        template: resolve(`${config.entry}/${fileName}.ejs`),
        filename: `${fileName}.ejs`, // resolve(),
        hash: true, // 为了更好的 cache，可以在文件名后加个 hash。
        cache: false,
        meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
        favicon: resolve('favicon.ico'),
        chunks
      });
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
};
