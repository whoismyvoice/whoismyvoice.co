#!/bin/bash
NODE_ENV=production rimraf dist && NODE_ENV=production webpack -p --config ./webpack.config.prod.js --progress --profile --colors
NODE_ENV=production node es6-prodServer