import { Api, Page, Pages } from 'nightwatch';

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
    const originalExpectation = api.expect[field];

    let onSuccess: Function;
    let onCatch: Function;

    originalExpectation.catch = (catchCb: Function) => {
      if (catchCb) onCatch = catchCb;
    };
    originalExpectation.then = (successCb: Function, catchCb: Function) => {
      if (successCb) onSuccess = successCb;
      if (catchCb) onCatch = catchCb;
      return runQueue()
        .then(onSuccess)
        .catch(onCatch);
    };
  });
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
