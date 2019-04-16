import { deleteRunner, startWebDriver, createSession, runQueue } from './client';
import { CliRunner } from 'nightwatch';
import { EventEmitter } from 'events';
import { createFailureScreenshot } from './screenshots';

let mockCliRunnerInstance = null;
let mockTestError = null;
let mockScreenshotsPath = null;

class MockQueue extends EventEmitter {
  reset = jest.fn().mockReturnValue(this);
  empty = jest.fn().mockReturnValue(this);
  run = jest.fn(() => {
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
      setup: jest.fn()
    };

    return mockCliRunnerInstance;
  })
}));

jest.mock('./screenshots');

beforeEach(() => {
  deleteRunner();
  mockCliRunnerInstance = null;
  mockTestError = null;
  mockScreenshotsPath = null;
  createFailureScreenshot.mockClear();
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
