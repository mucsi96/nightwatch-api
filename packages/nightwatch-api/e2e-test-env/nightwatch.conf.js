const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');
const path = require('path');

module.exports = {
  silent: !process.env.NIGHTWATCH_VERBOSE,
  src_folders: ['.'],
  page_objects_path: path.resolve(__dirname, 'page-objects'),
  globals_path: path.resolve(__dirname, 'globals/globals.json'),
  test_settings: {
    default: {
      launch_url: 'http://localhost:3000',
      webdriver: {
        start_process: true,
        port: 4444
      },
      screenshots: {
        enabled: true,
        path: path.resolve(__dirname, 'e2e-test-screenshots')
      }
    },
    chromeHeadless: {
      webdriver: {
        server_path: chromedriver.path,
        cli_args: ['--port=4444']
      },
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: false,
          args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
        }
      }
    },
    chrome: {
      webdriver: {
        server_path: chromedriver.path,
        cli_args: ['--port=4444']
      },
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: false
        }
      }
    },
    firefox: {
      webdriver: {
        server_path: geckodriver.path,
        cli_args: ['--port', '4444', '--log', 'debug']
      },
      desiredCapabilities: {
        browserName: 'firefox',
        marionette: true
      }
    }
  }
};
