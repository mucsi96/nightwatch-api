import React from 'react';

// Global site tag (gtag.js) - Google Analytics
const Analytics = () => (
  <>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-51256585-3" />
    <script
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-51256585-3');`
      }}
    />
  </>
);

export default Analytics;
