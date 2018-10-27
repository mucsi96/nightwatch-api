import React from "react";
import styled from "styled-components";
import WidthLimiter from "./WidthLimiter";
import { withSiteConfig } from "./SiteConfigProvider";
import HomeIcon from "../images/nightwatch-api-logo.svg";
import HeaderNavigation from "./HeaderNavigation";
import HamburgerButton from "./HamburgerButton";
import dehydrate from "./dehydrate";

const DehydratedHamburgerButton = dehydrate("hamburger-button")(
  HamburgerButton
);
const StyledDehydratedHamburgerButton = styled(DehydratedHamburgerButton)`
  @media (min-width: 720px) {
    display: none;
  }
`;

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
  left: var(--horizontal-padding);
  bottom: -2px;
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

  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  line-height: var(--header-height);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  @media (min-width: 720px) {
    z-index: 2;
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

    @media (min-width: 720px) {
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
      <StyledDehydratedHamburgerButton />
    </HeaderWidthLimiter>
  </StyledHeader>
);

export default withSiteConfig(Header);
