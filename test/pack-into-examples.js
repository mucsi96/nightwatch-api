const path = require('path');
const { execSync } = require('child_process');
const { name, version } = require('../package.json');
const tarball = `${name}-${version}.tgz`;

execSync('npm pack', { cwd: path.resolve(__dirname, '..') });
execSync(`npm i ../../${tarball} && npm i`, { cwd: path.resolve(__dirname, '../examples/jest') });
execSync(`npm i ../../${tarball} && npm i`, {
  cwd: path.resolve(__dirname, '../examples/cucumber')
});
execSync(`npm i ../../${tarball} && npm i`, { cwd: path.resolve(__dirname, '../examples/node') });
