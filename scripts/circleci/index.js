const path = require('path');
const fs = require('fs');

const _path = path.join('build', 'config.json');
fs.writeFileSync(_path, JSON.stringify({
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
}, null, 2));
