import { resolve } from 'path';
import { execSync } from 'child_process';
import { copyFileSync, readFileSync } from 'fs';

const { name, version } = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf8'));
const tarball = `${name}-${version}.tgz`;

function runCommand(cwd: string, command: string) {
  process.stdout.write(`\nRunning script: ${cwd}/${command}\n`);
  execSync(command, { cwd: resolve(__dirname, cwd), stdio: 'inherit', encoding: 'utf8' });
}

runCommand('..', 'npm pack');

runCommand('../../node-example', `npm install ../nightwatch-api/${tarball}`);
runCommand('../../node-example', 'npm ci');

runCommand('../../jest-example', `npm install ../nightwatch-api/${tarball}`);
runCommand('../../jest-example', 'npm ci');

runCommand('../../cucumber-example', `npm install ../nightwatch-api/${tarball}`);
runCommand('../../cucumber-example', 'npm ci');

runCommand('../../cucumber-selenium-example', `npm install ../nightwatch-api/${tarball}`);
runCommand('../../cucumber-selenium-example', 'npm ci');

copyFileSync(
  resolve(__dirname, '..', tarball),
  resolve(__dirname, '../../cucumber-selenium-hub-example', tarball)
);
runCommand('../../cucumber-selenium-hub-example', `npm install ./${tarball}`);

runCommand('../../cucumber-browserstack-example', `npm install ../nightwatch-api/${tarball}`);
runCommand('../../cucumber-browserstack-example', 'npm ci');
