import { Component } from 'react';
import { enableBodyScroll, disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const runningInBrowser = typeof document !== 'undefined';
const scrollbarWidth = runningInBrowser && window.innerWidth - document.body.clientWidth;

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
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      enableBodyScroll();
      document.body.style.paddingRight = 'initial';
    }
  }

  render() {
    return null;
  }
}
