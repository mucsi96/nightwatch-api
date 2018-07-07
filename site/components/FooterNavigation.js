import React from 'react';
import { withMainContext } from './MainProvider';
import GitHubStarts from '../components/GitHubStarts';
import TwitterFollowers from '../components/TwitterFollowers';
import GitHubLogo from 'simple-icons/icons/github.svg';
import NPMLogo from 'simple-icons/icons/npm.svg';

const FooterNavigation = ({ className, github, npm, githubId, twitterId, twitter }) => (
  <nav className={className}>
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
  </nav>
);

export default withMainContext(FooterNavigation);
