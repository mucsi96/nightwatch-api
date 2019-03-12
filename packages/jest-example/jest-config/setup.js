import { createSession, closeSession } from 'nightwatch-api';

jest.setTimeout(60000);

beforeAll(async () => {
  await createSession();
});

afterAll(async () => {
  await closeSession();
});
