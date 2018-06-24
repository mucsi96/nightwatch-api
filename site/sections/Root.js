import React from 'react';
import { Link, Route } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import Home from './Home';
import Api from './Api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Body from '../components/Body';
import Main from '../components/Main';
import GitHubStarts from '../components/GitHubStarts';
import TwitterFollowers from '../components/TwitterFollowers';
import TableOfContentsProvider, {
  withTableOfContents
} from '../components/TableOfContentsProvider';
import TableOfContents from '../components/TableOfContents';
import GitHubLogo from 'simple-icons/icons/github.svg';
import NPMLogo from 'simple-icons/icons/npm.svg';

const TableOfContentsContainer = withTableOfContents(TableOfContents);

const Root = ({
  path,
  title,
  description,
  url,
  img,
  github,
  githubId,
  npm,
  twitter,
  twitterId
}) => (
  <StaticRouter location={path} context={{}}>
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={img} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:description" content={description} />
        <meta name="theme-color" content="#7ac35f" />
      </head>
      <Body>
        <TableOfContentsProvider>
          <Header
            renderHomeLink={() => <Link to="/">{title}</Link>}
            renderMenu={() => (
              <ul>
                <li>
                  <a href={github}>Github</a>
                </li>
                <li>
                  <a href={npm}>NPM</a>
                </li>
                <li>
                  <GitHubStarts id={githubId} url={github} />
                </li>
                <li>
                  <TwitterFollowers id={twitterId} url={twitter} />
                </li>
                <li>
                  <Link to="/api">Api</Link>
                </li>
              </ul>
            )}
          />
          <Main>
            <Route exact path="/" component={Home} />
            <Route path="/api" component={Api} />
          </Main>
          <TableOfContentsContainer maxLevel={2} data-react-rehydrate-key="table-of-contents" />
          <Footer
            renderNav={() => (
              <ul>
                <li>
                  <a href={github} alt="GitHub">
                    <GitHubLogo width={35} />
                  </a>
                </li>
                <li>
                  <a href={npm} alt="NPM">
                    <NPMLogo width={105} />
                  </a>
                </li>
                <li>
                  <GitHubStarts id={githubId} url={github} />
                </li>
                <li>
                  <TwitterFollowers id={twitterId} url={twitter} />
                </li>
              </ul>
            )}
          />
          <script async defer src="https://buttons.github.io/buttons.js" />
          <script async defer src="https://platform.twitter.com/widgets.js" />
          <script async defer src="site-client.js" />
        </TableOfContentsProvider>
      </Body>
    </html>
  </StaticRouter>
);

export default Root;
