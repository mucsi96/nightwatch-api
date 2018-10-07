import { Api, Page, Pages, Expect } from 'nightwatch';

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

export function promisifyExpectDeep(target: Expect, runQueue: Function) {
  Object.keys(target).forEach(field => {
    const method = <Expect>target[field];

    promisifyExpectDeep(method, runQueue);

    let onSuccess: Function;
    let onCatch: Function;

    method.catch = (catchCb: Function) => {
      if (catchCb) onCatch = catchCb;
    };
    method.then = (successCb: Function, catchCb: Function) => {
      if (successCb) onSuccess = successCb;
      if (catchCb) onCatch = catchCb;
      return runQueue()
        .then(onSuccess)
        .catch(onCatch);
    };
  });
}

export function promisifyExpect(api: Api, runQueue: Function) {
  if (!api.expect) return;
  promisifyExpectDeep(api.expect, runQueue);
}

export function promisifySection(section: Api, runQueue: Function) {
  promisifyApi(section, runQueue);
  promisifyExpect(section, runQueue);
  if (section.section) {
    Object.keys(section.section).forEach(key => {
      promisifySection(section.section[key], runQueue);
    });
  }
}

function promisifyChildPageObjects(page: Pages, runQueue: Function) {
  Object.keys(page).forEach(key => {
    if (typeof page[key] !== 'function') {
      promisifyChildPageObjects(<Pages>page[key], runQueue);
    } else {
      const originalPageCreator = <Page>page[key];
      page[key] = function() {
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
