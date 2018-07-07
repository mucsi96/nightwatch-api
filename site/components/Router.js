import React from 'react';
import { StaticRouter } from 'react-router';
import { withMainContext } from './MainProvider';

const Router = ({ path, children }) => (
  <StaticRouter location={path} context={{}}>
    {children}
  </StaticRouter>
);

export default withMainContext(Router);
