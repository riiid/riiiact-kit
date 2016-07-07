const path = require('path');
const utils = require('./utils');
const rimraf = require('rimraf');

module.exports = () => {
  try {
    rimraf.sync(path.join(utils.root, '.git'));
    console.log('  deleting ./git');
  } catch(err) {
  }
};
