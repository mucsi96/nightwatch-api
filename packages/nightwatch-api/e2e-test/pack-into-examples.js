const path = require('path');
const { execSync } = require('child_process');
const { name, version } = require('../package.json');
const tarball = `${name}-${version}.tgz`;

execSync('npm pack', { cwd: path.resolve(__dirname, '..') });
execSync(`npm i ../nightwatch-api/${tarball} && npm i`, {
  cwd: path.resolve(__dirname, '../../jest-example')
});
execSync(`npm i ../nightwatch-api/${tarball} && npm i`, {
  cwd: path.resolve(__dirname, '../../cucumber-example')
});
execSync(`npm i ../nightwatch-api/${tarball} && npm i`, {
  cwd: path.resolve(__dirname, '../../node-example')
});
