var path = require('path');
var moduleDir = path.resolve(__dirname, '../node_modules');

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'tests.webpack.js', watched: false },
    ],
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      'tests.webpack.js': ['webpack'],
    },
    reporters: ['mocha', 'coverage'],
    singleRun: true,
    webpack: {
      devtool: 'inline source-map',
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel', exclude: moduleDir },
          { test: /\.json?$/, loader: 'json', exclude: moduleDir },
          { test: /\.scss?$/, loader: 'null' }
        ],
        postLoaders: [{
          test: /\.js$/,
          exclude: moduleDir,
          loader: 'istanbul-instrumenter'
        }]
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
    coverageReporter: {
      type: 'html', //produces a html document after code is run
      dir: 'coverage/' //path to created html doc
    }
  });
};
