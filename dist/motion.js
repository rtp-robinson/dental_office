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
        { opacity: 0.35, transform: 'translateY(22px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 650, delay: Math.min(index * 65, 195), easing: 'cubic-bezier(.2,.7,.2,1)' });
      running.add(animation);
      animation.finished.catch(() => {}).finally(() => running.delete(animation));
    });
  }, { threshold: 0.12 });

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
