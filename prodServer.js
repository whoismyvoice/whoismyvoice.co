var path = require('path');
var express = require('express');
var helmet = require('helmet');
// import serender from 'serender';

var server = express();
var port = 8080;
server.use(helmet());

server.set('port', process.env.PORT || 8080);

server.use(express.static(__dirname + '/dist'));

// Server render config for serender
/*server.get('/', serender, function(req, res) {
  res.sendFile('index.html', {root: 'dist'});
});

server.get('/about', serender, function(req, res) {
  res.sendFile('index.html', {root: 'dist'});
});

server.get('/sources', serender, function(req, res) {
  res.sendFile('index.html', {root: 'dist'});
});*/

server.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

server.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
  console.info('🌎 🚀 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
