const { cli, CliRunner } = require('nightwatch');
const fs = require('fs');
const path = require('path');


function getConfig(env) {
    const jsonConfigFile = './nightwatch.json'
    const jsConfigFie = path.resolve('./nightwatch.conf.js');
    const configFile = fs.existsSync(jsConfigFie) ? jsConfigFie : jsonConfigFile;
    const runner = CliRunner({ config: configFile, env });
    runner.setup();
    return runner.settings;
}

console.log(getConfig('firefox'));

