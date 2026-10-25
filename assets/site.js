// Khen marketing site — shared behaviour. Each block no-ops when its markup
// isn't on the page.

(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollToEl = (el) => el && el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });

  // ---- Mobile nav ----
  const header = document.querySelector('.site-header');
  const toggle = header && header.querySelector('.nav-toggle');
  if (toggle) {
    // On phones the header CTA moves into the menu: a copy lives at the end of
    // .nav-links and CSS shows one or the other by breakpoint.
    const cta = header.querySelector('.nav > .nav-cta');
    const links = header.querySelector('.nav-links');
    if (cta && links) {
      const menuCta = cta.cloneNode(true);
      menuCta.classList.add('nav-cta-menu');
      links.appendChild(menuCta);
    }
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
    // Phones: a thin drag handle over two cramped half-screens reads badly, so
    // a Before / After switch shows one full-width pane at a time instead.
    const phone = window.matchMedia('(max-width: 640px)');
    const legacy = compare.querySelector('.legacy');
    const after = compare.querySelector('.after');
    const sw = document.createElement('div');
    sw.className = 'compare-switch';
    sw.setAttribute('role', 'group');
    sw.setAttribute('aria-label', 'Show the screen before or after');
    sw.innerHTML = '<button type="button" data-view="before">Before</button><button type="button" data-view="after">After Khen</button>';
    (compare.closest('.browser') || compare).before(sw);
    let view = 'before';
    const fit = () => {
      if (!phone.matches) { compare.style.height = ''; return; }
      compare.style.height = (view === 'after' ? after : legacy).offsetHeight + 'px';
    };
    const show = (v) => {
      view = v;
      compare.dataset.view = v;
      sw.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === v)));
      compare.style.setProperty('--split', v === 'after' ? '0%' : '100%');
      fit();
    };
    sw.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) show(b.dataset.view); });
    const mode = () => { if (phone.matches) show(view); else { delete compare.dataset.view; compare.style.height = ''; set(split); } };
    phone.addEventListener('change', mode);
    addEventListener('resize', fit);
    compare.addEventListener('pointerdown', (e) => {
      if (phone.matches) return;
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
    mode();
  }

  // ---- Contact form ----
  const contact = document.getElementById('contact');
  const form = contact && contact.querySelector('form');
  const chips = form ? [...form.querySelectorAll('.chips .pill-btn')] : [];
  const serviceInput = form && form.querySelector('input[name="service"]');
  // Several services can be picked; the hidden input carries them comma-separated.
  const syncService = () => {
    if (serviceInput) serviceInput.value = chips.filter((c) => c.getAttribute('aria-pressed') === 'true').map((c) => c.dataset.value).join(', ');
  };
  // null clears every chip; a value turns that chip on (keeping the others).
  const selectService = (value) => {
    chips.forEach((c) => {
      if (value === null) c.setAttribute('aria-pressed', 'false');
      else if (c.dataset.value === value) c.setAttribute('aria-pressed', 'true');
    });
    syncService();
  };
  chips.forEach((chip) => chip.addEventListener('click', () => {
    chip.setAttribute('aria-pressed', String(chip.getAttribute('aria-pressed') !== 'true'));
    syncService();
  }));

  // Enquiries are emailed to the inbox. Web3Forms (web3forms.com) is used when
  // its access key is set; otherwise FormSubmit (formsubmit.co) to FORM_TO.
  const WEB3FORMS_KEY = 'a47a02a0-cbb5-4d18-badd-0c064dc6d5c4';
  const FORM_TO = 'hellokhen01@gmail.com';

  if (form) {
    const sent = contact.querySelector('.sent');
    const error = form.querySelector('.form-error');
    const submit = form.querySelector('button[type="submit"]');
    const submitLabel = submit ? submit.textContent : '';
    const fail = () => {
      error.textContent = 'Sorry, that didn’t send. Please try again, or email us directly.';
      error.hidden = false;
    };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const bad = ['name', 'email', 'company']
        .map((n) => form.elements[n])
        .find((el) => !el.value.trim() || !el.checkValidity());
      if (bad) {
        error.textContent = 'Please add your name, a valid work email and your company.';
        error.hidden = false; bad.focus(); return;
      }
      error.hidden = true;
      if (form.elements._honey && form.elements._honey.value) return; // bot
      if (!WEB3FORMS_KEY && !FORM_TO) { fail(); return; }
      const v = (n) => (form.elements[n] ? form.elements[n].value.trim() : '');
      const subject = 'New enquiry from ' + (v('name') || 'the Khen website');
      const fields = {
        Name: v('name'),
        Email: v('email'),
        Company: v('company'),
        'Needs help with': v('service') || 'Not specified',
        Message: v('message') || '(none)',
        Page: location.href,
      };
      const [url, payload] = WEB3FORMS_KEY
        ? ['https://api.web3forms.com/submit', { access_key: WEB3FORMS_KEY, subject, from_name: 'Khen website', replyto: v('email'), ...fields }]
        : ['https://formsubmit.co/ajax/' + encodeURIComponent(FORM_TO), { _subject: subject, _template: 'table', _captcha: 'false', _replyto: v('email'), ...fields }];
      submit.disabled = true;
      submit.textContent = 'Sending…';
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || String(data.success) === 'false') throw new Error(data.message || res.status);
        form.hidden = true;
        sent.hidden = false;
      } catch (_) {
        fail();
      } finally {
        submit.disabled = false;
        submit.textContent = submitLabel;
      }
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
    // Inside a [data-filter-scope], only filter that area's cards (not "More projects" rows).
    // Coming-soon placeholders (.is-soon) are hidden for now and don't count.
    const cards = [...(filterBar.closest('[data-filter-scope]') || document).querySelectorAll('[data-tags]:not(.is-soon)')];
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

  // ---- Sideways scrollers: ←/→ buttons move one card ----
  document.querySelectorAll('[data-scroller]').forEach((track) => {
    const buttons = [...document.querySelectorAll(`[aria-controls="${track.id}"][data-scroll]`)];
    const step = () => {
      const card = track.firstElementChild;
      return card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth;
    };
    const update = () => buttons.forEach((b) => {
      const dir = Number(b.dataset.scroll);
      b.disabled = dir < 0 ? track.scrollLeft <= 2 : track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    });
    buttons.forEach((b) => b.addEventListener('click', () => {
      track.scrollBy({ left: Number(b.dataset.scroll) * step(), behavior: reduceMotion ? 'auto' : 'smooth' });
    }));
    track.addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  });

  // ---- Back to top (appears once the visitor is well down the page) ----
  const toTop = document.createElement('button');
  toTop.type = 'button';
  toTop.className = 'to-top';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
  document.body.appendChild(toTop);
  const syncToTop = () => toTop.classList.toggle('is-visible', window.scrollY > window.innerHeight * 1.2);
  addEventListener('scroll', syncToTop, { passive: true });
  syncToTop();

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
