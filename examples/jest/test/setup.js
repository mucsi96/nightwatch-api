import { createSession, closeSession } from 'nightwatch-api';

jest.setTimeout(60000);

beforeAll(async () => {
  await createSession('chrome');
});

afterAll(async () => {
  await closeSession();
});
