import { inspect } from 'util';
import { join } from 'path';
// tslint:disable-next-line: import-name
import Screenshots from 'nightwatch/lib/utils/screenshots';
import { Client, ScreenshotResult } from 'nightwatch';

function getFileName() {
  const date = new Date();
  const datestamp = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .replace(/[:\-Z]/g, '')
    .replace(/[T.]/g, '-');

  return `${datestamp}.png`;
}

function saveFailureScreenshot(fileName: string, screenshotData: string) {
  return new Promise<void>((resolve, reject) => {
    Screenshots.writeScreenshotToFile(fileName, screenshotData, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}

export async function createFailureScreenshot(client: Client) {
  const screenshotData = await new Promise<string>((resolve, reject) => {
    client.transportActions.getScreenshot(false, (response: ScreenshotResult) => {
      if ((response.state && response.state !== 'success') || response.status) {
        return reject(
          new Error(`Creating screenshot was not successful. Response was:\n${inspect(response)}`)
        );
      }

      return resolve(response.value);
    });
  });
  const fileName = join(client.api.screenshotsPath, getFileName());
  await saveFailureScreenshot(fileName, screenshotData);
  return fileName;
}
