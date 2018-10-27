import React, { Component, createContext } from "react";

const Context = createContext();

class DehydrationProvider extends Component {
  initialState = {};

  addToInitialState = ({ key, props }) => (this.initialState[key] = props);

  getInitialState = () => this.initialState;

  render() {
    const { Provider } = Context;
    const { children } = this.props;

    return (
      <Provider
        value={{
          addToInitialState: this.addToInitialState,
          getInitialState: this.getInitialState
        }}
      >
        {children}
      </Provider>
    );
  }
}

export default DehydrationProvider;

export const withDehydration = WrappedComponent => props => {
  const { Consumer } = Context;

  return (
    <Consumer>
      {({ addToInitialState, getInitialState }) => (
        <WrappedComponent
          {...props}
          addToInitialState={addToInitialState}
          getInitialState={getInitialState}
        />
      )}
    </Consumer>
  );
};
