/* Scroll choreography for the sections this landing page adds on top of the
   template. Content is never hidden unless JS is running AND motion is allowed,
   so a reduced-motion visitor and a no-JS visitor both get the full page. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var root = document.documentElement;

  if (reduced.matches) {
    root.classList.add('reveal-off');
    return;
  }

  root.classList.add('reveal-on');

  function stagger(scope) {
    var groups = scope.querySelectorAll('[data-reveal-group]');
    for (var g = 0; g < groups.length; g++) {
      var kids = groups[g].children;
      for (var k = 0; k < kids.length; k++) {
        kids[k].setAttribute('data-reveal', '');
        kids[k].style.setProperty('--reveal-i', String(Math.min(k, 12)));
      }
    }
  }
  stagger(document);

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    var started = null;
    var dur = 1100;
    function frame(now) {
      if (!started) started = now;
      var p = Math.min((now - started) / dur, 1);
      // ease-out cubic, so it lands softly on the real number
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = String(target);
    }
    requestAnimationFrame(frame);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      if (entry.target.hasAttribute('data-count')) countUp(entry.target);
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

  var watched = document.querySelectorAll('[data-reveal], [data-count]');
  for (var i = 0; i < watched.length; i++) io.observe(watched[i]);

  /* Parallax: the marquee rows drift against the scroll so the wall reads as
     depth rather than three flat strips. */
  var wall = document.querySelector('.wall__rows');
  var rows = wall ? wall.querySelectorAll('.wall__row') : [];
  var ticking = false;

  function park() {
    ticking = false;
    if (!wall) return;
    var box = wall.getBoundingClientRect();
    var vh = window.innerHeight || 1;
    if (box.bottom < 0 || box.top > vh) return;
    // -1 .. 1 across the viewport
    var p = (box.top + box.height / 2 - vh / 2) / vh;
    for (var i = 0; i < rows.length; i++) {
      var depth = (i % 2 === 0 ? -1 : 1) * (18 + i * 10);
      rows[i].style.setProperty('--wall-shift', (p * depth).toFixed(2) + 'px');
    }
  }

  if (wall) {
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(park); }
    }, { passive: true });
    park();
  }
})();
