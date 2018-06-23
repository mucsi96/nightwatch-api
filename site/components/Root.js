import React from 'react';
import { Link, Route } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import Home from './Home';
import Api from './Api';
import Body from './Body';
import Main from './Main';

const Root = ({ path, title }) => (
  <StaticRouter location={path} context={{}}>
    <html>
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="prism-okaidia.css" />
      </head>
      <Body>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/api">Api</Link>
            </li>
          </ul>
        </nav>
        <Main>
          <Route exact path="/" component={Home} />
          <Route path="/api" component={Api} />
        </Main>
      </Body>
    </html>
  </StaticRouter>
);

export default Root;
