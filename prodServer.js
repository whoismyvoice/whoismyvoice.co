import path from 'path';
import express from 'express';

const server = express();

server.use(express.static(__dirname + '/dist'))

server.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

server.listen(4000, 'localhost', function(err) {
  if (err) {
    console.log(err);
  }
  console.info("🌎 🚀 Listening on port %s. Open up http://localhost:%s/ in your browser.", 4000, 4000);
});
