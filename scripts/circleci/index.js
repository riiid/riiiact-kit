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
    devServer: {
      port: 8080
    },
    firebase_auth: process.env.FIREBASE_AUTH || '',
    firebase_url: process.env.FIREBASE_URL || '',
    firebase_apikey: process.env.FIREBASE_APIKEY || ''
  }
}, null, 2));
