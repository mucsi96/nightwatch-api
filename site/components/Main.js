import React from 'react';
import WidthLimiter from './WidthLimiter';
import styled from 'styled-components';
import { withTableOfContents } from '../components/TableOfContentsProvider';
import dehydrate from '../components/dehydrate';
import TableOfContents from '../components/TableOfContents';

const TableOfContentsContainer = withTableOfContents(
  dehydrate('table-of-contents')(TableOfContents)
);

const Main = styled(({ children, className }) => (
  <section className={className}>
    <WidthLimiter>
      <TableOfContentsContainer />
      <main>{children}</main>
    </WidthLimiter>
  </section>
))`
  > div {
    margin-top: var(--header-height);
    display: flex;
    padding-bottom: 50px;
    min-height: calc(100vh - var(--header-height));

    @media (min-width: 2000px) {
      max-width: calc(840px + 2 * var(--horizontal-padding));
    }
  }

  > div > div {
    order: 1;
    flex: 0 0 var(--sidebar-width);
  }

  main {
    line-height: 1.7;
    flex: 1 1 auto;

    @media (min-width: 980px) {
      font-size: 17px;
    }
  }
`;

export default Main;
