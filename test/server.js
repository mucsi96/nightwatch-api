const { path: chromedriverPath } = require('chromedriver');
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const { log } = require('../src/logger');
const { path: seleniumPath } = require('selenium-server');
const waitOn = require('wait-on');
const { execFile } = require('child_process');

const mimeTypes = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  js: 'text/javascript',
  css: 'text/css'
};

const waitForBusyPort = port =>
  new Promise((resolve, reject) => {
    waitOn({ resources: [`tcp:127.0.0.1:${port}`] }, err => (err ? reject(err) : resolve()));
  });

const waitForFreePort = port =>
  new Promise((resolve, reject) => {
    waitOn(
      { resources: [`tcp:127.0.0.1:${port}`], reverse: true },
      err => (err ? reject(err) : resolve())
    );
  });

const server = http.createServer((req, res) => {
  let uri = url.parse(req.url).pathname;

  if (uri === '/') uri = '/test-app.html';

  const filename = path.join(__dirname, uri);
  fs.exists(filename, exists => {
    if (!exists) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Not Found\n');
      res.end();
      return;
    }
    const mimeType = mimeTypes[path.extname(filename).split('.')[1]];
    res.writeHead(200, { 'Content-Type': mimeType });

    const fileStream = fs.createReadStream(filename);
    fileStream.pipe(res);
  });
});

async function startSelenium() {
  const instance = execFile('java', [
    `-Dwebdriver.chrome.driver=${path.relative(process.cwd(), chromedriverPath)}`,
    '-jar',
    path.relative(process.cwd(), seleniumPath),
    '-port',
    4444
  ]);
  const onClose = () => log(`Selenium terminated`);
  const onOut = chunk => log(`Selenium: ${chunk}`);
  instance.stdout.on('data', onOut);
  instance.stderr.on('data', onOut);
  instance.on('close', onClose);
  await waitForBusyPort(4444);
  log('Selenium server started on port 4444');
}

(async function() {
  server.listen(3000);
  log('test server started on port 3000');
  await startSelenium();
})().catch(err => log(err));
