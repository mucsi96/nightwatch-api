import React from 'react';
import styled from 'styled-components';
import WidthLimiter from '../utils/WidthLimiter';
import { withSiteConfig } from '../utils/SiteConfigProvider';
import HeaderNavigation from './HeaderNavigation';
import HamburgerButton from './HamburgerButton';
import dehydrate from '../utils/dehydrate';

const DehydratedHamburgerButton = dehydrate('hamburger-button')(HamburgerButton);
const StyledDehydratedHamburgerButton = styled(DehydratedHamburgerButton)`
  @media (min-width: 720px) {
    display: none;
  }
`;

const HomeLink = styled.a`
  display: flex;
  align-items: center;
  margin-right: calc(var(--spacing) / 2);
  white-space: nowrap;
  font-weight: bold;
  color: #a5cc91;
  text-decoration: none;

  transition: filter var(--animation-duration) linear;

  :hover {
    filter: contrast(200%);
  }
`;

const HeaderWidthLimiter = styled(WidthLimiter)`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;

  @media (min-width: 720px) {
    justify-content: initial;
  }
`;

const StyledHeader = styled.header`
  --spacing: 20px;
  --icon-size: 50px;

  display: flex;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  line-height: var(--header-height);
  background-color: #20232a;
  color: white;

  @media (min-width: 720px) {
    z-index: 2;
  }
`;

const Header = ({ title, github }) => (
  <StyledHeader>
    <HeaderWidthLimiter>
      <HomeLink href="/">{title}</HomeLink>
      <HeaderNavigation github={github} />
      <StyledDehydratedHamburgerButton />
    </HeaderWidthLimiter>
  </StyledHeader>
);

export default withSiteConfig(Header);
