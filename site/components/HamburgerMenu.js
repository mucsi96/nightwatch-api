import React, { Component } from 'react';
import styled from 'styled-components';
import HamburgerButton from './HamburgerButton';

class HamburgerMenu extends Component {
  state = {
    open: false
  };

  handleButtonClick = () => {
    this.setState(({ open }) => ({
      open: !open
    }));
  };

  render() {
    const { open } = this.state;
    return <HamburgerButton active={open} onClick={this.handleButtonClick} />;
  }
}

export default HamburgerMenu;
