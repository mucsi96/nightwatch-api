import React from 'react';
import styled from 'styled-components';
import Menu from './Menu';
import WidthLimiter from './WidthLimiter';

const Header = styled(({ renderHomeLink, renderMenu, className }) => (
  <header className={className}>
    <WidthLimiter>
      {renderHomeLink()}
      <Menu>{renderMenu()}</Menu>
    </WidthLimiter>
  </header>
))`
  --spacing: 20px;
  --home-logo-size: 23px;

  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  line-height: var(--header-height);

  @media (min-width: 1280px) {
    font-size: 18px;
  }

  > div {
    display: flex;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .home {
    display: flex;
    align-items: center;
    margin-right: calc(var(--spacing) / 2);
  }

  .home svg {
    width: var(--home-logo-size);
    height: var(--home-logo-size);
    margin-right: calc(var(--spacing) / 2);
  }
`;

export default Header;
