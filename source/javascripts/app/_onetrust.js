(function () {
  'use strict';

  const host = window.location.host;

  if (host === 'getcheddar.com') {
    // load onetrust head script
    loadHeadScript();
  }

  function loadHeadScript() {
    const oneTrustScript = document.createElement('script');
    oneTrustScript.src = 'https://optanon.blob.core.windows.net/consent/6401fc2e-2783-41bd-8669-431a4f3ae1d1.js?v=2.2';
    oneTrustScript.type = 'text/javascript';
    oneTrustScript.charset = 'UTF-8';
    document.head.appendChild(oneTrustScript);

    const OptWrapper = document.createElement('script');
    OptWrapper.createTextNode = 'function OptanonWrapper() {}';
    OptWrapper.type = 'text/javascript';
    document.head.appendChild(OptWrapper);
  }
})();
