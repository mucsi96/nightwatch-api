import { createSession, closeSession } from 'nightwatch-api';

jest.setTimeout(60000);

beforeAll(async () => {
  await createSession({ env: 'default' });
});

afterAll(async () => {
  await closeSession();
});
