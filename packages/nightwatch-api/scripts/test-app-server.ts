import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';
import { log } from '../src/logger';
import { promisify } from 'util';

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

export async function startTestAppServer() {
  await promisify(server.listen).call(server, 3000);
  log('Test server started on port 3000');
}

export async function stopTestAppServer() {
  await promisify(server.close).call(server);
  log('Test server stopped on port 3000');
}
