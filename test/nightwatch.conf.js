const path = require('path');
const pkg = require('../package.json');
const configs = require('../build/config');
const BIN_PATH = path.join('node_modules', 'nightwatch', 'bin');
const OUTPUT_PATH = process.env.CIRCLE_ARTIFACTS ?
  path.join(process.env.CIRCLE_ARTIFACTS, 'output') :
  path.join('node_modules', 'nightwatch', 'output', pkg.version);
var target = process.env['TARGET'] || 'development';
var config = configs[target];

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
      "launch_url": `http://localhost:${config.devServer.port}`,
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
