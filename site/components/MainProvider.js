import React, { createContext } from 'react';

const Context = createContext();

const MainProvider = ({ children, ...props }) => (
  <Context.Provider value={props}>{children}</Context.Provider>
);

export const withMainContext = WrappedComponent => props => {
  const { Consumer } = Context;

  return <Consumer>{context => <WrappedComponent {...props} {...context} />}</Consumer>;
};

export default MainProvider;
