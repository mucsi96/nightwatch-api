import React from 'react';
import { Route } from 'react-router';
import Home from './Home';
import Api from './Api';
import { StaticRouter } from 'react-router';
import { withSiteConfig } from '../components/SiteConfigProvider';

const Routes = ({ path }) => (
  <StaticRouter location={path} context={{}}>
    <>
      <Route exact path="/" component={Home} />
      <Route path="/api" component={Api} />
    </>
  </StaticRouter>
);

export default withSiteConfig(Routes);
