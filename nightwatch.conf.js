const seleniumServer = require('selenium-server');
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

module.exports = {
  src_folders: ['tests'],
  output_folder: 'reports',
  custom_commands_path: '',
  custom_assertions_path: '',
  page_objects_path: '',
  globals_path: '',
  output: false,

  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    log_path: '',
    port: process.env.WEB_DRIVER_PORT,
    cli_args: {
      'webdriver.chrome.driver': chromedriver.path,
      'webdriver.gecko.driver': geckodriver.path
    }
  },

  test_settings: {
    default: {
      launch_url: `http://localhost:${process.env.TEST_APP_PORT}`,
      selenium_port: process.env.WEB_DRIVER_PORT,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: false,
        path: ''
      },
      desiredCapabilities: {
        browserName: 'chrome'
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        marionette: true
      }
    }
  }
};
