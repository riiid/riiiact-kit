const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const pkg = require('../../package');

module.exports = result => {
  var _opt = result || {};
  var _pkg = Object.assign(pkg, {
    name: _opt.name,
    version: '0.0.1',
    description: _opt.description,
    devServer: {
      port: _opt.port
    },
    homepage: '',
    author: ''
  });
  var filepath = path.join(utils.root, 'package.json');
  fs.writeFileSync(filepath, JSON.stringify(_pkg, null, 2));
  console.log('  updating package.json');
};
