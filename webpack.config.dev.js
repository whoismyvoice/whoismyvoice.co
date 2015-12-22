'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const modelDir = path.resolve(__dirname, 'models');
const distDir = path.resolve(__dirname, 'dist');

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
    publicPath: '/'
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
      'process.env.NODE_ENV': JSON.stringify('development')
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
      exclude: [nodeModulesDir, modelDir, distDir],
      loader: 'babel'
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,
      loader: 'file?name=img/[name]-[hash].[ext]'
    }]
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  _hotPort: 4000
};
