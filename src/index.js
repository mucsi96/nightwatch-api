const { cli, CliRunner, client: createClient } = require('nightwatch');
const fs = require('fs');
const path = require('path');

let runner;
let client;

function createRunner(env) {
    if (!runner) {
        const jsonConfigFile = './nightwatch.json'
        const jsConfigFie = path.resolve('./nightwatch.conf.js');
        const configFile = fs.existsSync(jsConfigFie) ? jsConfigFie : jsonConfigFile;
        runner = CliRunner({ config: configFile, env });
        runner.setup();
    }

    return runner;
}

async function createSession(env = 'default') {
    createRunner(env);
    const settings = runner.test_settings;
    await runner.startWebDriver();
    console.log('webdriver started');
    client = createClient(settings);
    await new Promise(function(resolve, reject) {
        client.once('nightwatch:session.create', function(id) {
            resolve(client);
        }).once('nightwatch:session.error', function(err) {
            reject(err);
        });
        
        client.startSession();
    });
    console.log('session created');
}

async function deleteSession() {
    await new Promise((resolve, reject) => {
        client.queue.empty();
        client.queue.reset();
        client.session.close();
        client.queue.run(err => !err ? resolve() : reject());
    });
    console.log('session closed');
    await runner.stopWebDriver();
    console.log('webdriver stopped');
}

(async () => {
    try {
        await createSession();
    } catch (err) {
        console.log(err.stack);
    } finally {
        await deleteSession();
    }
})();

