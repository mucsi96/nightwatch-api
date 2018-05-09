const client = require('./client');

function getPageProxy(subPages) {
  return new Proxy(() => getClientProxy(subPages), {
    get: (target, pageName) => getPageProxy(subPages.concat([pageName]))
  });
}

function getClientProxy(subPages) {
  return new Proxy(
    {},
    {
      get: (target, name) => {
        if (name !== 'page') {
          const api = client().api;

          if (!subPages.length) {
            return api[name];
          }

          return subPages.reduce((api, pageName) => {
            return api[pageName];
          }, api.page)()[name];
        }

        return getPageProxy([]);
      }
    }
  );
}

module.exports.client = getClientProxy([]);
