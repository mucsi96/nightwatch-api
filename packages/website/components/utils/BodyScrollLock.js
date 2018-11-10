import { Component } from 'react';

const runningInBrowser = typeof document !== 'undefined';
const scrollbarWidth = runningInBrowser && window.innerWidth - document.body.clientWidth;

export default class BodyScrollLock extends Component {
  componentWillMount() {
    this.updateLock();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.on !== this.props.on) {
      this.updateLock();
    }
  }

  updateLock() {
    if (!scrollbarWidth) {
      return;
    }

    if (this.props.on) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = 'initial';
      document.body.style.overflow = 'initial';
    }
  }

  render() {
    return null;
  }
}
