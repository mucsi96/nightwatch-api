import React from 'react';
import { Route } from 'react-router';
import Home from './Home';
import Api from './Api';

const Routes = () => (
  <>
    <Route exact path="/" component={Home} />
    <Route path="/api" component={Api} />
  </>
);

export default Routes;
