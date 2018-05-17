function getPageProxy(getClient: Function, subPages) {
  return new Proxy(() => getClientProxy(getClient, subPages), {
    get: (target, pageName) => getPageProxy(getClient, subPages.concat([pageName]))
  });
}

export default function getClientProxy(getClient: Function, subPages = []) {
  return new Proxy(
    {},
    {
      get: (target, name) => {
        if (name !== 'page') {
          const client = getClient();

          if (!client) {
            throw new Error(
              'Nightwatch client is not ready. Looks like function "createSession" did not succeed or was not called yet.'
            );
          }

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