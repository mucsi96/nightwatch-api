import React from 'react';
import { withMainContext } from './MainProvider';
import GitHubStarts from './GitHubStarts';
import TwitterFollowers from './TwitterFollowers';
import { Link } from 'react-router-dom';

const MainNavigation = ({ className, github, npm, githubId, twitterId, twitter }) => (
  <nav className={className} aria-label="Main">
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
  </nav>
);

export default withMainContext(MainNavigation);
