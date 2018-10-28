import React from 'react';
import styled from 'styled-components';
import { withSiteConfig } from './SiteConfigProvider';
import Link from './HeaderNavigationLink';

const Navigation = styled('nav')`
  overflow: hidden;
  white-space: nowrap;
  margin-right: 18px;
  display: none;
  margin-left: var(--sidebar-gutter);

  @media (min-width: 720px) {
    display: flex;
  }

  @media (min-width: 2000px) {
    position: fixed;
    right: 0;
    width: var(--sidebar-width);
    margin-left: 0;
  }
`;

const HeaderNavigation = ({ className, github }) => (
  <Navigation className={className} aria-label="Main">
    <Link href="/">Intro</Link>
    <Link href="/api">API</Link>
    <Link href={github}>Github</Link>
  </Navigation>
);

export default withSiteConfig(HeaderNavigation);
