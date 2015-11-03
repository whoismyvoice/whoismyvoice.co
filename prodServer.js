import path from 'path'
import express from 'express'

const server = express();
const port = 8080;

server.use(express.static(__dirname + '/dist'))

server.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

server.listen(port, function(err) {

  if (err) {
    console.log(err);
  }
  console.info("🌎 🚀 Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  console.info(__dirname);
});
