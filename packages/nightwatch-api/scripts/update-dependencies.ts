import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const packages = fs.readdirSync(path.resolve(__dirname, '../..'));

packages.forEach(packageName => {
  const cwd = path.resolve(__dirname, '../..', packageName);
  runCommand('npx npm-check-updates --upgrade', cwd);
  runCommand('npm i', cwd);
});

function runCommand(command: string, cwd: string) {
  console.log(`${cwd} > ${command}`);
  spawnSync(command, { cwd, shell: true, stdio: 'inherit' });
}
