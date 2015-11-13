import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import Settings from './models/settings';
import defaultSettings from './defaultSettings';
import config from './config';
import helmet from 'helmet';

mongoose.connect(config.database);

mongoose.connection.on('open', function() {

  // ONLY FOR TESTING PURPOSESE - DROPS DATABASE AND INSTANTIATES NEW SETTINGS
  mongoose.connection.db.dropDatabase();
  const defSet = new Settings(defaultSettings);
  defSet.save(function (err, defSet) {
    if(err) return console.error(err);
    console.info("Added default settings");
  });
});

mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

const server = express();
const port = 8080;

server.get('/api/settings', function(req, res, next) {
  Settings.find({}, function(err, settings) {
    if(err) return next(err);
    console.info("Received request");
    res.send({settings: settings});
  });
});

server.use(helmet());

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
