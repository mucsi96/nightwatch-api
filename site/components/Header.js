import React from 'react';
import styled from 'styled-components';
import WidthLimiter from './WidthLimiter';
import { withMainContext } from './MainProvider';
import { Link } from 'react-router-dom';
import HomeIcon from '../images/nightwatch-api-logo.svg';

const HomeLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: calc(var(--spacing) / 2);
`;

const StyledHomeIcon = styled(HomeIcon)`
  width: 50px;
  height: 50px;
  margin-right: calc(var(--spacing) / 2);
`;

const HeaderWidthLimiter = styled(WidthLimiter)`
  display: flex;
  align-items: center;
`;

const Header = styled(({ title, renderNavigation, className }) => (
  <header className={className}>
    <HeaderWidthLimiter>
      <HomeLink to="/">
        <StyledHomeIcon />
        <span>{title}</span>
      </HomeLink>
      {renderNavigation()}
    </HeaderWidthLimiter>
  </header>
))`
  --spacing: 20px;

  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  line-height: var(--header-height);

  @media (min-width: 1280px) {
    font-size: 18px;
  }

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
    display: inline;
    padding: 0 calc(var(--spacing) / 2);
  }
`;

export default withMainContext(Header);
