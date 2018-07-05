import React from 'react';
import styled from 'styled-components';

const Menu = styled(({ children, className }) => (
  <nav className={className} aria-label="Main">
    {children}
  </nav>
))`
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

export default Menu;
