import React from 'react';
import styled, { css } from 'styled-components';
import TableOfContentsNode from './TableOfContentsNode';
import MostVisibleSectionTracker from './MostVisibleSectionTracker';
import TableOfContentNavigation from './TableOfContentNavigation';

const Separator = styled('div')`
  display: block;
  border-bottom: 1px solid #7ac35f;
  margin: 20px 20px 20px 0;

  @media (min-width: 720px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  margin-top: var(--header-height);

  @media (min-width: 720px) {
    margin-left: var(--sidebar-gutter);
    width: var(--sidebar-width);
  }
`;

const Navigation = styled.nav`
  box-sizing: border-box;
  margin-right: -999px;
  padding: 10px 999px 10px 20px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  height: calc(100vh - var(--header-height));
  position: fixed;
  z-index: 1;
  overflow-y: auto;
  right: 0;
  left: 20%;
  transition: transform var(--animation-duration) ease;
  transform: translateX(100%);
  line-height: initial;

  @media (min-width: 720px) {
    background-color: transparent;
    box-shadow: none;
    right: initial;
    left: initial;
    transform: none;
    font-size: 13px;
  }

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

  ${({ show }) =>
    show &&
    css`
      transform: none;
    `};

  ol,
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0;
    padding: 0;
  }

  li a {
    color: #737373;
    text-decoration: none;
    display: block;
    padding: 10px;

    @media (min-width: 720px) {
      padding: 5px 10px;
    }

    :hover {
      background-color: #f1ffe6;
    }
  }

  > ol > li > ol > li a {
    padding-left: 25px;
  }
`;

const TableOfContents = ({ onClick, show, tableOfContentsItems: items, github }) => (
  <Wrapper>
    <Navigation aria-label="Secondary" show={show} onClick={onClick}>
      <TableOfContentNavigation github={github} />
      <Separator />
      <MostVisibleSectionTracker>
        {({ mostVisibleSectionId }) => (
          <TableOfContentsNode level={0} activeItemId={mostVisibleSectionId}>
            {items}
          </TableOfContentsNode>
        )}
      </MostVisibleSectionTracker>
    </Navigation>
  </Wrapper>
);

export default TableOfContents;
