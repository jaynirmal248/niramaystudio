// Lightweight initializer for the card nav (vanilla JS)
// Adds open/close behavior and computes expanded height for mobile
(function () {
  function qs(s, el = document) { return el.querySelector(s); }
  function qsa(s, el = document) { return Array.from(el.querySelectorAll(s)); }

  document.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('global-card-nav');
    if (!nav) return;
    const hamburger = document.getElementById('card-nav-hamburger');
    const content = document.getElementById('card-nav-content');
  // measure the actual top bar height so offsets match CSS on all breakpoints
  const topBarEl = nav.querySelector('.card-nav-top');
  const topBarHeight = topBarEl ? topBarEl.offsetHeight : 60;

    // mark the body so CSS can add a default offset; we also expose a CSS variable for the default
    document.body.classList.add('has-card-nav');
    const defaultOffset = topBarHeight + 24; // small gap under the nav
    document.body.style.setProperty('--card-nav-default-offset', defaultOffset + 'px');

    function calcHeight() {
      if (!content) return 260;
      // temporarily make content visible to measure
      const prevVis = content.style.visibility;
      const prevPointer = content.style.pointerEvents;
      const prevPos = content.style.position;
      const prevHeight = content.style.height;

      content.style.visibility = 'visible';
      content.style.pointerEvents = 'auto';
      content.style.position = 'static';
      content.style.height = 'auto';

      const pad = 16;
      const h = topBarHeight + content.scrollHeight + pad;

      content.style.visibility = prevVis;
      content.style.pointerEvents = prevPointer;
      content.style.position = prevPos;
      content.style.height = prevHeight;

      return h;
    }

    function openNav() {
      const h = calcHeight();
      nav.style.height = h + 'px';
      nav.classList.add('open');
      content.setAttribute('aria-hidden', 'false');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
      // make page content start after the expanded nav
      document.body.style.paddingTop = nav.offsetHeight + 'px';
      // focus first link for accessibility
      const firstLink = content.querySelector('a');
      if (firstLink) firstLink.focus();
    }

    function closeNav() {
      nav.style.height = topBarHeight + 'px';
      nav.classList.remove('open');
      content.setAttribute('aria-hidden', 'true');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      // restore default offset (fall back to CSS var)
      document.body.style.paddingTop = '';
      hamburger.focus();
    }

    function toggleNav() {
      if (!nav.classList.contains('open')) openNav(); else closeNav();
    }

    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.addEventListener('click', toggleNav);
    }
    hamburger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleNav();
      }
    });

    window.addEventListener('resize', function () {
      if (nav.classList.contains('open')) {
        nav.style.height = calcHeight() + 'px';
      }
    });

    // close when clicking outside
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('open')) return;
      if (!nav.contains(e.target)) closeNav();
    });

    // close on Escape for accessibility
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        e.preventDefault();
        closeNav();
      }
    });

    // initialize closed state
    nav.style.height = topBarHeight + 'px';
    content.setAttribute('aria-hidden', 'true');
    if (hamburger && !hamburger.hasAttribute('aria-label')) {
      hamburger.setAttribute('aria-label', 'Open menu');
    }
  });
})();
