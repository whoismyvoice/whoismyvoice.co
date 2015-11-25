var path = require('path');
var styleDir = path.resolve(__dirname, 'src/styles');
var moduleDir = path.resolve(__dirname, 'node_modules');

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'tests.webpack.js', watched: false },
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'tests.webpack.js': ['webpack'],
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: {
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader', exclude: [styleDir, moduleDir] },
          { test: /\.json?$/, loader: 'json', exclude: [styleDir, moduleDir] },
          { test: /\.scss?$/, loader: 'null' }
        ],
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
  });
};
