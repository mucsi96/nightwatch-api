import React from 'react';
import { withSiteConfig } from '../utils/SiteConfigProvider';
import openGraphImg from '../../images/opengraph.png';

const Head = ({ title, description, url }) => (
  <head>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={openGraphImg} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:description" content={description} />
    <meta name="theme-color" content="#7ac35f" />
  </head>
);

export default withSiteConfig(Head);
