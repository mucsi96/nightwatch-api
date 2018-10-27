import React, { createContext } from "react";
import siteConfig from "../site-config.json";

export const withSiteConfig = WrappedComponent => props => {
  return <WrappedComponent {...props} {...siteConfig} />;
};
