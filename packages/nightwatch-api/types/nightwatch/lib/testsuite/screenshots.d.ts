type writeScreenshotToFileCallback = (err: Error) => void;

export function writeScreenshotToFile(
  fileName: string,
  screenshotData: string,
  callback: writeScreenshotToFileCallback
): void;
