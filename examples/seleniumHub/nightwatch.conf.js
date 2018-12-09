module.exports = {
  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: process.env.NODE_ENV === 'development' ? 'selenium-hub' : '127.0.0.1',
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
        nativeEvents: true,
        marionette: true
      }
    },
    selenium_server: {
      selenium: {
        start_process: process.env.NODE_ENV !== 'development',
        server_path:
          'node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.4.0.jar',
        log_path: '',
        host: '127.0.0.1',
        port: 4444,
        cli_args: {
          'webdriver.chrome.driver': 'node_modules/chromedriver/lib/chromedriver/chromedriver',
          'webdriver.gecko.driver': 'node_modules/geckodriver/geckodriver'
        }
      }
    }
  }
};
