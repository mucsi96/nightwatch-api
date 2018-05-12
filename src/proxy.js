function getPageProxy(getClient, subPages) {
  return new Proxy(() => getClientProxy(getClient, subPages), {
    get: (target, pageName) => getPageProxy(getClient, subPages.concat([pageName]))
  });
}

function getClientProxy(getClient, subPages = []) {
  return new Proxy(
    {},
    {
      get: (target, name) => {
        if (name !== 'page') {
          const client = getClient();
          if (!subPages.length) {
            return client[name];
          }

          return subPages.reduce((api, pageName) => {
            if (!(pageName in api)) {
              throw new Error(
                `Not existing page ${pageName}. Available pages are [${Object.keys(api)}]`
              );
            }
            return api[pageName];
          }, client.page)()[name];
        }

        return getPageProxy(getClient, []);
      }
    }
  );
}

module.exports = getClientProxy;
