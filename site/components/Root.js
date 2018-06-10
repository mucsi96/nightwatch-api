import React from 'react';
import { Link, Route } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import Home from './Home';
import Api from './Api';

const Root = ({ path, title }) => (
  <StaticRouter location={path} context={{}}>
    <html>
      <head>
        <title>{title}</title>
      </head>
      <body>
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
        <Route exact path="/" component={Home} />
        <Route path="/api" component={Api} />
      </body>
    </html>
  </StaticRouter>
);

export default Root;
