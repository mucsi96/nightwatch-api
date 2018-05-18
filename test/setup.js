const { createSession, closeSession } = require('../src');

jest.setTimeout(60000);

beforeAll(async () => {
  await createSession();
});

afterAll(async () => {
  await closeSession();
});

// For async tests, catch all errors here so we don't have to try / catch
// everywhere for safety
process.on('unhandledRejection', error => {
  console.log(error);
});
