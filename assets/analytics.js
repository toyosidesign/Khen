// Khen site analytics: Microsoft Clarity behind a consent banner.
// Paste the Clarity project ID below to switch it on; while it is empty,
// nothing loads and no banner is shown.
(() => {
  const CLARITY_ID = 'z2d68ejzkg';
  if (!CLARITY_ID) return;

  const KEY = 'khen-analytics-consent'; // 'yes' | 'no'
  const read = () => { try { return localStorage.getItem(KEY); } catch (_) { return null; } };
  const save = (v) => { try { localStorage.setItem(KEY, v); } catch (_) {} };

  let loaded = false;
  const load = () => {
    if (loaded) return;
    loaded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
    window.clarity('consent');
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

  // ---- Consent ----
  const choice = read();
  if (choice === 'yes') { load(); return; }
  if (choice === 'no') return;

  const css = `
.kc-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:60;max-width:560px;margin:0 auto;background:#171717;color:#F5F2EB;border-radius:18px;padding:18px 20px;display:flex;gap:16px;align-items:center;flex-wrap:wrap;box-shadow:0 18px 40px -12px rgba(0,0,0,.45);font:14px/1.5 Poppins,Inter,system-ui,sans-serif}
.kc-banner p{margin:0;flex:1 1 260px}
.kc-actions{display:flex;gap:8px;margin-left:auto}
.kc-banner button{font:inherit;font-weight:600;border-radius:999px;padding:9px 18px;cursor:pointer;border:1.5px solid #F5F2EB;background:transparent;color:#F5F2EB}
.kc-banner button.kc-yes{background:#7777F7;border-color:#7777F7}
.kc-banner button:focus-visible{outline:3px solid #B9B9FB;outline-offset:2px}`;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  const bar = document.createElement('div');
  bar.className = 'kc-banner';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Cookie consent');
  bar.innerHTML = '<p>We use cookies to understand how visitors use this site, so we can make it better.</p>'
    + '<div class="kc-actions"><button type="button" class="kc-no">Decline</button><button type="button" class="kc-yes">Accept</button></div>';
  const close = (v) => { save(v); bar.remove(); if (v === 'yes') load(); };
  bar.querySelector('.kc-yes').addEventListener('click', () => close('yes'));
  bar.querySelector('.kc-no').addEventListener('click', () => close('no'));
  const show = () => document.body.appendChild(bar);
  if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
})();
