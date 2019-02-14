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

runCommand(
  '../../node-example',
  `npm install ../nightwatch-api/${tarball} --no-save --no-package-lock`
);
runCommand('../../node-example', 'npm install');

runCommand(
  '../../jest-example',
  `npm install ../nightwatch-api/${tarball} --no-save --no-package-lock`
);
runCommand('../../jest-example', 'npm install');

runCommand(
  '../../cucumber-example',
  `npm install ../nightwatch-api/${tarball} --no-save --no-package-lock`
);
runCommand('../../cucumber-example', 'npm install');

runCommand(
  '../../cucumber-selenium-example',
  `npm install ../nightwatch-api/${tarball} --no-save --no-package-lock`
);
runCommand('../../cucumber-selenium-example', 'npm install');

copyFileSync(
  resolve(__dirname, '..', tarball),
  resolve(__dirname, '../../cucumber-selenium-hub-example', tarball)
);
runCommand(
  '../../cucumber-selenium-hub-example',
  `npm install ./${tarball} --no-save --no-package-lock`
);
