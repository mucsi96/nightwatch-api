import React from 'react';
import { StaticRouter } from 'react-router';

const Router = ({ path, children }) => (
  <StaticRouter location={path} context={{}}>
    {children}
  </StaticRouter>
);

export default Router;
