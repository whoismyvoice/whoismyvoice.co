import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import Settings from './config/models/settings';
import defaultSettings from './config/defaultSettings';
import config from './config/config';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import serender from 'serender';

mongoose.connect(config.database);
mongoose.connection.on('open', function() {
  // ONLY FOR TESTING PURPOSESE - DROPS DATABASE AND INSTANTIATES NEW SETTINGS
  mongoose.connection.db.dropDatabase();
  const defSet = new Settings(defaultSettings);
  defSet.save(function(err, defSet) {
    if (err) return console.error(err);
    console.info('Added default settings');
  });
});

mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

const server = express();
const port = 8080;

server.use(bodyParser.json());
server.use(helmet());
server.use(express.static(__dirname + '/dist'));

server.get('/api/settings', function(req, res, next) {
  Settings.findOne({}, {}, {sort: {'created_at': -1}}, function(err, settings) {
    if (err) return next(err);
    console.info('Received request');
    res.send({settings: settings});
  });
});

server.post('/api/settings/edit', function(req, res, next) {
  const post = new Settings(req.body);
  console.info(post);
  post.save(function(err, post) {
    if (err) { return next(err);}
    res.status(201).json(post);
    console.info('Posted new settings successfully');
  });
});

server.set('port', process.env.PORT || 8080);

server.get('/', serender, function(req, res) {
  res.sendFile('index.html', {root: 'dist'});
});

server.get('/about', serender, function(req, res) {
  res.sendFile('index.html', {root: 'dist'});
});

server.get('/sources', serender, function(req, res) {
  res.sendFile('index.html', {root: 'dist'});
});

server.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
  console.info('🌎 🚀 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  console.info(__dirname);
});
