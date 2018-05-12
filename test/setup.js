const { createSession, closeSession } = require('../src');
const { startTestApp, stopTestApp } = require('../test-app');
const portscanner = require('portscanner');

jest.setTimeout(60000);

const getFreePorts = async (startPort, endPort, n) => {
  let port = startPort;
  const ports = [];
  while (ports.length < n) {
    /* eslint-disable no-await-in-loop */
    port = await portscanner.findAPortNotInUse(port, endPort, '127.0.0.1');
    ports.push(port);
    port += 1;
  }
  return ports;
};

beforeAll(async () => {
  const startPort = 3000 + (10 * process.env.JEST_WORKER_ID - 1);
  const endPort = 3009 + (10 * process.env.JEST_WORKER_ID - 1);
  const [testAppPort, webDriverPort] = await getFreePorts(startPort, endPort, 2);
  process.env.TEST_APP_PORT = testAppPort;
  process.env.WEB_DRIVER_PORT = webDriverPort;
  await startTestApp(testAppPort);
  await createSession();
});

afterAll(async () => {
  await closeSession();
  await stopTestApp();
});
