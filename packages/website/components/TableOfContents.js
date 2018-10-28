import React from 'react';
import styled, { css } from 'styled-components';
import TableOfContentsNode from './TableOfContentsNode';
import HeaderNavigation from './HeaderNavigation';

const StyledHeaderNavigation = styled(HeaderNavigation)`
  :after {
    display: block;
    content: ' ';
    margin: 20px 20px 20px 0;
    border-bottom: 1px solid #7ac35f;
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

  ${({ show }) =>
    show &&
    css`
      transform: none;
    `};

  @media (min-width: 720px) {
    box-shadow: none;
    right: initial;
    left: initial;
    transform: none;
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
    padding: 5px 10px;
    text-decoration: none;
    display: block;
    font-size: 13px;

    :hover {
      background-color: #f1ffe6;
    }

    .active {
      border-left: 3px solid #38932c;
      font-weight: 700;
    }
  }

  > ol > li > ol > li a {
    padding-left: 25px;
  }
`;

const TableOfContents = ({ onClick, show, tableOfContentsItems: items }) => (
  <Wrapper>
    <Navigation aria-label="Secondary" show={show} onClick={onClick}>
      {show && <StyledHeaderNavigation />}
      <TableOfContentsNode level={0}>{items}</TableOfContentsNode>
    </Navigation>
  </Wrapper>
);

export default TableOfContents;
