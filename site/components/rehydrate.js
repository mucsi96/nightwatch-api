import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const rehydrate = key => WrappedComponent =>
  class RehydratedComponent extends Component {
    componentWillMount() {
      document.querySelector(`[data-react-rehydrate-key="${key}"]`).innerHTML = '';
    }

    render() {
      return createPortal(
        <WrappedComponent {...window.__REHYDRATION_INITIAL_STATE__[key]} {...this.props} />,
        document.querySelector(`[data-react-rehydrate-key="${key}"]`)
      );
    }
  };

export default rehydrate;
