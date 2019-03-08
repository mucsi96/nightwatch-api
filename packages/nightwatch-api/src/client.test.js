import { deleteRunner, startWebDriver, createSession } from './client';
import { CliRunner } from 'nightwatch';

let mockCliRunnerInstance;

jest.mock('nightwatch', () => ({
  client: jest.fn(() => ({
    startSession: jest.fn()
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

beforeEach(() => {
  deleteRunner();
  mockCliRunnerInstance = null;
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
      await createSession({ env: 'default' });
      expect(mockCliRunnerInstance.setup).toBeCalled();
    });
  });
});
