import rehydrate from './components/utils/rehydrate';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TableOfContents from './components/table-of-contents/TableOfContents';
import FloatingHamburgerButton from './components/table-of-contents/FloatingHamburgerButton';
import TouchSpy from './components/utils/TouchSpy';
import docsearch from 'docsearch.js';

import 'docsearch.js/dist/cdn/docsearch.min.css';

const RehydratedTableOfContents = rehydrate('table-of-contents')(TableOfContents);

class App extends Component {
  state = {
    showSmallScreenNavigation: false
  };

  handleHamburgerButtonClick = () => {
    this.setState(({ showSmallScreenNavigation }) => ({
      showSmallScreenNavigation: !showSmallScreenNavigation
    }));
  };

  handleTableOfContentsClick = ({ target: { tagName } }) => {
    if (tagName === 'A') {
      this.setState({
        showSmallScreenNavigation: false
      });
    }
  };

  componentDidMount() {
    docsearch({
      apiKey: '1d35d6cc360f65e40724c542ec522307',
      indexName: 'nightwatch-api',
      inputSelector: '#search-field',
      debug: false // Set debug to true if you want to inspect the dropdown
    });
  }

  render() {
    const { showSmallScreenNavigation } = this.state;

    return (
      <>
        <TouchSpy />
        <FloatingHamburgerButton
          active={showSmallScreenNavigation}
          onClick={this.handleHamburgerButtonClick}
        />
        <RehydratedTableOfContents
          show={showSmallScreenNavigation}
          onClick={this.handleTableOfContentsClick}
        />
      </>
    );
  }
}

render(<App />, document.getElementById('app'));
