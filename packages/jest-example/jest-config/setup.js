import { createSession, closeSession } from 'nightwatch-api';

jest.setTimeout(60000);

beforeAll(async () => {
  await createSession({ env: process.env.NIGHTWATCH_ENV || 'chromeHeadless' });
});

afterAll(async () => {
  await closeSession();
});
