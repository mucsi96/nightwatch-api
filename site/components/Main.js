import React from 'react';
import WidthLimiter from './WidthLimiter';
import styled from 'styled-components';
import { withTableOfContents } from '../components/TableOfContentsProvider';
import dehydrate from '../components/dehydrate';
import TableOfContents from '../components/TableOfContents';

const DehydratedTableOfContents = dehydrate('table-of-contents')(TableOfContents);

const TableOfContentsContainer = styled(withTableOfContents(DehydratedTableOfContents))`
  margin-left: var(--sidebar-gutter);
  flex: 0 0 var(--sidebar-width);
  display: none;

  @media (min-width: 600px) {
    display: initial;
  }
`;

const MainWidthLimiter = styled(WidthLimiter)`
  margin-top: var(--header-height);
  display: flex;
  flex-direction: row-reverse;
  padding-bottom: 50px;
  min-height: calc(100vh - var(--header-height));

  @media (min-width: 2000px) {
    max-width: calc(840px + 2 * var(--horizontal-padding));
  }
`;

const Content = styled.main`
  line-height: 1.7;
  flex: 1 1 auto;

  @media (min-width: 980px) {
    font-size: 17px;
  }
`;

const Main = ({ children, className }) => (
  <section className={className}>
    <MainWidthLimiter>
      <TableOfContentsContainer />
      <Content>{children}</Content>
    </MainWidthLimiter>
  </section>
);

const StyledMain = styled(Main)`
  overflow: hidden;
`;

export default StyledMain;
