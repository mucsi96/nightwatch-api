import React, { createRef, Component } from 'react';
import styled, { css } from 'styled-components';
import TableOfContentsNode from './TableOfContentsNode';
import MostVisibleSectionTracker from '../utils/MostVisibleSectionTracker';
import HomeLink from './HomeLink';
import ScrollLock from 'react-scrolllock';
import theme from '../../theme';
import SearchField from './SearchField';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: grid;
  gap: 15px;
  grid-template-rows: auto auto 1fr;
  padding: 20px;
  transition: transform ${theme.animation};
  transform: translateX(100%);
  background-color: ${theme.secondaryColor};
  box-sizing: border-box;
  height: 100vh;

  @media (min-width: 780px) {
    padding-top: 60px;
    position: sticky;
    box-shadow: none;
    transform: none;
    font-size: 13px;
  }

  @media (min-width: 2000px) {
  }

  ${({ show }) =>
    show &&
    css`
      transform: none;
    `};
`;

const Navigation = styled.nav`
  flex: 1;
  overflow-y: auto;
  line-height: initial;

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
    padding-left: 40px;
  }
`;

class TableOfContents extends Component {
  navigationRef = createRef();

  render() {
    const { title, path, onClick, show, tableOfContentsItems: items } = this.props;
    return (
      <Wrapper show={show}>
        {show && <ScrollLock touchScrollTarget={this.navigationRef.current} />}
        <HomeLink title={title} />
        <SearchField />
        <Navigation onClick={onClick} ref={this.navigationRef}>
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
