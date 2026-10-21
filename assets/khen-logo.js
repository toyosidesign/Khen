(() => {
  if (customElements.get('khen-logo')) return;
  // Paths from assets/khen-logo-full.svg (the master logo file).
  const tpl = (ink) => `
<style>
:host{display:block;line-height:0}
svg{height:100%;width:auto;display:block;overflow:visible}
.mark{isolation:isolate}
.p{transform-box:fill-box}
.x{mix-blend-mode:multiply}
.stem{transform-origin:50% 100%;animation:stem .7s cubic-bezier(.2,.9,.25,1.15) both}
.up{transform-origin:0% 100%;animation:armU .75s .18s cubic-bezier(.2,.9,.25,1.2) both}
.dn{transform-origin:0% 0%;animation:armD .75s .26s cubic-bezier(.2,.9,.25,1.2) both}
.hen{animation:hen .6s .45s ease-out both}
.up,.dn,.stem{transition:transform .45s cubic-bezier(.3,1.6,.5,1)}
:host(.ready) .stem,:host(.ready) .up,:host(.ready) .dn,:host(.ready) .hen{animation:none}
:host(.hov) .up{transform:translate(10px,-8px) rotate(-5deg)}
:host(.hov) .dn{transform:translate(10px,8px) rotate(5deg)}
:host(.hov) .stem{transform:scaleY(1.05)}
@keyframes stem{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes armU{from{transform:translate(70px,-24px) rotate(-18deg);opacity:0}to{transform:none;opacity:1}}
@keyframes armD{from{transform:translate(70px,24px) rotate(18deg);opacity:0}to{transform:none;opacity:1}}
@keyframes hen{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.stem,.up,.dn,.hen{animation:none;transition:none}:host(.hov) .up,:host(.hov) .dn,:host(.hov) .stem{transform:none}}
</style>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 905.8 302.17" role="img" aria-label="Khen">
  <g class="mark">
    <path class="p x stem" fill="#f7931e" d="M100.21,52.82l-3.55,85.78c-6.27,6.04-11.58,11.630-14.85,15.01-4.4,4.54-9.27,10.21-13.28,14.82-.11-47.11-1.39-84.88-1.7-110.32-.08-6.41-.23-19.61-8.330-24.7-6.05-3.8-15.92-3.45-19.62.87-6.64,7.74-7.24,24.6-7.13,73.14.17,71.28-4.77,111.33-8.31,133.53-.37,2.35-1.16,8.2-1.09,17.19.12,15.68,5.43,29.87,8.93,39.11-4.8-2.27-14.91-7.72-21.31-16.63-1.76-2.45-5.54-7.19-7.56-14.57-1.36-4.97-2-9.22-2.09-12.27C.2,186.79.1,119.8,0,52.82,0,24.85,22.43,2.17,50.11,2.17s50.11,22.67,50.11,50.64Z"/>
    <path class="p dn" fill="#9ccf5c" d="M102.83,174.02c29.27,28.08,54.47,51.94,71.6,68.57,16.14,15.68,25.98,25.28,27.77,26.97,5.14,4.82,13.05,4.4,17.68-.95,4.64-5.36,4.23-13.63-.92-18.46-34.22-32.11-65.71-61.42-99.93-93.53,6.96-7.05,13.770-13.98,20.73-21.04,33.36,32.01,64.15,61.1,97.51,93.11,16.21,15.59,17.52,41.82,2.96,59.09h0c-15.06,17.86-41.27,19.29-58.04,3.17l-25.97-24.46-72.96-67.75c.46-.74,9.97-12.4,10.91-13.63"/>
    <path class="p x up" fill="#6465d2" d="M46.14,300.19c-9.74,0-19.7-3.93-28.39-11.29-8.49-7.19-14.62-16.83-16.4-25.81-3.3-15.94.32-35.18,10.76-57.18,7.63-16.09,16.92-29.14,19.98-32.63.23-.26.45-.5.68-.73,19.190-24.89,42.43-48.32,53.25-58.33,28.54-26.5,57.07-55.2,84.78-85.31l.43-.44c13.18-12.97,28.29-20,42.5-19.8,10.75.16,20.43,4.4,27.98,12.28l.97,1.01.72,1.2c10.99,18.29,11.52,34.9,1.6,50.78-8.12,13-22.59,24.62-40.92,39.33-16.52,13.26-37.08,29.76-58.33,51.81l-.15.15c-19.93,20.01-22.23,22.91-31.89,35.14-3.8,4.81-8.54,10.8-15.75,19.64-7.94,9.71-9.38,22.04-10.78,33.97-2.11,18.07-5.01,42.81-37.49,46.02-1.18.12-2.37.18-3.56.18ZM47.74,193.99c-8.01,11.59-26.37,42.59-21.9,64.08l.03.14c.54,2.78,3.29,7.6,8.03,11.61,4.46,3.78,9.32,5.72,13.32,5.31,11.54-1.14,12.87-4.68,15.14-24.05,1.64-14.04,3.69-31.52,16.24-46.88,7.08-8.68,11.75-14.58,15.5-19.33,10.12-12.8,12.84-16.25,33.72-37.21,22.33-23.16,43.55-40.2,60.61-53.89,37.59-30.17,44.71-38.24,34.32-56.41-2.69-2.43-5.77-3.64-9.38-3.7-7.33-.08-16.19,4.41-24.39,12.41-28.08,30.5-57,59.59-85.96,86.47-10.37,9.6-32.77,32.2-51.06,56.07l-4.12,5.38h-.09Z"/>
  </g>
  <g class="hen" fill="${ink}">
    <path d="M339.18,2.17v112.39c9.38-13.77,26.71-30.05,61.22-30.050,39.86,0,71.6,23.48,71.6,81.18v136.48h-58.81v-127.67c0-27.66-9.86-42.36-34.68-42.36-32.88,0-39.33,24.35-39.33,57.17v112.86h-59.18V2.17h59.18Z"/>
    <path d="M551.37,203.73c.05,26.54,13.41,52.47,42.81,52.47,24.59,0,31.61-9.82,37.21-22.65h59.1c-7.56,25.97-30.86,68.62-97.86,68.62s-100.73-52.25-100.73-107.92c0-66.55,34.34-114.08,102.84-114.08,73.25,0,98.16,52.71,98.16,105.67,0,7.18,0,11.84-.77,17.89h-140.76ZM633.75,167.66c-.41-24.7-10.33-45.49-39.1-45.49s-39.68,19.410-42.04,45.49h81.14Z"/>
    <path d="M713.22,139.86c0-18.44,0-38.63-.41-54.66h57.48c1.19,5.6,1.97,20.67,2.29,27.64,7.29-13.630,24.64-32.67,62.19-32.67,43.06,0,71.04,29.45,71.04,83.97v138.03h-59.36v-131.35c0-24.39-8.03-42.06-34.22-42.06s-39.65,14.19-39.65,52.5v120.91h-59.36v-162.31Z"/>
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
