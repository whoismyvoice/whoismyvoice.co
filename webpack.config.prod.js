const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const nodeModulesDir = path.join(__dirname, 'node_modules');
const autoprefixer = require('autoprefixer');

module.exports = {
  debug: false,
  devtool: 'source-map',
  entry: {
    app: [
      path.join(__dirname, 'src/main.js')
    ],
    vendors: ['react']
  },
  resolveLoader: {
    root: nodeModulesDir
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'js/[name]-[chunkhash].min.js',
    chunkFilename: '[name].[chunkhash].js',
    pathinfo: true,
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
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
      sourceMap: false,
      output: { comments: false },
      compress: {
        dead_code: true,
        unused: true,
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsWriterPlugin({
      filename: 'webpack.stats.json' // Default
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
      loader: 'file?name=img/[name]-[hash].[ext]'
      // loader: 'url?limit=38000!image-webpack'
    }]
  },
  postcss: [autoprefixer({browsers: ['last 2 versions']})],
  node: {
    fs: 'empty'
  }
};
