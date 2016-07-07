const path = require('path');
const fs = require('fs');
const utils = require('./utils');

module.exports = () => {
  fs.writeFileSync(path.join(utils.root, 'build', 'config.json'), JSON.stringify({
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
  console.log('  creating build/config.json');
};
