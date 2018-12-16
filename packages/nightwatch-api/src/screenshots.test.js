import { createFailureScreenshot } from './screenshots';
import protocol from 'nightwatch/lib/api/protocol';
import screenshots from 'nightwatch/lib/testsuite/screenshots';

function setupMocks({ status = 0, value = 'testImageData', state, saveError } = {}) {
  Object.defineProperty(protocol.prototype, 'Actions', {
    get() {
      return {
        screenshot(_log, callback) {
          callback({
            status,
            value,
            state
          });
        }
      };
    }
  });

  screenshots.writeScreenshotToFile = jest.fn((_fileName, _screenshotData, callback) =>
    callback(saveError)
  );
  Date.prototype.getTimezoneOffset = jest.fn(() => -60);
  Date.prototype.getTime = jest.fn(() => 1544964642047);
}

describe('screenshots', () => {
  it('creates failure screenshot', async () => {
    setupMocks();
    await createFailureScreenshot({ api: { screenshotsPath: 'testScreenshotsPath' } });
    expect(screenshots.writeScreenshotToFile).toBeCalledWith(
      'testScreenshotsPath\\20181216-135042-047.png',
      'testImageData',
      expect.any(Function)
    );
  });

  it('throws error if status is not 0', async () => {
    setupMocks({ status: 1 });
    await expect(
      createFailureScreenshot({ api: { screenshotsPath: 'testScreenshotsPath' } })
    ).rejects.toThrow('Creating screenshot was not successful.');
  });

  it('throws error if state is not "success"', async () => {
    setupMocks({ state: 'failure' });
    await expect(
      createFailureScreenshot({ api: { screenshotsPath: 'testScreenshotsPath' } })
    ).rejects.toThrow('Creating screenshot was not successful.');
  });

  it('throws error if state is not "success"', async () => {
    setupMocks({ saveError: new Error('Test save error') });
    await expect(
      createFailureScreenshot({ api: { screenshotsPath: 'testScreenshotsPath' } })
    ).rejects.toThrow('Test save error');
  });
});
