/* ============================================================
   HITL·Work for FE — script.js
   Scope: mobile nav toggle + nav scroll behavior
   ============================================================ */

(function () {
  'use strict';

  const nav       = document.getElementById('global-nav');
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');

  /* --- MOBILE NAV TOGGLE --- */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close nav on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });
  }

  /* --- NAV SCROLL SHADOW --- */
  if (nav) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var current = window.scrollY;
      // Subtle opacity shift on scroll — nav stays fixed
      if (current > 10) {
        nav.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
      } else {
        nav.style.borderBottom = 'none';
      }
      lastScroll = current;
    }, { passive: true });
  }

  /* --- SCROLL REVEAL --- */
  // Simple intersection observer — tiles fade up on enter
  var tiles = document.querySelectorAll('.tile');

  if ('IntersectionObserver' in window) {
    // Only animate if user hasn't requested reduced motion
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
      tiles.forEach(function (tile) {
        tile.style.opacity = '0';
        tile.style.transform = 'translateY(24px)';
        tile.style.transition = 'opacity 500ms ease, transform 500ms ease';
      });

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });

      tiles.forEach(function (tile) {
        observer.observe(tile);
      });
    }
  }

})();
