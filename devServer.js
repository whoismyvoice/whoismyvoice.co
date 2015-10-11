import path from 'path';
import express from 'express';
import webpack from 'webpack';
import config from './webpack.config.dev';

const server = express();
const compiler = webpack(config);

server.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  contentBase: './src',
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
}));

server.use(require('webpack-hot-middleware')(compiler));

server.use(express.static(__dirname + '/src'));

server.listen(config._hotPort, 'localhost', function(err) {
  if (err) {
    console.log(err);
  }
  console.info("🌎 🚀 Listening on port %s. Open up http://localhost:%s/ in your browser.", config._hotPort, config._hotPort);
});
