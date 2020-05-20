'use strict';

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const resolve = dir => {
  return path.join(__dirname, '..', dir);
};

/* const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  }); */
const _externals = () => {
  const manifest = require(resolve('package.json'));
  const dependencies = manifest.dependencies;
  const externals = {};
  const ignoreModule = ['@babel/polyfill', '@babel/runtime', '@babel/runtime-corejs2'];
  for (const mod of Object.keys(dependencies)) {
    if (ignoreModule.includes(mod)) continue;
    externals[mod] = `commonjs ${mod}`;
  }
  return externals;
};
console.log(_externals());
module.exports = {
  target: 'node',
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true, // 开启缓存
        parallel: true, // 支持多进程
        sourceMap: true
      })
    ]
  },
  node: {
    console: false,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true
  },
  entry: resolve('server/bin/www.js'),
  output: {
    path: resolve('dist'),
    filename: 'server/www.js'
  },
  externals: _externals(),
  // devtool: "sourcemap",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        enforce: 'pre',
        include: [resolve('server')],
        use: ['babel-loader']
      },
      { // img
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'static/img/[name].[hash:5].[ext]',
              limit: 1000
            }
          },
          {
            // 图片压缩工具
            loader: 'img-loader',
            options: {
              plugins: [
                require('imagemin-gifsicle')({
                  interlaced: false
                }),
                /* require('imagemin-mozjpeg')({
                  progressive: true,
                  arithmetic: false
                }), */
                require('imagemin-pngquant')({
                  floyd: 0.5,
                  speed: 2
                }),
                require('imagemin-svgo')({
                  plugins: [
                    { removeTitle: true },
                    { convertPathData: false }
                  ]
                })
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      WEBPACK_BUNDLE: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })
  ],

  mode: process.env.NODE_ENV
};
