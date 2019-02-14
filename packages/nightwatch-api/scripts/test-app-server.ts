import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';
import { log } from '../src/logger';
import { startWebDriver, stopWebDriver } from '../src';

type MimeTypes = {
  [key: string]: string;
};

const mimeTypes: MimeTypes = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  js: 'text/javascript',
  css: 'text/css'
};

const server = http.createServer((req, res) => {
  if (!req.url) {
    return;
  }

  let uri = url.parse(req.url).pathname;

  if (!uri) {
    return;
  }

  if (uri === '/') uri = '/test-app.html';

  const filename = path.join(__dirname, uri);
  fs.exists(filename, (exists: boolean) => {
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

(async function() {
  server.listen(3000);
  log('Test server started on port 3000');
  await startWebDriver({
    configFile: path.resolve(__dirname, '..', 'e2e-test/nightwatch.conf.js')
  });
})().catch(err => log(err));

process.on('SIGTERM', async () => {
  try {
    server.close();
    log('Test server stopped on port 3000');
    await stopWebDriver();
    process.exit();
  } catch (err) {
    process.exit(1);
  }
});
