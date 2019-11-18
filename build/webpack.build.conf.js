'use strict';

process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const config = require('../config');
const webpackBaseConfig = require('./webpack.base.conf');
const utils = require('./utils');

module.exports = webpackMerge(webpackBaseConfig, {
  module: {

  },
  plugins: [
    // 抽出css
    new ExtractTextWebpackPlugin({
      filename: utils.assetsPath('css/[name].[hash:5].min.css'),
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV
    }),
    new OptimizeCss({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          minChunks: 1,
          chunks: 'all',
          priority: 100
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  devtool: config.build.devtool,
  mode: process.env.NODE_ENV
});
