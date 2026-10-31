// Progressive enhancement: content remains visible if animation is unavailable.
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;

  const running = new Set();
  const observer = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
      observer.unobserve(entry.target);
      if (reducedMotion.matches || entry.target.contains(document.activeElement)) return;
      const animation = entry.target.animate([
        { opacity: 0.15, transform: 'translateY(36px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 1300, delay: Math.min(index * 110, 330), easing: 'cubic-bezier(.22,.45,.25,1)', fill: 'backwards' });
      running.add(animation);
      animation.finished.catch(() => {}).finally(() => running.delete(animation));
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.hero h1, .hero-photo, main h2, .values .wrap, .credential, .treatment, .gallery-item, .facade, .creator-inner')
    .forEach(element => observer.observe(element));

  // Stop ongoing effects immediately when the visitor requests less motion.
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) running.forEach(animation => animation.cancel());
  });
  document.addEventListener('focusin', () => {
    running.forEach(animation => {
      if (animation.effect.target.contains(document.activeElement)) animation.cancel();
    });
  });
})();
