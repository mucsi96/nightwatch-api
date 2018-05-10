const { createSession, closeSession } = require('../src');
const { startTestApp, stopTestApp } = require('../test-app');
const portscanner = require('portscanner');

jest.setTimeout(60000);

const getFreePorts = async (startPort, endPort, n) => {
  let port = startPort - 1;
  const ports = [];
  while (ports.length < n) {
    /* eslint-disable no-await-in-loop */
    port = await portscanner.findAPortNotInUse(port + 1, 3050, '127.0.0.1');
    ports.push(port);
  }
  return ports;
};

beforeAll(async () => {
  const [testAppPort, webDriverPort] = await getFreePorts(3000, 3050, 2);
  process.env.TEST_APP_PORT = testAppPort;
  process.env.WEB_DRIVER_PORT = webDriverPort;
  await startTestApp(testAppPort);
  await createSession();
});

afterAll(async () => {
  await closeSession();
  await stopTestApp();
});
