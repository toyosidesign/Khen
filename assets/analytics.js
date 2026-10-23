// Khen site analytics: Microsoft Clarity for every visitor (no banner).
// No consent signal is sent, so Clarity applies its own no-consent handling
// for UK/EEA/Swiss visitors. Empty the ID below to switch analytics off.
(() => {
  const CLARITY_ID = 'z2d68ejzkg';
  if (!CLARITY_ID) return;

  let loaded = false;
  const load = () => {
    if (loaded) return;
    loaded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
    window.clarity('set', 'page', document.title);
  };

  // ---- Key actions, so recordings can be filtered by what visitors did ----
  const event = (name, tag) => {
    if (!loaded || typeof window.clarity !== 'function') return;
    if (tag) window.clarity('set', tag[0], tag[1]);
    window.clarity('event', name);
  };
  const text = (el) => (el.textContent || '').replace(/\s+/g, ' ').trim();
  document.addEventListener('click', (e) => {
    const el = e.target.closest('a, button');
    if (!el) return;
    const href = el.getAttribute('href') || '';
    if (el.matches('.pcard[href*="preview.html"]')) {
      const name = text(el.querySelector('.pcard-title') || el);
      event('Template preview opened', ['template', name]);
    } else if (el.matches('.pcard')) {
      event('Project opened', ['project', text(el.querySelector('.pcard-title') || el)]);
    } else if (/#contact$/.test(href)) {
      event('Contact clicked', ['contact_source', text(el)]);
    } else if (el.id === 'demoBtn') {
      event('Book a demo clicked');
    } else if (el.matches('#devices button')) {
      event('Preview device switched', ['preview_device', el.dataset.w]);
    } else if (el.matches('[data-filters] .pill-btn')) {
      event('Template filter used', ['filter', el.dataset.filter]);
    } else if (el.matches('.compare-switch button')) {
      event('Before/after switched', ['compare_view', el.dataset.view]);
    } else if (/^mailto:/.test(href)) {
      event('Email clicked');
    }
  }, true);
  document.addEventListener('submit', (e) => {
    if (e.target.closest('#contact')) event('Contact form submitted');
  }, true);

  load();
})();
