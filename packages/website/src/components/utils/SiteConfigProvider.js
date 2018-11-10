import React, { createContext } from 'react';

const Context = createContext();

const SiteConfigProvider = ({ children, ...siteConfig }) => (
  <Context.Provider value={siteConfig}>{children}</Context.Provider>
);

export const withSiteConfig = WrappedComponent => props => (
  <Context.Consumer>
    {siteConfig => <WrappedComponent {...siteConfig} {...props} />}
  </Context.Consumer>
);

export default SiteConfigProvider;
