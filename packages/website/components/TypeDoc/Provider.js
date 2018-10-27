import React, { createContext } from 'react';

const Context = createContext();

const TypedocProvider = ({ typedoc, children }) => (
  <Context.Provider value={typedoc}>{children}</Context.Provider>
);

export const withTypedoc = WrappedComponent => ({ props }) => (
  <Context.Consumer>
    {typedoc => <WrappedComponent {...props} typedoc={typedoc} />}
  </Context.Consumer>
);

export default TypedocProvider;
