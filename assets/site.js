// Khen marketing site — shared behaviour. Each block no-ops when its markup
// isn't on the page.

(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollToEl = (el) => el && el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });

  // ---- Mobile nav ----
  const header = document.querySelector('.site-header');
  const toggle = header && header.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    header.querySelectorAll('.nav-links a').forEach((a) => a.addEventListener('click', () => {
      header.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // ---- Before/after compare ----
  const compare = document.querySelector('[data-compare]');
  if (compare) {
    const handle = compare.querySelector('.compare-handle');
    let split = 50;
    let dragging = false;
    const set = (p) => {
      split = Math.max(3, Math.min(97, p));
      compare.style.setProperty('--split', split + '%');
      handle.setAttribute('aria-valuenow', String(Math.round(split)));
    };
    const fromEvent = (e) => {
      const r = compare.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 100);
    };
    compare.addEventListener('pointerdown', (e) => {
      dragging = true;
      try { compare.setPointerCapture(e.pointerId); } catch (_) {}
      fromEvent(e);
    });
    compare.addEventListener('pointermove', (e) => { if (dragging) { e.preventDefault(); fromEvent(e); } });
    const stop = () => { dragging = false; };
    compare.addEventListener('pointerup', stop);
    compare.addEventListener('pointercancel', stop);
    handle.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowLeft' ? -5 : e.key === 'ArrowRight' ? 5 : 0;
      if (d) { e.preventDefault(); set(split + d); }
    });
    set(50);
  }

  // ---- Contact form ----
  const contact = document.getElementById('contact');
  const form = contact && contact.querySelector('form');
  const chips = form ? [...form.querySelectorAll('.chips .pill-btn')] : [];
  const serviceInput = form && form.querySelector('input[name="service"]');
  const selectService = (value) => {
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.value === value)));
    if (serviceInput) serviceInput.value = value || '';
  };
  chips.forEach((chip) => chip.addEventListener('click', () => {
    const on = chip.getAttribute('aria-pressed') === 'true';
    selectService(on ? null : chip.dataset.value);
  }));

  if (form) {
    const sent = contact.querySelector('.sent');
    const error = form.querySelector('.form-error');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const bad = ['name', 'email', 'company']
        .map((n) => form.elements[n])
        .find((el) => !el.value.trim() || !el.checkValidity());
      if (bad) { error.hidden = false; bad.focus(); return; }
      error.hidden = true;
      // No backend yet: wire this to a form/CRM endpoint before launch.
      form.hidden = true;
      sent.hidden = false;
    });
    const again = contact.querySelector('[data-reset]');
    if (again) again.addEventListener('click', () => {
      form.reset();
      selectService(null);
      sent.hidden = true;
      form.hidden = false;
      form.elements.name.focus();
    });
  }

  // "Where are you now?" cards preselect a service and jump to the form.
  document.querySelectorAll('[data-pick]').forEach((card) => card.addEventListener('click', () => {
    if (form && form.hidden) { form.hidden = false; contact.querySelector('.sent').hidden = true; }
    selectService(card.dataset.pick || null);
    scrollToEl(contact);
  }));

  // ---- Projects filter ----
  const filterBar = document.querySelector('[data-filters]');
  if (filterBar) {
    const cards = [...document.querySelectorAll('[data-tags]')];
    const buttons = [...filterBar.querySelectorAll('.pill-btn')];
    buttons.forEach((btn) => {
      const f = btn.dataset.filter;
      const count = f === 'All' ? cards.length : cards.filter((c) => c.dataset.tags.split('|').includes(f)).length;
      const countEl = btn.querySelector('.count');
      if (countEl) countEl.textContent = count;
      // Categories with no projects yet stay hidden until one is added.
      btn.hidden = count === 0;
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        cards.forEach((c) => { c.hidden = f !== 'All' && !c.dataset.tags.split('|').includes(f); });
      });
    });
  }

  // ---- FAQ accordion (one open at a time) ----
  const faqButtons = [...document.querySelectorAll('.faq-q')];
  faqButtons.forEach((btn) => btn.addEventListener('click', () => {
    const wasOpen = btn.getAttribute('aria-expanded') === 'true';
    faqButtons.forEach((b) => {
      const open = b === btn && !wasOpen;
      b.setAttribute('aria-expanded', String(open));
      b.querySelector('.sign').textContent = open ? '−' : '+';
      document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
    });
  }));

  // ---- Project page scroll effects ----
  // [data-expand] bands start inset with rounded corners and open to full
  // width as they scroll into view; [data-parallax] elements drift by their
  // factor; [data-reveal] blocks fade up once.
  const bands = [...document.querySelectorAll('[data-expand]')];
  const drifters = [...document.querySelectorAll('[data-parallax]')];
  if (!reduceMotion && (bands.length || drifters.length)) {
    let raf = null;
    const tick = () => {
      raf = null;
      const vh = innerHeight;
      const maxX = Math.min(48, Math.max(20, innerWidth * 0.04));
      bands.forEach((el) => {
        const p = Math.min(1, Math.max(0, (vh - el.getBoundingClientRect().top) / (vh * 0.85)));
        el.style.clipPath = `inset(0 ${(1 - p) * maxX}px round ${(1 - p) * 24}px)`;
      });
      drifters.forEach((el) => {
        const box = el.parentElement.getBoundingClientRect();
        // Whole pixels keep images crisp while they move.
        el.style.transform = `translate(0,${Math.round((box.top + box.height / 2 - vh / 2) * parseFloat(el.dataset.parallax))}px)`;
      });
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(tick); };
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    tick();
  }

  const reveals = document.querySelectorAll('[data-reveal]');
  if (!reduceMotion && reveals.length && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }), { rootMargin: '0px 0px -12% 0px' });
    reveals.forEach((el) => io.observe(el));
  }
})();
