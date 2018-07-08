import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import WidthLimiter from './WidthLimiter';
import { withSiteConfig } from './SiteConfigProvider';
import HomeIcon from '../images/nightwatch-api-logo.svg';
import HamburgerButton from './HamburgerButton';
import HeaderNavigation from './HeaderNavigation';
import TableOfContents from '../components/TableOfContents';

const StyledHamburgerButton = styled(HamburgerButton)`
  @media (min-width: 600px) {
    display: none;
  }
`;

const StyledTableOfContents = styled(TableOfContents)`
  display: none;
  padding: 0;
  margin: 0;
  border: none;
  position: initial;
  height: initial;
  background: transparent;

  ol {
    display: flex;
    flex-direction: column;
  }

  ${({ show }) =>
    show &&
    css`
      display: initial;
    `};
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
  bottom: -3px;
  left: var(--horizontal-padding);
`;

const HeaderWidthLimiter = styled(WidthLimiter)`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  height: 100%;

  ${({ open }) =>
    open &&
    css`
      align-items: initial;
    `} @media (min-width: 600px) {
    justify-content: normal;
  }
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
  height: calc(var(--header-height) - var(--bottom-border));
  border-bottom: var(--bottom-border) solid #512d14;
  transition: height 1s ease;

  ${({ open }) =>
    open &&
    css`
      --header-height: 100vh;
    `} @media (min-width: 1280px) {
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

    ${({ open }) =>
      open &&
      css`
        display: initial;
      `} @media (min-width: 600px) {
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

    ${({ open }) =>
      open &&
      css`
        flex-direction: column;
      `};
  }

  li {
    display: flex;
    align-items: center;
    padding: 0 calc(var(--spacing) / 2);
  }
`;

class Header extends Component {
  state = {
    open: false
  };

  handleButtonClick = () => {
    this.setState(({ open }) => ({
      open: !open
    }));
  };

  render() {
    const { title, tableOfContentsItems } = this.props;
    const { open } = this.state;
    return (
      <StyledHeader open={open}>
        <HeaderWidthLimiter open={open} onClick={open && this.handleButtonClick}>
          <HomeLink href="/">
            <StyledHomeIcon />
            <span>{title}</span>
          </HomeLink>
          <StyledTableOfContents tableOfContentsItems={tableOfContentsItems} show={open} />
          <HeaderNavigation />
          <StyledHamburgerButton active={open} onClick={this.handleButtonClick} />
        </HeaderWidthLimiter>
      </StyledHeader>
    );
  }
}

export default withSiteConfig(Header);
