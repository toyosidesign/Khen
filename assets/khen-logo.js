(() => {
  if (customElements.get('khen-logo')) return;
  // Artwork is assets/khen-logo-full.svg with its parts tagged for animation:
  // .stem/.up/.dn = the K, .hen-p = the "hen" letters.
  const tpl = (ink) => `<style>
:host{display:block;line-height:0}
svg{height:100%;width:auto;display:block;overflow:visible}
.hen-p{fill:var(--ink)}
.p{transform-box:fill-box}
.stem{transform-origin:50% 100%;animation:stem .7s cubic-bezier(.2,.9,.25,1.15) both}
.up{transform-origin:0% 100%;animation:armU .75s .18s cubic-bezier(.2,.9,.25,1.2) both}
.dn{transform-origin:0% 0%;animation:armD .75s .26s cubic-bezier(.2,.9,.25,1.2) both}
#Purple > path.hen-p{animation:hen .6s .45s ease-out both}
.up,.dn,.stem{transition:transform .45s cubic-bezier(.3,1.6,.5,1)}
:host(.ready) .stem,:host(.ready) .up,:host(.ready) .dn,:host(.ready) #Purple > path.hen-p{animation:none}
:host(.hov) .up{transform:translate(10px,-8px) rotate(-4deg)}
:host(.hov) .dn{transform:translate(10px,8px) rotate(4deg)}
:host(.hov) .stem{transform:scaleY(1.04)}
@keyframes stem{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes armU{from{transform:translate(70px,-24px) rotate(-18deg);opacity:0}to{transform:none;opacity:1}}
@keyframes armD{from{transform:translate(70px,24px) rotate(18deg);opacity:0}to{transform:none;opacity:1}}
@keyframes hen{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.stem,.up,.dn,#Purple > path.hen-p{animation:none!important;transition:none}:host(.hov) .up,:host(.hov) .dn,:host(.hov) .stem{transform:none}}
</style>
<div style="--ink:${ink};height:100%"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 894.57 300" role="img" aria-label="Khen">
  <defs>
    <style>
      .cls-1 {
        fill: #9ccf5c;
      }

      .cls-2 {
        fill: #f0f;
      }

      .cls-3 {
        fill: #8cc63f;
      }

      .cls-4 {
        fill: url(#radial-gradient-7);
      }

      .cls-4, .cls-5, .cls-6, .cls-7, .cls-8, .cls-9, .cls-10, .cls-11 {
        opacity: 0;
      }

      .cls-5 {
        fill: url(#radial-gradient-5);
      }

      .cls-6 {
        fill: url(#radial-gradient-6);
      }

      .cls-7 {
        fill: url(#radial-gradient-4);
      }

      .cls-8 {
        fill: url(#radial-gradient-8);
      }

      .cls-9 {
        fill: url(#radial-gradient-3);
      }

      .cls-10 {
        fill: url(#radial-gradient-2);
      }

      .cls-12 {
        isolation: isolate;
      }

      .cls-13 {
        mix-blend-mode: multiply;
      }

      .cls-14 {
        fill: #6465d2;
      }

      .cls-15 {
        fill: #f7931e;
      }

      .cls-11 {
        fill: url(#radial-gradient);
      }
    </style>
    <radialGradient id="radial-gradient" cx="34.35" cy="69.93" fx="34.35" fy="69.93" r="7.76" gradientTransform="translate(92.73 -40.59) scale(.95)" gradientUnits="userSpaceOnUse">
      <stop offset=".24" stop-color="#66cbe6"/>
      <stop offset=".28" stop-color="#6bcce6" stop-opacity=".88"/>
      <stop offset=".34" stop-color="#74cfe7" stop-opacity=".68"/>
      <stop offset=".42" stop-color="#7dd1e9" stop-opacity=".49"/>
      <stop offset=".49" stop-color="#84d3e9" stop-opacity=".34"/>
      <stop offset=".57" stop-color="#8ad5ea" stop-opacity=".22"/>
      <stop offset=".66" stop-color="#8ed6eb" stop-opacity=".12"/>
      <stop offset=".75" stop-color="#91d7eb" stop-opacity=".05"/>
      <stop offset=".85" stop-color="#93d7eb" stop-opacity=".01"/>
      <stop offset="1" stop-color="#94d8ec" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="radial-gradient-2" cx="46.91" cy="88.07" fx="46.91" fy="88.07" r="3.88" gradientTransform="translate(92.73 -40.59) scale(.95)" gradientUnits="userSpaceOnUse">
      <stop offset=".24" stop-color="#fff"/>
      <stop offset=".3" stop-color="#fff" stop-opacity=".8"/>
      <stop offset=".37" stop-color="#fff" stop-opacity=".61"/>
      <stop offset=".44" stop-color="#fff" stop-opacity=".45"/>
      <stop offset=".51" stop-color="#fff" stop-opacity=".31"/>
      <stop offset=".59" stop-color="#fff" stop-opacity=".2"/>
      <stop offset=".67" stop-color="#fff" stop-opacity=".11"/>
      <stop offset=".76" stop-color="#fff" stop-opacity=".05"/>
      <stop offset=".86" stop-color="#fff" stop-opacity=".01"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="radial-gradient-3" cx="22.71" cy="88.07" fx="22.71" fy="88.07" r="2.59" xlink:href="#radial-gradient-2"/>
    <radialGradient id="radial-gradient-4" cx="34.35" cy="100.32" fx="34.35" fy="100.32" r="5.17" xlink:href="#radial-gradient-2"/>
    <radialGradient id="radial-gradient-5" cx="132.95" cy="188.63" fx="132.95" fy="188.63" xlink:href="#radial-gradient"/>
    <radialGradient id="radial-gradient-6" cx="145.51" cy="206.78" fx="145.51" fy="206.78" r="3.88" xlink:href="#radial-gradient-2"/>
    <radialGradient id="radial-gradient-7" cx="121.32" cy="206.78" fx="121.32" fy="206.78" r="2.59" xlink:href="#radial-gradient-2"/>
    <radialGradient id="radial-gradient-8" cx="132.95" cy="219.02" fx="132.95" fy="219.02" r="5.17" xlink:href="#radial-gradient-2"/>
  </defs>
  <g class="cls-12">
    <g id="Purple">
      <path class="hen-p" d="M328.7,0v112.39c9.38-13.77,26.71-30.05,61.22-30.05,39.86,0,71.6,23.48,71.6,81.18v136.48h-58.81v-127.67c0-27.66-9.86-42.36-34.68-42.36-32.88,0-39.33,24.35-39.33,57.17v112.86h-59.18V0h59.18Z"/>
      <path class="hen-p" d="M540.51,201.56c.05,26.54,13.41,52.47,42.81,52.47,24.59,0,31.61-9.82,37.21-22.65h59.1c-7.56,25.97-30.86,68.62-97.86,68.62s-100.73-52.25-100.73-107.92c0-66.55,34.34-114.08,102.84-114.08,73.25,0,98.16,52.71,98.16,105.67,0,7.18,0,11.84-.77,17.89h-140.76ZM622.89,165.49c-.41-24.7-10.33-45.49-39.1-45.49s-39.68,19.41-42.04,45.49h81.14Z"/>
      <path class="hen-p" d="M701.98,137.69c0-18.44,0-38.63-.41-54.66h57.48c1.19,5.6,1.97,20.67,2.29,27.64,7.29-13.63,24.64-32.67,62.19-32.67,43.06,0,71.04,29.45,71.04,83.97v138.03h-59.36v-131.35c0-24.39-8.03-42.06-34.22-42.06s-39.65,14.19-39.65,52.5v120.91h-59.36v-162.31Z"/>
      <g>
        <path class="cls-15 p stem" d="M99.63,50.64l-3.53,85.78c-6.24,6.04-11.51,11.63-14.76,15.01-4.37,4.54-9.22,10.21-13.2,14.82-.11-47.11-1.39-84.88-1.69-110.32-.08-6.41-.23-19.61-8.29-24.7-6.01-3.8-15.83-3.45-19.51.87-6.6,7.74-7.2,24.6-7.09,73.14.17,71.28-4.74,111.33-8.26,133.53-.37,2.35-1.15,8.2-1.08,17.19.12,15.68,5.4,29.87,8.88,39.11-4.77-2.27-14.82-7.72-21.19-16.63-1.75-2.45-5.51-7.19-7.52-14.57-1.35-4.97-1.98-9.22-2.08-12.27C.2,184.62.1,117.63,0,50.64,0,22.67,22.3,0,49.81,0s49.81,22.67,49.81,50.64Z"/>
        <path class="cls-1 p dn" d="M102.23,171.85c29.09,28.08,54.15,51.94,71.18,68.57,16.05,15.68,25.82,25.28,27.61,26.97,5.11,4.82,12.97,4.4,17.58-.95,4.61-5.36,4.21-13.63-.91-18.46-34.02-32.11-65.33-61.42-99.35-93.53,6.92-7.05,13.69-13.98,20.61-21.04,33.17,32.01,63.78,61.1,96.95,93.11,16.11,15.59,17.42,41.82,2.94,59.09h0c-14.97,17.86-41.03,19.29-57.7,3.17l-25.82-24.46-72.53-67.75c.46-.74,9.91-12.4,10.85-13.63"/>
        <g class="cls-13">
          <path class="cls-14 p up" d="M46.1,298.19c-9.68,0-19.58-3.93-28.22-11.29-8.44-7.19-14.53-16.83-16.3-25.81-3.28-15.94.32-35.18,10.69-57.18,7.59-16.09,16.82-29.14,19.86-32.63.22-.26.45-.5.68-.73,19.07-24.89,42.19-48.32,52.93-58.33,28.38-26.5,56.74-55.2,84.29-85.31l.43-.44c13.11-12.97,28.13-20,42.26-19.8,10.69.16,20.31,4.4,27.82,12.28l.96,1.01.72,1.2c10.93,18.29,9.84,33.03-.02,48.91-8.07,13-22.3,25.4-41.09,39.36-18.7,13.9-35.37,30.9-55.52,53.19l-.6.61c-19.82,20.01-22.1,22.91-31.7,35.14-3.78,4.81-9.48,8.72-16.65,17.56-7.89,9.71-9.45,24.97-11.94,36.71-4.2,19.79-2.52,38.91-35.04,45.37-1.16.23-2.36.18-3.54.18ZM47.29,191.79c-7.96,11.59-26.21,42.59-21.77,64.08l.03.14c.54,2.78,3.27,7.6,7.99,11.61,4.44,3.78,9.26,5.72,13.24,5.31,11.48-1.14,12.79-4.68,15.05-24.05,1.63-14.04,3.67-31.52,16.15-46.88,7.04-8.68,11.68-14.58,15.41-19.33,10.06-12.8,12.77-16.25,33.52-37.21,22.2-23.16,43.3-40.2,60.26-53.89,37.37-30.17,44.45-38.24,34.12-56.41-2.68-2.43-5.74-3.64-9.33-3.7-7.29-.08-16.1,4.41-24.25,12.41-27.92,30.5-56.67,59.59-85.46,86.47-10.31,9.6-32.58,32.2-50.76,56.07l-4.1,5.38h-.09Z"/>
        </g>
      </g>
      <g>
        
        
      </g>
    </g>
  </g>
</svg></div>`;
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
      this._rt = setTimeout(() => this.classList.add('ready'), 1400);
    }
    disconnectedCallback() {
      const t = this._t; if (!t) return;
      t.removeEventListener('mouseenter', this._on); t.removeEventListener('mouseleave', this._off);
      t.removeEventListener('focus', this._on); t.removeEventListener('blur', this._off);
    }
    attributeChangedCallback() { if (this.shadowRoot) this.render(); }
    render() { this.shadowRoot.innerHTML = tpl(this.getAttribute('ink') || '#6465d2'); }
  }
  customElements.define('khen-logo', KhenLogo);
})();
