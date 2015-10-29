'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var nodeModulesDir = path.resolve(__dirname, 'node_modules');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      path.join(__dirname, 'src/main.js')
    ],
    vendors: ['react-dom', 'react', 'superagent', 'react-router', 'classnames', 'flux', 'history']
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'js/[name]-[chunkhash].min.js',
    chunkFilename: '[name].[chunkhash].js',
    pathinfo: true
  },
  plugins: [

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': JSON.stringify(process.env.NODE_ENV)
    }),

    new ChunkManifestPlugin({
      filename: "manifest.json",
      manifestVariable: "webpackManifest"
    }),

    new webpack.optimize.OccurenceOrderPlugin(),

    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),

    new ExtractTextPlugin('[name]-[chunkhash].min.css', {
      allChunks: true
    }),

    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true,
      }
    }),

    new StatsWriterPlugin({
      filename: "webpack.stats.json" // Default
    }),

    new webpack.optimize.CommonsChunkPlugin(
      'vendors',
      'js/vendors-[chunkhash].min.js'
    )],

  module: {
    preLoaders: [{
      test: /\.scss?$/,
      loader: ExtractTextPlugin.extract('css!postcss!sass')
    }],

    loaders: [{
      test: /\.css?$/,
      loader: ExtractTextPlugin.extract('css!postcss')
    }, {
      test: /\.js?$/,
      exclude: [nodeModulesDir],
      loader: 'babel'
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.(jpg|png|gif|svg)$/,
      loader: 'url?limit=10000!image-webpack'
    }]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],

  node: {
    fs: "empty"
  }
};
