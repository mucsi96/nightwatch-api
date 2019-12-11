export default class Reporter {
  logAssertResult(result: any) {
    if (result.failure) {
      process.stdout.write(`${result.message}\n${result.stack}`);
    }
  }

  logFailedAssertion() {}

  registerPassed(message: string) {
    process.stdout.write(`\u{1b}[0;32m√\u{1b}[0m ${message}\n`);
  }

  registerFailed() {}

  registerTestError() {}
}
