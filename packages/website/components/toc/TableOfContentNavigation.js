import React from 'react';
import styled from 'styled-components';

const List = styled('ul')`
  @media (min-width: 720px) {
    display: none;
  }
`;

const TableOfContentNavigation = ({ className, github }) => (
  <List className={className}>
    <li>
      <a href="/">Intro</a>
    </li>
    <li>
      <a href="/api">API</a>
    </li>
    <li>
      <a href={github}>Github</a>
    </li>
  </List>
);

export default TableOfContentNavigation;
