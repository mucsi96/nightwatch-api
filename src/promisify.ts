export function promisifyApi(api, runQueue: Function) {
  let _successCb: Function;
  let _catchCb: Function;

  api.catch = (catchCb: Function) => {
    if (catchCb) _catchCb = catchCb;
  };
  api.then = (successCb: Function, catchCb: Function) => {
    if (successCb) _successCb = successCb;
    if (catchCb) _catchCb = catchCb;
    return runQueue()
      .then(_successCb)
      .catch(_catchCb);
  };
}

export function promisifyExpect(api, runQueue: Function) {
  if (!api.expect) return;
  Object.keys(api.expect).forEach(field => {
    const originalExpectation = api.expect[field];

    api.expect[field] = function() {
      const result = originalExpectation.apply(this, arguments);
      promisifyApi(result, runQueue);
      return result;
    };
  });
}

export function promisifySection(section, runQueue: Function) {
  promisifyApi(section, runQueue);
  promisifyExpect(section, runQueue);
  if (section.section) {
    Object.keys(section.section).forEach(key => {
      promisifySection(section.section[key], runQueue);
    });
  }
}

function promisifyChildPageObjects(page: object, runQueue: Function) {
  Object.keys(page).forEach(key => {
    if (typeof page[key] !== 'function') {
      promisifyChildPageObjects(page[key], runQueue);
    } else {
      const originalPageCreator = page[key];
      page[key] = function() {
        const page = originalPageCreator.call(this);
        promisifySection(page, runQueue);
        return page;
      };
    }
  });
}

export function promisifyPageObjects(api, runQueue: Function) {
  if (api.page) {
    return promisifyChildPageObjects(api.page, runQueue);
  }
}