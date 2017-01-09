const path = require('path');
const BIN_PATH = path.join('node_modules', 'nightwatch', 'bin');

require('fs').stat(path.join(BIN_PATH, 'selenium.jar'), function(err, stat) {
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BIN_PATH, function(error) {
      if (error) throw new Error(error);
      console.log('✔ Selenium & Chromedriver downloaded to:', BIN_PATH);
    });
  }
});

