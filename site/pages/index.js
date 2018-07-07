import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Api from './Api';

const Routes = () => (
  <Fragment>
    <Route exact path="/" component={Home} />
    <Route path="/api" component={Api} />
  </Fragment>
);

export default Routes;
