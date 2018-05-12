const { createSession, closeSession, runQueue } = require('./client');
const { promisifyApi, promisifyExpect, promisifyPageObjects } = require('./promisify');

let client;

module.exports = {
  createSession: async env => {
    client = await createSession(env);
    promisifyApi(client, runQueue);
    promisifyExpect(client, runQueue);
    promisifyPageObjects(client, runQueue);
  },
  closeSession: closeSession,
  client: new Proxy(
    {},
    {
      get: (target, name) => client[name]
    }
  )
};
