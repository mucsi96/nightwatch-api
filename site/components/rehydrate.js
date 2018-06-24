import React from 'react';
import { hydrate } from 'react-dom';

const rehydrate = (Component, key) =>
  hydrate(
    <Component {...window.__REHYDRATION_INITIAL_STATE__[key]} />,
    document.querySelector(`[data-react-rehydrate-key="${key}"]`)
  );

export default rehydrate;
