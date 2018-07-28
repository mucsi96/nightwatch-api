import React, { createContext } from 'react';

const Context = createContext();

const ContributorsProvider = ({ contributors, children }) => (
  <Context.Provider value={contributors}>{children}</Context.Provider>
);

export const withContributors = WrappedComponent => ({ props }) => (
  <Context.Consumer>
    {contributors => <WrappedComponent {...props} contributors={contributors} />}
  </Context.Consumer>
);

export default ContributorsProvider;
