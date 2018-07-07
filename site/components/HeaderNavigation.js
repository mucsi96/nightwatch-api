import React from 'react';
import { withSiteConfig } from './SiteConfigProvider';
import GitHubStarts from './GitHubStarts';
import TwitterFollowers from './TwitterFollowers';

const MainNavigation = ({ className, github, npm, githubId, twitterId, twitter }) => (
  <nav className={className} aria-label="Main">
    <ul>
      <li>
        <a href="/api">Api</a>
      </li>
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
    </ul>
  </nav>
);

export default withSiteConfig(MainNavigation);
