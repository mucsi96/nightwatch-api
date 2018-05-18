import { Page, Pages, Api } from 'nightwatch';

function getPageProxy(getClient: () => Api, subPages: string[]): () => Api {
  return new Proxy<() => Api>(() => getClientProxy(getClient, subPages), {
    get: (target, pageName: string) => getPageProxy(getClient, subPages.concat([pageName]))
  });
}

export default function getClientProxy(getClient: () => Api, subPages: string[] = []): Api {
  return new Proxy<Api>(<Api>{}, {
    get: (target, name: string) => {
      if (name !== 'page') {
        const client = getClient();

        if (!client) {
          throw new Error(
            `Nightwatch client is not ready.
              Looks like function "createSession" did not succeed or was not called yet.`
          );
        }

        if (!subPages.length) {
          return client[name];
        }

        const page: Page = <Page>subPages.reduce((pages: Page | Pages, pageName: string) => {
          if (!(pageName in pages)) {
            throw new Error(
              `Not existing page ${pageName}. Available pages are [${Object.keys(pages)}]`
            );
          }

          if (typeof pages === 'function') {
            return page;
          }

          return pages[pageName];
        }, client.page);

        return page()[name];
      }

      return getPageProxy(getClient, []);
    }
  });
}
