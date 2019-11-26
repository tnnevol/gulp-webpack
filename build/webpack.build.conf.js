'use strict';

// process.env.NODE_ENV = 'production';
// console.log(process.env.NODE_ENV)

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = require('../config');
const webpackBaseConfig = require('./webpack.base.conf');
const utils = require('./utils');

module.exports = webpackMerge(webpackBaseConfig, {
  module: {
  },
  plugins: [
    // 抽出css
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: utils.assetsPath('css/[name].[hash:5].css'), // devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: utils.assetsPath('css/[id].[hash:5].css') // devMode ? '[id].css' : '[id].[hash].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
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
    },
    minimizer: [
      new TerserPlugin({
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  },
  devtool: config.build.devtool,
  mode: process.env.NODE_ENV
});
