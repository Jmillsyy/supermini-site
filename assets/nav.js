// Mobile nav toggle
document.addEventListener('click', function (e) {
  if (e.target.closest('.menu-btn')) {
    var ul = document.querySelector('nav.main ul');
    if (ul) ul.classList.toggle('open');
  }
});

// Header shadow once scrolled
(function () {
  var header = document.querySelector('header.site');
  if (!header) return;
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Scroll-reveal: fade/slide content in as it enters the viewport
(function () {
  var SELECTOR = '.section-head, .card, .round, .driver, .pillar, .step, .spec, .circuit-card, .grid-2 > div, .next-race, .article-body, .article-img';
  var els = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));
  if (!els.length) return;

  // No IntersectionObserver (or reduced motion): show everything, skip animation
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  els.forEach(function (el) { el.classList.add('reveal'); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  els.forEach(function (el) { io.observe(el); });
})();
