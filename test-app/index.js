const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const { log } = require('../src/logger');

const mimeTypes = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  js: 'text/javascript',
  css: 'text/css'
};

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

async function startTestApp() {
  const port = process.env.TEST_APP_PORT;
  await new Promise(resolve => {
    server.listen(port, resolve);
  });
  log(`Test app started on port ${port}`);
}

async function stopTestApp() {
  const port = process.env.TEST_APP_PORT;
  await new Promise(resolve => {
    server.close(resolve);
  });
  log(`Test app stoped on port ${port}`);
}

module.exports = {
  startTestApp,
  stopTestApp
};
