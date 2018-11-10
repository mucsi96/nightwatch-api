import React from 'react';
import DehydrationProvider from '../utils/DehydrationProvider';
import RehydrationInitialState from '../utils/RehydrationInitialState';
import Footer from '../footer/Footer';
import Body from './Body';
import Main from './Main';
import TableOfContentsProvider from '../table-of-contents/TableOfContentsProvider';
import Head from './Head';
import SiteContent from '../../pages';

const Site = () => (
  <html>
    <Head />
    <Body>
      <DehydrationProvider>
        <TableOfContentsProvider>
          <Main>
            <SiteContent />
          </Main>
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
