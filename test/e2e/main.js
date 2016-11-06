var conf = require('../nightwatch.conf.js');

module.exports = {
  'riiiact-kit': function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('#app .row')
      .saveScreenshot(conf.imgpath(browser) + 'main.png')

    // show drawer
    browser
      .click('#app > div > div:nth-child(1) > button')
      .pause(1000)
      .assert.elementPresent('#app > div > div:nth-child(2) > div:nth-child(2)')
      .saveScreenshot(conf.imgpath(browser) + 'drawer.png')
      .click('#app > div > div:nth-child(2) > div:nth-child(1)');

    // show menu
    browser
      .click('#app > div > div:nth-child(1) > div > div > button')
      .pause(1000)
      .saveScreenshot(conf.imgpath(browser) + 'menu.png')
      .assert.elementPresent('body > div:nth-child(4) > div');

    // click 'menu 1'
    browser
      .click('body > div:nth-child(4) > div > div > div > div > div > div:nth-child(2) > span')
      .pause(1000)
      .assert.urlEquals(`${browser.launchUrl}/menu`)
      .assert.containsText('#app > div > div.container > div > div > div > div > div:nth-child(1) > span:nth-child(1)', 'Hello, Folks')
      .saveScreenshot(conf.imgpath(browser) + 'route_menu.png');

    // show menu
    browser
      .click('#app > div > div:nth-child(1) > div > div > button')
      .pause(1000)
      .assert.elementPresent('body > div:nth-child(4) > div');

    // click 'show snackbar'
    browser
      .click('body > div:nth-child(4) > div > div > div > div > div > div:nth-child(5) > span')
      .pause(1000)
      .assert.elementPresent('#app > div > div:nth-child(4)')
      .assert.elementNotPresent('body > div:nth-child(4) > div')
      .pause(1000)
      .saveScreenshot(conf.imgpath(browser) + 'snackbar.png');


    browser.end();
  }
};
