const { createSession, closeSession } = require('../src');

jest.setTimeout(60000);

beforeAll(async () => {
  await createSession();
});

afterAll(async () => {
  await closeSession();
});
