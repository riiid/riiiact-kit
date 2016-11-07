const path = require('path');
const pkt = require('../package.json');
const BIN_PATH = path.join('node_modules', 'nightwatch', 'bin');
const OUTPUT_PATH = process.env.CIRCLE_ARTIFACTS ||
  path.join('node_modules', 'nightwatch', 'output', pkg.version);

var FILECOUNT = 0;

module.exports = {
  "src_folders": [
    "test/e2e"
  ],
  "output_folder": OUTPUT_PATH,
  "selenium": {
    "start_process": true,
    "server_path": "node_modules/nightwatch/bin/selenium.jar",
    "host": "127.0.0.1",
    "port": 4444,
    "cli_args": {
      "webdriver.chrome.driver": "node_modules/nightwatch/bin/chromedriver"
    }
  },
  "test_settings": {
    "default": {
      "launch_url": "http://localhost:3010",
      "globals": {
        "waitForConditionTimeout": 5000
      },
      "desiredCapabilities": {
        "browserName": "chrome"
      }
    },
    "chrome": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true
      }
    }
  }
};

require('fs').stat(path.join(BIN_PATH, 'selenium.jar'), function(err, stat) {
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BIN_PATH, function(error) {
      if (error) throw new Error(error);
      console.log('✔ Selenium & Chromedriver downloaded to:', BIN_PATH);
    });
  }
});

function padLeft(count) {
  return count < 10 ? '0' + count : count.toString();
}

function imgpath(browser, name) {
  const opt = browser.options.desiredCapabilities;
  const meta = [
    opt.platform,
    opt.browserName ? opt.browserName : 'any',
    opt.version ? opt.version : 'any',
    opt.name
  ].join('~').toLowerCase().replace(/ /g, '');
  return path.join(OUTPUT_PATH, `${meta}_${padLeft(FILECOUNT++)}_${name}`);
}

module.exports.imgpath = imgpath;
