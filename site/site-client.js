import React from 'react';
import { render } from 'react-dom';
import TableOfContents from './components/TableOfContents';

render(
  <TableOfContents {...window.__INITIAL_STATE__['table-of-contents']} />,
  document.querySelector('[data-react-rehydrate-key="table-of-contents"]')
);
