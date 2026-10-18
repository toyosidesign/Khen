(() => {
  if (customElements.get('khen-logo')) return;
  const K = '#7777F7';
  const tpl = (ink) => `
<style>
:host{display:block;line-height:0}
svg{height:100%;width:auto;display:block;overflow:visible}
.p{transform-box:fill-box}
.stem{transform-origin:50% 100%;animation:stem .7s cubic-bezier(.2,.9,.25,1.15) both}
.up{transform-origin:0% 100%;animation:armU .75s .18s cubic-bezier(.2,.9,.25,1.2) both}
.dn{transform-origin:0% 0%;animation:armD .75s .26s cubic-bezier(.2,.9,.25,1.2) both}
.hen{animation:hen .6s .45s ease-out both}
.up,.dn,.stem{transition:transform .45s cubic-bezier(.3,1.6,.5,1)}
:host(.ready) .stem,:host(.ready) .up,:host(.ready) .dn,:host(.ready) .hen{animation:none}
:host(.hov) .up{transform:translate(6px,-5px) rotate(-6deg)}
:host(.hov) .dn{transform:translate(6px,5px) rotate(6deg)}
:host(.hov) .stem{transform:scaleY(1.06)}
@keyframes stem{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes armU{from{transform:translate(40px,-14px) rotate(-18deg);opacity:0}to{transform:none;opacity:1}}
@keyframes armD{from{transform:translate(40px,14px) rotate(18deg);opacity:0}to{transform:none;opacity:1}}
@keyframes hen{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.stem,.up,.dn,.hen{animation:none;transition:none}:host(.hov) .up,:host(.hov) .dn,:host(.hov) .stem{transform:none}}
</style>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 532 120" role="img" aria-label="Khen">
  <g fill="${K}">
    <path class="p stem" d="M26,0h14C44.42,0,48,3.58,48,8v98c0,7.73-6.27,14-14,14H14C6.27,120,0,113.73,0,106V26C0,11.65,11.65,0,26,0Z"/>
    <path class="p up" d="M56,57.85h0c0-8.13,3.16-15.93,8.78-21.68l30.97-31.67c2.82-2.88,6.63-4.5,10.62-4.5h31.44c.11,0,.19.09.19.2v19.07c0,.05-.02.1-.06.14l-32.98,33.72c-3.08,3.15-7.25,4.92-11.61,4.92h-37.16c-.11,0-.19-.09-.19-.2Z"/>
    <path class="p dn" d="M56,62.15h0c0,8.13,3.16,15.93,8.78,21.68l30.97,31.67c2.82,2.88,6.63,4.5,10.62,4.5h31.63v-19.35l-33.04-33.78c-3.08-3.15-7.25-4.92-11.61-4.92h-37.16c-.11,0-.19-.09-.19-.2Z"/>
  </g>
  <g class="hen" fill="${ink}">
    <path d="M404,80c0-22.09-26.86-40-60-40s-60,17.91-60,40,26.86,40,60,40c22.46,0,42.03-8.22,52.32-20.4.99-1.17-.58-2.66-2.14-2.02-8.51,3.45-22.83,5.72-39.06,5.72-23.71,0-43.34-4.83-46.73-11.14-.49-.92.32-1.94,1.55-1.94h85.6c4.07,0,7.53-2.44,8.09-5.72.25-1.48.38-2.98.38-4.5ZM309.65,74.9c-1.03,0-1.8-.74-1.68-1.570.89-6.18,7.36-9.84,23.52-10.52,11.56-.49,23.98-.3,37.54.59,10.55.68,15.94,5.82,17.22,9.75.29.88-.51,1.75-1.64,1.75h-74.96Z"/>
    <path d="M529.09,120c1.61,0,2.91-.87,2.91-1.94v-53.02c0-13.83-16.81-25.04-37.55-25.04h-44.89c-20.74,0-37.56,11.21-37.56,25.04v53.02c0,1.07,1.3,1.94,2.91,1.94h22.18c1.61,0,2.91-.87,2.91-1.94v-49.34c0-4.81,5.85-8.72,13.08-8.72h37.85c7.22,0,13.08,3.9,13.08,8.72v49.34c0,1.07,1.3,1.94,2.91,1.94h22.18Z"/>
    <path d="M238.45,40h-44.89c-3.3,0-6.51.29-9.56.82V4c0-2.21-1.79-4-4-4h-20c-2.21,0-4,1.79-4,4v114.06c0,1.07,1.3,1.94,2.91,1.94h22.18c1.61,0,2.91-.87,2.91-1.94v-49.34c0-4.81,5.85-8.72,13.08-8.72h37.85c7.22,0,13.08,3.9,13.08,8.72v49.34c0,1.07,1.3,1.94,2.91,1.94h22.18c1.61,0,2.91-.87,2.91-1.94v-53.02c0-13.83-16.81-25.04-37.55-25.04Z"/>
  </g>
</svg>`;
  class KhenLogo extends HTMLElement {
    static get observedAttributes() { return ['ink']; }
    connectedCallback() {
      if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
      this.render();
      const t = this.closest('a') || this;
      this._on = () => this.classList.add('hov');
      this._off = () => this.classList.remove('hov');
      t.addEventListener('mouseenter', this._on);
      t.addEventListener('mouseleave', this._off);
      t.addEventListener('focus', this._on);
      t.addEventListener('blur', this._off);
      this._t = t;
      clearTimeout(this._rt);
      this._rt = setTimeout(() => this.classList.add('ready'), 1100);
    }
    disconnectedCallback() {
      const t = this._t; if (!t) return;
      t.removeEventListener('mouseenter', this._on); t.removeEventListener('mouseleave', this._off);
      t.removeEventListener('focus', this._on); t.removeEventListener('blur', this._off);
    }
    attributeChangedCallback() { if (this.shadowRoot) this.render(); }
    render() { this.shadowRoot.innerHTML = tpl(this.getAttribute('ink') || '#171717'); }
  }
  customElements.define('khen-logo', KhenLogo);
})();
