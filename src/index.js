const {
  startWebDriver,
  stopWebDriver,
  createSession,
  closeSession,
  runQueue
} = require('./client');
const {
  promisifyApi,
  promisifySection,
  promisifyExpect,
  promisifyPageObjects
} = require('./promisify');
const proxy = require('./proxy');
const NightwatchSection = require('nightwatch/lib/page-object/section');

let client;

module.exports = {
  startWebDriver,
  stopWebDriver,
  createSession: async env => {
    client = await createSession(env);
    promisifyApi(client, runQueue);
    promisifyExpect(client, runQueue);
    promisifyPageObjects(client, runQueue);
  },
  closeSession,
  client: proxy(() => client),
  Section: class Section extends NightwatchSection {
    constructor(definition, options) {
      super(definition, options);
      promisifySection(this.api, runQueue);
    }
  }
};
