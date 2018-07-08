import React from 'react';
import styled from 'styled-components';
import WidthLimiter from './WidthLimiter';
import { withSiteConfig } from './SiteConfigProvider';
import HomeIcon from '../images/nightwatch-api-logo.svg';
import HeaderNavigation from './HeaderNavigation';

const HomeLink = styled.a`
  display: flex;
  align-items: center;
  margin-right: calc(var(--spacing) / 2);
  margin-left: calc(var(--icon-size) + var(--spacing) / 2);
  white-space: nowrap;
`;

const StyledHomeIcon = styled(HomeIcon)`
  width: var(--icon-size);
  height: var(--icon-size);
  margin-right: calc(var(--spacing) / 2);
  position: absolute;
  bottom: -3px;
  left: var(--horizontal-padding);
`;

const HeaderWidthLimiter = styled(WidthLimiter)`
  display: flex;
  align-items: center;
  position: relative;
`;

const StyledHeader = styled.header`
  --spacing: 20px;
  --icon-size: 50px;
  --bottom-border: 3px;

  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  line-height: calc(var(--header-height) - var(--bottom-border));
  border-bottom: var(--bottom-border) solid #512d14;

  a {
    text-decoration: none;
    color: inherit;
  }

  nav {
    overflow: hidden;
    white-space: nowrap;
    margin-right: 18px;
    display: none;
    margin-left: var(--sidebar-gutter);

    @media (min-width: 600px) {
      display: initial;
    }

    @media (min-width: 2000px) {
      position: fixed;
      right: 0;
      width: var(--sidebar-width);
      margin-left: 0;
    }
  }

  ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0 calc(var(--spacing) / 2);
  }
`;

const Header = ({ title }) => (
  <StyledHeader>
    <HeaderWidthLimiter>
      <HomeLink href="/">
        <StyledHomeIcon />
        <span>{title}</span>
      </HomeLink>
      <HeaderNavigation />
    </HeaderWidthLimiter>
  </StyledHeader>
);

export default withSiteConfig(Header);
