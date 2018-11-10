import { Component } from 'react';
import { enableBodyScroll, disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export default class BodyScrollLock extends Component {
  componentDidMount() {
    this.updateLock();
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.on !== this.props.on) {
      this.updateLock();
    }
  }

  updateLock() {
    if (this.props.on) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }

  render() {
    return null;
  }
}
