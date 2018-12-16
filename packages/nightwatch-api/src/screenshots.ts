import util from 'util';
import path from 'path';
import protocol, { ScreenshotResult } from 'nightwatch/lib/api/protocol';
import screenshots from 'nightwatch/lib/testsuite/screenshots';
import { Client } from 'nightwatch';

function getFileName() {
  const date = new Date();
  const datestamp = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .replace(/[:\-Z]/g, '')
    .replace(/[T.]/g, '-');

  return `${datestamp}.png`;
}

function saveFailureScreenshot(fileName: string, screenshotData: string) {
  return new Promise((resolve, reject) => {
    screenshots.writeScreenshotToFile(fileName, screenshotData, err => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}

export async function createFailureScreenshot(client: Client) {
  const protocolInstance = new protocol(client);
  const screenshotData = await new Promise<string>((resove, reject) => {
    protocolInstance.Actions.screenshot.call(
      protocolInstance,
      false,
      (response: ScreenshotResult) => {
        if ((response.state && response.state !== 'success') || response.status) {
          return reject(
            new Error(
              `Creating screenshot was not successful. Response was:\n${util.inspect(response)}`
            )
          );
        }

        return resove(response.value);
      }
    );
  });
  await saveFailureScreenshot(path.join(client.api.screenshotsPath, getFileName()), screenshotData);
}
