'use strict';

process.env.NODE_ENV = 'development';
// console.log(process.env.NODE_ENV)
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const utils = require('./utils');
const config = require('../config');
const webpackBaseConfig = require('./webpack.base.conf');

module.exports = webpackMerge(webpackBaseConfig, {
  module: {

  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV
    }),
    // OccurrenceOrderPlugin is needed for webpack 1.x only
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    // new webpack.NoEmitOnErrorsPlugin(),
    // 抽出css
    new ExtractTextWebpackPlugin({
      filename: utils.assetsPath('css/[name].[hash:5].min.css'),
      allChunks: true
    })
  ],

  devtool: config.dev.devtool,

  mode: process.env.NODE_ENV
});
