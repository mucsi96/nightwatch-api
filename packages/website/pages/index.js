import React from 'react';
import * as ReactRouter from 'react-router';
import Home from './Home';
import Api from './Api';
import { StaticRouter } from 'react-router';
import { withSiteConfig } from '../components/utils/SiteConfigProvider';
import TableOfContentsCollector from '../components/toc/TableOfContentsCollector';

const Route = ({ onlyCollectTableOfContents, exact, path, component, title }) => {
  if (onlyCollectTableOfContents) {
    return <TableOfContentsCollector url={path} level={1} title={title} />;
  }

  return <ReactRouter.Route exact={exact} path={path} component={component} />;
};

const Routes = ({ onlyCollectTableOfContents, path, github }) => (
  <StaticRouter location={path} context={{}}>
    <>
      <Route
        onlyCollectTableOfContents={onlyCollectTableOfContents}
        exact
        path="/"
        component={Home}
        title="Introduction"
      />
      <Route
        onlyCollectTableOfContents={onlyCollectTableOfContents}
        path="/api"
        component={Api}
        title="API"
      />
      {onlyCollectTableOfContents && (
        <TableOfContentsCollector url={github} level={1} title="GitHub" />
      )}
    </>
  </StaticRouter>
);

export default withSiteConfig(Routes);
