import React from 'react';
import styled from 'styled-components';
import DehydrationProvider from '../utils/DehydrationProvider';
import dehydrate from '../utils/dehydrate';
import RehydrationInitialState from '../utils/RehydrationInitialState';
import Footer from '../footer/Footer';
import Body from './Body';
import TableOfContentsProvider, {
  withTableOfContents
} from '../table-of-contents/TableOfContentsProvider';
import Head from './Head';
import SiteContent from '../../pages';
import TableOfContents from '../table-of-contents/TableOfContents';
import { withSiteConfig } from '../utils/SiteConfigProvider';
import theme from '../../theme';

const Main = styled.main`
  line-height: 1.7;
  grid-area: main;

  @media (min-width: 980px) {
    font-size: 17px;
  }
`;

const DehydratedTableOfContents = dehydrate('table-of-contents')(TableOfContents);

const TableOfContentsContainer = styled(
  withTableOfContents(withSiteConfig(DehydratedTableOfContents))
)`
  grid-area: toc;
`;

const Site = () => (
  <html lang="en">
    <Head />
    <Body>
      <DehydrationProvider>
        <TableOfContentsProvider>
          <Main>
            <SiteContent />
          </Main>
          <TableOfContentsContainer />
          <Footer />
          <RehydrationInitialState />
          <div id="app" />
          <script async defer src="/site-client.js" />
        </TableOfContentsProvider>
      </DehydrationProvider>
    </Body>
  </html>
);

export default Site;
