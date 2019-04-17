import {
  deleteRunner,
  startWebDriver,
  stopWebDriver,
  createSession,
  closeSession,
  runQueue
} from './client';
import { CliRunner } from 'nightwatch';
import { EventEmitter } from 'events';
import { createFailureScreenshot } from './screenshots';
import fs from 'fs';

let mockCliRunnerInstance = null;
let mockTestError = null;
let mockScreenshotsPath = null;
let mockExecutedActions = [];
let mockQueueItems = [];

class MockQueue extends EventEmitter {
  reset = jest.fn(function() {
    mockQueueItems = [];
    return this;
  });
  empty = jest.fn().mockReturnValue(this);
  run = jest.fn(() => {
    mockQueueItems.push('mockItem');
    this.emit('queue:finished', mockTestError);
  });
}

jest.mock('nightwatch', () => ({
  client: jest.fn(() => ({
    startSession: jest.fn(),
    queue: new MockQueue(),
    api: {
      screenshotsPath: mockScreenshotsPath
    }
  })),
  CliRunner: jest.fn(() => {
    mockCliRunnerInstance = {
      test_settings: {
        webdriver: {
          port: 1279
        }
      },
      startWebDriver: jest.fn(),
      stopWebDriver: jest.fn(),
      setup: jest.fn()
    };

    return mockCliRunnerInstance;
  })
}));
jest.mock(
  'nightwatch/lib/api/protocol',
  () =>
    class MockProtocol {
      Actions = {
        session: jest.fn((action, cb) => mockExecutedActions.push(action) && cb())
      };

      static SessionActions = {
        DELETE: 'DELETE_SESSION'
      };
    }
);
jest.mock('./screenshots');
jest.mock('fs');

beforeEach(() => {
  deleteRunner();
  mockCliRunnerInstance = null;
  mockTestError = null;
  mockScreenshotsPath = null;
  createFailureScreenshot.mockClear();
  fs.existsSync.mockReset();
  CliRunner.mockClear();
  mockExecutedActions = [];
  mockQueueItems = [];
});

describe('client', () => {
  describe('startWebDriver', () => {
    it('starts the webdriver', async () => {
      await startWebDriver({ env: 'default', configFile: 'testConfigFile.js' });
      expect(CliRunner).toBeCalledWith({ env: 'default', config: 'testConfigFile.js' });
      expect(mockCliRunnerInstance.setup).toBeCalled();
      expect(mockCliRunnerInstance.startWebDriver).toBeCalled();
    });

    it('creates a new cli runner on every call', async () => {
      await startWebDriver({ env: 'default', configFile: 'testConfigFile.js' });
      mockCliRunnerInstance.setup.mockClear();
      await startWebDriver({ env: 'default', configFile: 'testConfigFile.js' });
      expect(mockCliRunnerInstance.setup).toBeCalled();
    });

    it('starts the webdriver with "default" env and ./nightwatch.json as config if exist', async () => {
      fs.existsSync.mockImplementation(path => path === './nightwatch.json');
      await startWebDriver();
      expect(CliRunner).toBeCalledWith({ env: 'default', config: './nightwatch.json' });
    });

    it('starts the webdriver with "default" env and ./nightwatch.conf.js as config if exist', async () => {
      fs.existsSync.mockImplementation(path => path === './nightwatch.conf.js');
      await startWebDriver();
      expect(CliRunner).toBeCalledWith({ env: 'default', config: './nightwatch.conf.js' });
    });

    it('shrows error if not configuration file is found', async () => {
      fs.existsSync.mockReturnValue(false);
      let message;
      try {
        await startWebDriver();
      } catch (error) {
        message = error.message;
      }
      expect(message).toMatch(
        'No configuration file was found for Nightwatch in the current process folder. (nightwatch.json or nightwatch.conf.js).'
      );
    });

    it('overrides isWebDriverManaged function of Nightwatch runner', async () => {
      fs.existsSync.mockReturnValue(true);
      await startWebDriver();
      mockCliRunnerInstance.baseSettings = {};
      expect(mockCliRunnerInstance.isWebDriverManaged()).toBe(true);
    });

    it('overrides isWebDriverManaged function which changes the baseSettings on Nightwatch', async () => {
      fs.existsSync.mockReturnValue(true);
      await startWebDriver();
      mockCliRunnerInstance.baseSettings = {
        selenium: {
          start_process: false
        }
      };
      mockCliRunnerInstance.isWebDriverManaged();
      expect(mockCliRunnerInstance.baseSettings.selenium.start_process).toBe(true);
    });
  });

  describe('stopWebDriver', () => {
    it('calls stopWebDriver on cli runner', async () => {
      fs.existsSync.mockReturnValue(true);
      await startWebDriver();
      await stopWebDriver();
      expect(mockCliRunnerInstance.stopWebDriver).toBeCalled();
    });

    it('doesn`t call stopWebDriver if runner doens`t exist', async () => {
      await stopWebDriver();
      expect(mockCliRunnerInstance).toBe(null);
    });
  });

  describe('createSession', () => {
    it('caches the cli runner instance', async () => {
      await startWebDriver({ env: 'default', configFile: 'testConfigFile.js' });
      mockCliRunnerInstance.setup.mockClear();
      await createSession();
      expect(mockCliRunnerInstance.setup).not.toBeCalled();
    });

    it('creates a new cli runner if options are provided', async () => {
      await startWebDriver({ env: 'default', configFile: 'testConfigFile.js' });
      mockCliRunnerInstance.setup.mockClear();
      await createSession({ env: 'default', configFile: 'testConfigFile.js' });
      expect(mockCliRunnerInstance.setup).toBeCalled();
    });
  });

  describe('closeSession', () => {
    it('execute a DELETE_SESSION action using Nightwatch protocol', async () => {
      fs.existsSync.mockReturnValue(true);
      await createSession();
      await closeSession();
      expect(mockExecutedActions).toEqual(['DELETE_SESSION']);
    });

    it('doesn`t execute any action if session doesn`t exist', async () => {
      await closeSession();
      expect(mockExecutedActions).toEqual([]);
    });
  });

  describe('runQueue', () => {
    it('throws error if called without creating session', async () => {
      let message;
      try {
        await runQueue();
      } catch (error) {
        message = error.message;
      }
      expect(message).toMatch('Nightwatch client is not ready.');
    });

    async function runTests() {
      await startWebDriver({ env: 'default', configFile: 'testConfigFile.js' });
      await createSession();
      await runQueue();
    }

    it('throws error on test failure', async () => {
      mockTestError = new Error('test error');
      mockTestError.stack = 'test stack';

      let message;
      let stack;
      try {
        await runTests();
      } catch (error) {
        message = error.message;
        stack = error.stack;
      }
      expect(message).toMatch('test error');
      expect(stack).toMatch('test stack');
    });

    it('not throws on test success', async () => {
      let message;
      try {
        await runTests();
      } catch (error) {
        message = error.message;
      }
      expect(message).not.toBeDefined();
    });

    it('resets queue after execution', async () => {
      mockTestError = new Error('test error');

      fs.existsSync.mockReturnValue(true);
      await createSession();
      try {
        await runTests();
      } catch (error) {}
      expect(mockQueueItems).toEqual([]);
    });

    it('creates screenshot on test failure if set', async () => {
      mockScreenshotsPath = '/testScreenshotPath';
      mockTestError = new Error('test error');
      try {
        await runTests();
      } catch (error) {}
      expect(createFailureScreenshot).toBeCalled();
    });

    it('doesn`t create screenshot on test failure if not set', async () => {
      mockTestError = new Error('test error');
      try {
        await runTests();
      } catch (error) {}
      expect(createFailureScreenshot).not.toBeCalled();
    });
  });
});
