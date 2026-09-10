/* Live GitHub star count.

   Fetches on every load and keeps polling while the tab is visible, so the
   number on the page is the number on the repo. localStorage is only used to
   paint something instantly on a cold load, never to skip the fetch. */
(function () {
  var REPO = 'plugin87/ux-ui-agent-skills';
  var KEY = 'gh-stars:' + REPO;
  var POLL_MS = 120000;      // 30 calls/hour, well inside the unauthenticated limit
  var current = null;

  function format(n) {
    if (n >= 10000) return (n / 1000).toFixed(0) + 'k';
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return String(n);
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function setText(n) {
    var nodes = document.querySelectorAll('[data-star-count]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = format(n);
      nodes[i].setAttribute('title', n.toLocaleString('en-US') + ' stars on GitHub');
    }
  }

  function bump() {
    var nodes = document.querySelectorAll('[data-star-count]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].classList.remove('stars--bumped');
      // force a reflow so the class re-triggers on a repeat change
      void nodes[i].offsetWidth;
      nodes[i].classList.add('stars--bumped');
    }
  }

  /* A first paint just sets the number. A later change rolls from the old
     value to the new one so the reader sees that it moved, and which way. */
  function paint(n, animate) {
    if (!animate || reduced.matches || current === null || Math.abs(n - current) > 50) {
      setText(n);
      if (animate && !reduced.matches) bump();
      return;
    }
    var from = current;
    var started = null;
    var dur = 600;
    function frame(now) {
      if (!started) started = now;
      var p = Math.min((now - started) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      setText(Math.round(from + (n - from) * eased));
      if (p < 1) requestAnimationFrame(frame);
      else { setText(n); bump(); }
    }
    requestAnimationFrame(frame);
  }

  // instant paint from the last known value, then correct it from the network
  try {
    var cached = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (cached && typeof cached.n === 'number') { current = cached.n; paint(cached.n, false); }
  } catch (e) { /* storage unavailable */ }

  function refresh() {
    fetch('https://api.github.com/repos/' + REPO, { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || typeof d.stargazers_count !== 'number') return;
        var n = d.stargazers_count;
        if (n === current) return;
        paint(n, current !== null);
        current = n;
        try { localStorage.setItem(KEY, JSON.stringify({ n: n, t: Date.now() })); }
        catch (e) { /* storage unavailable */ }
      })
      .catch(function () { /* keep whatever is on screen */ });
  }

  refresh();
  var timer = setInterval(function () {
    if (document.visibilityState === 'visible') refresh();
  }, POLL_MS);

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') refresh();
  });

  window.addEventListener('pagehide', function () { clearInterval(timer); });
})();
