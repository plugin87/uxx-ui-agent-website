/* Google Analytics 4.
   Loaded only when the visitor has not asked not to be tracked, so the page
   respects Do Not Track and Global Privacy Control rather than ignoring them. */
(function () {
  var MEASUREMENT_ID = 'G-0MNLT1TD99';

  var optedOut =
    navigator.doNotTrack === '1' ||
    window.doNotTrack === '1' ||
    navigator.msDoNotTrack === '1' ||
    navigator.globalPrivacyControl === true;

  if (optedOut) return;
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID, {
    // the page is one host under designlazyyy.com, so the cookie is scoped to
    // the parent and a visitor crossing between them stays one session
    cookie_domain: '.designlazyyy.com',
    anonymize_ip: true
  });
})();
