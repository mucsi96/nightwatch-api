import React from 'react';
import { withSiteConfig } from './SiteConfigProvider';

const HeaderNavigation = ({ className, github, npm, githubId, twitterId, twitter }) => (
  <nav className={className} aria-label="Main">
    <ul>
      <li>
        <a href="/">Intro</a>
      </li>
      <li>
        <a href="/api">API</a>
      </li>
      <li>
        <a href={github}>Github</a>
      </li>
    </ul>
  </nav>
);

export default withSiteConfig(HeaderNavigation);
