import React, { Component, createContext } from 'react';
import styled from 'styled-components';
import { Context } from './TableOfContentsProvider';
import TableOfContentsNode from './TableOfContentsNode';

const TableOfContents = styled(({ maxLevel, className }) => {
  const { Consumer } = Context;
  return (
    <Consumer>
      {({ getItems }) => (
        <TableOfContentsNode level={0} className={className}>
          {getItems().filter(({ level }) => level <= maxLevel)}
        </TableOfContentsNode>
      )}
    </Consumer>
  );
})`
  box-sizing: border-box;

  > li > ul > li a {
    padding-left: 25px;
  }

  li {
    list-style: none;
    padding-left: 0;
  }

  li a {
    color: #777;
    font-size: 90%;
    padding: 5px 10px;
    text-decoration: none;
    display: block;
  }

  li a:hover {
    background-color: #f1ffe6;
  }

  li a.active {
    border-left: 3px solid #38932c;
    font-weight: 700;
  }

  ul {
    padding-left: 0;
  }
`;

export default TableOfContents;
