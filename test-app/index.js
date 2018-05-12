const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const { log } = require('../src/logger');
const { path: chromedriverPath } = require('chromedriver');
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

  if (uri === '/') uri = '/index.html';

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
  execFile('java', ['-jar', seleniumPath, '-port', 4444]);
  await waitForBusyPort(4444);
  log('Selenium server started on port 4444');
}

async function startChromedriver() {
  execFile(chromedriverPath);
  log('Chromedriver started');
}

(async function() {
  await startChromedriver();
  server.listen(3000);
  log('test server started on port 3000');
  await startSelenium();
})().catch(err => log(err));
