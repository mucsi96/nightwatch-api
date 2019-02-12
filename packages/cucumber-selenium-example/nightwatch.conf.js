const seleniumServer = require('selenium-server-standalone-jar');
const chromeDriver = require('chromedriver');
const geckoDriver = require('geckodriver');
const ieDriver = require('iedriver');
const edgeDriver = require('edgedriver');

module.exports = {
  custom_assertions_path: 'custom-assertions',
  test_settings: {
    default: {
      selenium: {
        start_process: true,
        server_path: seleniumServer.path,
        port: 4444,
        cli_args: {
          'webdriver.chrome.driver': chromeDriver.path,
          'webdriver.gecko.driver': geckoDriver.path,
          'webdriver.ie.driver': ieDriver.path,
          'webdriver.edge.driver': edgeDriver.path
        }
      }
    },
    chromeHeadless: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['headless', 'disable-gpu']
        }
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['disable-gpu']
        }
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
        marionette: true
      }
    },
    edge: {
      desiredCapabilities: {
        browserName: 'MicrosoftEdge',
        javascriptEnabled: true
      }
    },
    ie: {
      desiredCapabilities: {
        browserName: 'internet explorer',
        javascriptEnabled: true
      }
    }
  }
};
