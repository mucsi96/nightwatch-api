import { Component } from 'react';

export default class TouchSpy extends Component {
  isTouch = false;
  classAdded = false;

  addNoTouchEvents() {
    if (this.classAdded) {
      return;
    }

    document.documentElement.classList.add('no-touchevents');
  }

  removeNoTouchEvents() {
    if (!this.classAdded) {
      return;
    }

    document.documentElement.classList.remove('no-touchevents');
  }

  onTimeout = () => {
    this.isTouch = false;
    this.removeNoTouchEvents();
  };

  onTouchStart = () => {
    clearTimeout(this.timer);
    this.isTouch = true;
    this.timer = setTimeout(this.onTimeout, 500);
  };

  onMouseOver = () => {
    if (!this.isTouch) {
      this.isTouch = false;
      this.addNoTouchEvents();
    }
  };

  componentDidMount() {
    document.addEventListener('touchstart', this.onTouchStart, false);
    document.addEventListener('mouseover', this.onMouseOver, false);
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.onTouchStart, false);
    document.removeEventListener('mouseover', this.onMouseOver, false);
  }

  render() {
    return null;
  }
}
