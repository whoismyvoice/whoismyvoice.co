import webpack from 'webpack';
import config from './webpack.config.dev';
import WebpackDevServer from 'webpack-dev-server';

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  noInfo: true,
  stats: { colors: true }
}).listen(config._hotPort, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.info("🌎 🚀 Listening on port %s. Open up http://localhost:%s/ in your browser.", config._hotPort, config._hotPort);
});
