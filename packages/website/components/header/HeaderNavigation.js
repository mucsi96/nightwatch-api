import React from 'react';
import styled from 'styled-components';
import Link from './HeaderNavigationLink';
import { version } from 'packageJson';

const Navigation = styled('nav')`
  display: none;

  @media (min-width: 720px) {
    display: flex;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    margin-right: 18px;
    margin-left: var(--sidebar-gutter);
  }

  @media (min-width: 2000px) {
    position: fixed;
    right: 0;
    width: var(--sidebar-width);
    margin-left: 0;
  }

  ul {
    flex: 1;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  li {
    display: flex;
    flex-direction: column;
  }
`;

const Spacer = styled('div')`
  display: none;

  @media (min-width: 720px) {
    display: block;
    flex: 1;
  }
`;

const Version = styled('li')`
  display: none;

  @media (min-width: 720px) {
    display: block;
  }
`;

const HeaderNavigation = ({ className, github }) => (
  <Navigation className={className} aria-label="Main">
    <ul>
      <li>
        <Link href="/">Intro</Link>
      </li>
      <li>
        <Link href="/api">API</Link>
      </li>
      <Spacer />
      <Version>{`v${version}`}</Version>
      <li>
        <Link href={github}>Github</Link>
      </li>
    </ul>
  </Navigation>
);

export default HeaderNavigation;
