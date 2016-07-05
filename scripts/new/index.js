#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

rimraf.sync(path.join(__dirname, '.git'));
fs.writeFileSync(path.join(__dirname, 'build', 'config.json'), JSON.stringify({
  production: {
    firebase_auth: '',
    firebase_url: '',
    firebase_apikey: ''
  },
  development: {
    firebase_auth: '',
    firebase_url: '',
    firebase_apikey: ''
  }
});
