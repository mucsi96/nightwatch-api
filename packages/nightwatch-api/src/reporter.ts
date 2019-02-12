export default class Reporter {
  logAssertResult() {}

  logFailedAssertion() {}

  registerPassed(message: string) {
    process.stdout.write(`\u{1b}[0;32m√\u{1b}[0m ${message}\n`);
  }

  registerFailed() {}
}
