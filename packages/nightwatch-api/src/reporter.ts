export default class Reporter {
  logAssertResult() {}

  logFailedAssertion() {}

  registerPassed(message: string) {
    const symbol = process.platform === 'win32' ? '\u221A' : String.fromCharCode(10004);
    const ok = `\u{1b}[0;32m${symbol}\u{1b}[0m`;
    process.stdout.write(`${ok} ${message}\n`);
  }

  registerFailed() {}
}
