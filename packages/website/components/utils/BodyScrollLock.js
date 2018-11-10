import { Component } from 'react';
import { enableBodyScroll, disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const runningInBrowser = typeof document !== 'undefined';

export default class BodyScrollLock extends Component {
  originalPadding = (runningInBrowser && parseInt(document.body.paddingRight)) || 0;

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
    if (!runningInBrowser) {
      return;
    }

    if (this.props.on) {
      disableBodyScroll(document.body);
      document.body.style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`;
    } else {
      document.body.style.paddingRight = `${this.originalPadding}px`;
      enableBodyScroll(document.body);
    }
  }

  render() {
    return null;
  }
}
