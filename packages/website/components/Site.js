import React from 'react';
import DehydrationProvider from '../components/DehydrationProvider';
import RehydrationInitialState from '../components/RehydrationInitialState';
import Footer from '../components/Footer';
import Body from '../components/Body';
import Main from '../components/Main';
import TableOfContentsProvider from '../components/TableOfContentsProvider';
import Header from '../components/Header';
import Head from '../components/Head';
import SiteContent from '../pages';

const Site = () => (
  <html>
    <Head />
    <Body>
      <DehydrationProvider>
        <TableOfContentsProvider>
          <Header />
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
