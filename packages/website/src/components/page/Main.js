import React from 'react';
import WidthLimiter from '../utils/WidthLimiter';
import styled from 'styled-components';
import { withTableOfContents } from '../table-of-contents/TableOfContentsProvider';
import dehydrate from '../utils/dehydrate';
import TableOfContents from '../table-of-contents/TableOfContents';
import { withSiteConfig } from '../utils/SiteConfigProvider';

const DehydratedTableOfContents = dehydrate('table-of-contents')(TableOfContents);

const TableOfContentsContainer = styled(
  withTableOfContents(withSiteConfig(DehydratedTableOfContents))
)`
  display: flex;
`;

const MainWidthLimiter = styled(WidthLimiter)`
  display: flex;
  flex-direction: row;
  padding-bottom: 50px;

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
      <Content>{children}</Content>
      <TableOfContentsContainer />
    </MainWidthLimiter>
  </section>
);

const StyledMain = styled(Main)`
  overflow: hidden;
`;

export default StyledMain;
