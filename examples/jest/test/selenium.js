const { path: chromedriverPath } = require('chromedriver');
const path = require('path');
const { path: seleniumPath } = require('selenium-server');
const waitOn = require('wait-on');
const { execFile } = require('child_process');

const waitForBusyPort = port =>
  new Promise((resolve, reject) => {
    waitOn({ resources: [`tcp:127.0.0.1:${port}`] }, err => (err ? reject(err) : resolve()));
  });

(async function() {
  const instance = execFile('java', [
    `-Dwebdriver.chrome.driver=${path.relative(process.cwd(), chromedriverPath)}`,
    '-jar',
    path.relative(process.cwd(), seleniumPath),
    '-port',
    4444
  ]);
  const onClose = () => console.log(`Selenium terminated`);
  const onOut = chunk => console.log(`Selenium: ${chunk}`);
  instance.stdout.on('data', onOut);
  instance.stderr.on('data', onOut);
  instance.on('close', onClose);
  await waitForBusyPort(4444);
  console.log('Selenium server started on port 4444');
})().catch(err => console.log(err));
