import React from 'react';
import styled from 'styled-components';
import TableOfContentsNode from './TableOfContentsNode';

const TableOfContents = styled(({ tableOfContentsItems: items, className }) => (
  <nav aria-label="Secondary" className={className}>
    <TableOfContentsNode level={0}>{items}</TableOfContentsNode>
  </nav>
))`
  box-sizing: border-box;
  margin-right: -999px;
  padding: 10px 999px 10px 20px;
  background-color: lightgoldenrodyellow;
  border-left: 1px solid yellow;
  height: calc(100vh - var(--header-height));
  position: fixed;
  z-index: 1;
  overflow-y: auto;

  @media (min-width: 780px) {
    padding-top: 60px;
  }

  @media (min-width: 1100px) {
    padding-left: 40px;
  }

  @media (min-width: 1280px) {
    padding-top: 70px;
  }

  @media (min-width: 2000px) {
    position: static;
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0;
    padding: 0;
    padding: 4px 0;
  }

  li a {
    text-decoration: none;
    color: inherit;
  }
`;

export default TableOfContents;
