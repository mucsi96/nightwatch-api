import { Api } from 'nightwatch';

export function promisifyApi(api: Api, runQueue: Function) {
  let onSuccess: Function;
  let onCatch: Function;

  api.catch = (catchCb: Function) => {
    if (catchCb) onCatch = catchCb;
  };
  api.then = (successCb: Function, catchCb: Function) => {
    if (successCb) onSuccess = successCb;
    if (catchCb) onCatch = catchCb;
    return runQueue()
      .then(onSuccess)
      .catch(onCatch);
  };
}

export function promisifyExpect(api: Api, runQueue: Function) {
  if (!api.expect) return;
  Object.keys(api.expect).forEach(field => {
    const originalExpectation = (<any>api.expect)[field];

    (<any>api.expect)[field] = function() {
      const result = originalExpectation.apply(this, arguments);
      promisifyApi(result, runQueue);
      return result;
    };
  });
}

export function promisifySection(section: Api, runQueue: Function) {
  promisifyApi(section, runQueue);
  promisifyExpect(section, runQueue);
  if (section.section) {
    Object.keys(section.section).forEach(key => {
      promisifySection((<any>section.section)[key], runQueue);
    });
  }
}

function promisifyChildPageObjects(page: object, runQueue: Function) {
  Object.keys(page).forEach(key => {
    if (typeof (<any>page)[key] !== 'function') {
      promisifyChildPageObjects((<any>page)[key], runQueue);
    } else {
      const originalPageCreator = (<any>page)[key];
      (<any>page)[key] = function() {
        const page = originalPageCreator.call(this);
        promisifySection(page, runQueue);
        return page;
      };
    }
  });
}

export function promisifyPageObjects(api: Api, runQueue: Function) {
  if (api.page) {
    return promisifyChildPageObjects(api.page, runQueue);
  }
}
