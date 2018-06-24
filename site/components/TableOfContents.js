import React from 'react';
import styled from 'styled-components';
import TableOfContentsNode from './TableOfContentsNode';
import omit from 'lodash.omit';

const TableOfContents = styled(
  ({ tableOfContentsItems: items, maxLevel, className, ...restProps }) => (
    <TableOfContentsNode
      level={0}
      className={className}
      {...omit(restProps, ['addTableOfContentsItem'])}
    >
      {items.filter(({ level }) => level <= maxLevel)}
    </TableOfContentsNode>
  )
)`
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
