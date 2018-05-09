const { start, stop } = require('../src');

jest.setTimeout(60000);

beforeAll(async () => {
  await start();
});

afterAll(async () => {
  await stop();
});
