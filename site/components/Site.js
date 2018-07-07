import React from 'react';
import DehydrationProvider from '../components/DehydrationProvider';
import RehydrationInitialState from '../components/RehydrationInitialState';
import Footer from '../components/Footer';
import Body from '../components/Body';
import Main from '../components/Main';
import TableOfContentsProvider from '../components/TableOfContentsProvider';
import Header from '../components/Header';
import FooterNavigation from '../components/FooterNavigation';
import Router from '../components/Router';
import Head from '../components/Head';
import SiteContent from '../pages';
import dehydrate from '../components/dehydrate';

const DehydratedHeader = dehydrate('header')(Header);

const Site = ({ path }) => (
  <Router path={path}>
    <html>
      <Head />
      <Body>
        <DehydrationProvider>
          <TableOfContentsProvider>
            <DehydratedHeader />
            <Main>
              <SiteContent />
            </Main>
            <Footer renderNavigation={() => <FooterNavigation />} />
            <RehydrationInitialState />
            <script async defer src="https://buttons.github.io/buttons.js" />
            <script async defer src="https://platform.twitter.com/widgets.js" />
            <script async defer src="site-client.js" />
          </TableOfContentsProvider>
        </DehydrationProvider>
      </Body>
    </html>
  </Router>
);

export default Site;
