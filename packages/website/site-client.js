import rehydrate from './components/utils/rehydrate';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TableOfContents from './components/toc/TableOfContents';
// import HamburgerButton from './components/header/HamburgerButton';

const RehydratedTableOfContents = rehydrate('table-of-contents')(TableOfContents);
// const RehydratedHamburgerButton = rehydrate('hamburger-button')(HamburgerButton);

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
        {/* <RehydratedHamburgerButton
          active={showSmallScreenNavigation}
          onClick={this.handleHamburgerButtonClick}
        /> */}
        <RehydratedTableOfContents
          show={showSmallScreenNavigation}
          onClick={this.handleTableOfContentsClick}
        />
      </>
    );
  }
}

render(<App />, document.getElementById('app'));
