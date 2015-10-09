'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var nodeModulesDir = path.resolve(__dirname, 'node_modules');
var testDir = path.resolve(__dirname, 'test');

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      path.join(__dirname, 'src/main.js')
    ],
    vendors: ['react', 'cities']
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'js/[name]-[chunkhash].min.js',
    chunkFilename: '[name].[chunkhash].js',
    pathinfo: true
  },
  plugins: [

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
        screw_ie8: true
      }
    }),

    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),

    // Gather all vendor-related code inside vendors.min.js
    new webpack.optimize.CommonsChunkPlugin(
      'vendors',
      'js/vendors-[chunkhash].min.js'
    ),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': JSON.stringify(process.env.NODE_ENV)
    })
  ],

  module: {
    preLoaders: [{
      test: /\.scss?$/,
      loader: ExtractTextPlugin.extract('css!postcss!sass')
    }],

    loaders: [{
      test: /\.css?$/,
      loader: ExtractTextPlugin.extract('css!postcss!sass')
    }, {
      test: /\.js?$/,
      exclude: [nodeModulesDir, testDir],
      loader: 'babel'
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.(jpg|png|gif|svg)$/,
      loader: 'url?limit=10000!img'
    }]
  },
  node: {
    fs: "empty"
  }
};
