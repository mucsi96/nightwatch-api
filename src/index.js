const { createSession, deleteSession, runQueue } = require('./client');
const {
  promisifyApi,
  promisifyExpect,
  promisifyAssertions,
  promisifyPageObjects
} = require('./promisify');

let client;

module.exports = {
  start: async env => {
    client = await createSession(env);
    promisifyApi(client, runQueue);
    promisifyExpect(client, runQueue);
    promisifyAssertions(client, runQueue);
    promisifyPageObjects(client, runQueue);
  },
  stop: deleteSession,
  client: new Proxy(
    {},
    {
      get: (target, name) => client[name]
    }
  )
};
