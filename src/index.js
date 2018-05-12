const { createSession, closeSession, runQueue } = require('./client');
const { promisifyApi, promisifyExpect, promisifyPageObjects } = require('./promisify');
const proxy = require('./proxy');

let client;

module.exports = {
  createSession: async env => {
    client = await createSession(env);
    promisifyApi(client, runQueue);
    promisifyExpect(client, runQueue);
    promisifyPageObjects(client, runQueue);
  },
  closeSession: closeSession,
  client: proxy(() => client)
};
