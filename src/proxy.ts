import { Page, Api } from 'nightwatch';

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
          return (<any>client)[name];
        }

        return (<any>subPages.reduce((api: Page, pageName: string) => {
          if (!(pageName in api)) {
            throw new Error(
              `Not existing page ${pageName}. Available pages are [${Object.keys(api)}]`
            );
          }
          return <Page>(<any>api)[pageName];
        }, client.page)())[name];
      }

      return getPageProxy(getClient, []);
    }
  });
}
