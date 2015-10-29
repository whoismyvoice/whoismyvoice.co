'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var nodeModulesDir = path.resolve(__dirname, 'node_modules');
var testDir = path.resolve(__dirname, 'test');

module.exports = {
  devtool: 'eval-source-map',

  devServer: {
    historyApiFallback: true
  },

  entry: [
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/dev-server',
    path.join(__dirname, 'src/main.js')
  ],

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/internal/senate-project/9-17/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),

    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': JSON.stringify(process.env.NODE_ENV)
    })
  ],

  module: {
    loaders: [{
      test: /\.css?$/,
      loader: 'style!css'
    }, {
      test: /\.scss?$/,
      loader: 'style!css!postcss!sass?sourceMap'
    }, {
      test: /\.js?$/,
      exclude: [nodeModulesDir, testDir],
      loader: 'babel'
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,
      loader: 'url?limit=30000!image-webpack'
    }]
  },

  node: {
    fs: "empty"
  },
  _hotPort: 4000
};
