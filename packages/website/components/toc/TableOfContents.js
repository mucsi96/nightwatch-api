import React, { createRef, Component } from 'react';
import styled, { css } from 'styled-components';
import TableOfContentsNode from './TableOfContentsNode';
import MostVisibleSectionTracker from '../utils/MostVisibleSectionTracker';
import HomeLink from './HomeLink';
import ScrollLock from 'react-scrolllock';

const Wrapper = styled.div`
  @media (min-width: 720px) {
    margin-left: var(--sidebar-gutter);
    width: var(--sidebar-width);
  }
`;

const Navigation = styled.nav`
  box-sizing: border-box;
  margin-right: -999px;
  padding: 10px 999px 10px 20px;
  background-color: #f7f7f7;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  height: 100vh;
  position: fixed;
  z-index: 1;
  overflow-y: auto;
  right: 0;
  left: 20%;
  transition: transform var(--animation-duration) ease;
  transform: translateX(100%);
  line-height: initial;

  @media (min-width: 720px) {
    box-shadow: none;
    right: initial;
    left: initial;
    transform: none;
    font-size: 13px;
  }

  @media (min-width: 1100px) {
    padding-left: 40px;
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

  > ol > li > ol > li a {
    padding-left: 25px;
  }
`;

class TableOfContents extends Component {
  navigationRef = createRef();

  render() {
    const { title, path, onClick, show, tableOfContentsItems: items } = this.props;
    return (
      <Wrapper>
        {show && <ScrollLock touchScrollTarget={this.navigationRef.current} />}
        <Navigation show={show} onClick={onClick} ref={this.navigationRef}>
          <HomeLink title={title} />
          <MostVisibleSectionTracker>
            {({ mostVisibleSectionId }) => (
              <TableOfContentsNode level={0} activeUrls={[path, `#${mostVisibleSectionId}`]}>
                {items}
              </TableOfContentsNode>
            )}
          </MostVisibleSectionTracker>
        </Navigation>
      </Wrapper>
    );
  }
}

export default TableOfContents;
