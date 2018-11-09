import { Component } from 'react';

export default class MostVisibleSectionTracker extends Component {
  state = {
    mostVisibleSectionId: null
  };

  createScrollCache() {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrollCache = Array.prototype.map.call(document.querySelectorAll('h2[id]'), function(
      element
    ) {
      return {
        id: element.id,
        top: scrollTop + element.getBoundingClientRect().top
      };
    });

    this.scrollCache.sort(function(elemA, elemB) {
      return elemA.top - elemB.top;
    });

    this.scrollCache = this.scrollCache.map(function(item, index, items) {
      if (index === items.length - 1)
        return { ...item, bottom: document.documentElement.scrollHeight };
      return { ...item, bottom: items[index + 1].top - 1 };
    });
  }

  selectVisibleSection() {
    if (!this.scrollCache.length) {
      return null;
    }

    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const visibleArea = {
      top: scrollTop + window.innerHeight * 0.15,
      bottom: scrollTop + window.innerHeight * 0.65
    };
    const mostIntersectingSection = this.scrollCache.reduce((best, section) => {
      const intersection =
        Math.min(section.bottom, visibleArea.bottom) - Math.max(section.top, visibleArea.top);

      if (!best || intersection > best.intersection) {
        return { ...section, intersection };
      }

      return best;
    }, null);

    this.setState({ mostVisibleSectionId: mostIntersectingSection.id });
  }

  handleScroll = () => {
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }

    this.scrollTimer = setTimeout(() => this.selectVisibleSection(), 10);
  };

  handleResize = () => {
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }

    this.resizeTimer = setTimeout(() => {
      this.createScrollCache();
      this.selectVisibleSection();
    }, 10);
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    this.createScrollCache();
    this.selectVisibleSection();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { children } = this.props;
    const { mostVisibleSectionId } = this.state;

    return children({ mostVisibleSectionId });
  }
}
