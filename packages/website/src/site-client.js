import rehydrate from './components/utils/rehydrate';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TableOfContents from './components/table-of-contents/TableOfContents';
import FloatingHamburgerButton from './components/table-of-contents/FloatingHamburgerButton';
import TouchSpy from './components/utils/TouchSpy';

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
