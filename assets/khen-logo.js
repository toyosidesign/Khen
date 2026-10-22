(() => {
  if (customElements.get('khen-logo')) return;
  // Artwork is assets/khen-logo-full.svg with its parts tagged for animation:
  // .stem/.up/.dn = the K, .spark = sparkle clusters, .hen-p = the "hen" letters.
  const tpl = (ink) => `<style>
:host{display:block;line-height:0}
svg{height:100%;width:auto;display:block;overflow:visible}
.hen-p{fill:var(--ink)}
.p,.spark{transform-box:fill-box}
.stem{transform-origin:50% 100%;animation:stem .7s cubic-bezier(.2,.9,.25,1.15) both}
.up{transform-origin:0% 100%;animation:armU .75s .18s cubic-bezier(.2,.9,.25,1.2) both}
.dn{transform-origin:0% 0%;animation:armD .75s .26s cubic-bezier(.2,.9,.25,1.2) both}
.spark{transform-origin:50% 50%;animation:pop .5s .7s cubic-bezier(.2,1.6,.4,1) both}
.spark.b{animation-delay:.82s}
#Purple > path.hen-p{animation:hen .6s .45s ease-out both}
.up,.dn,.stem{transition:transform .45s cubic-bezier(.3,1.6,.5,1)}
:host(.ready) .stem,:host(.ready) .up,:host(.ready) .dn,:host(.ready) .spark,:host(.ready) #Purple > path.hen-p{animation:none}
:host(.hov) .up{transform:translate(10px,-8px) rotate(-4deg)}
:host(.hov) .dn{transform:translate(10px,8px) rotate(4deg)}
:host(.hov) .stem{transform:scaleY(1.04)}
:host(.hov) .spark{animation:twinkle .9s ease-in-out}
:host(.hov) .spark.b{animation-delay:.15s}
@keyframes stem{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes armU{from{transform:translate(70px,-24px) rotate(-18deg);opacity:0}to{transform:none;opacity:1}}
@keyframes armD{from{transform:translate(70px,24px) rotate(18deg);opacity:0}to{transform:none;opacity:1}}
@keyframes pop{from{transform:scale(0) rotate(-45deg);opacity:0}to{transform:none;opacity:1}}
@keyframes twinkle{0%,100%{transform:none}40%{transform:scale(1.5) rotate(30deg)}70%{transform:scale(.8)}}
@keyframes hen{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.stem,.up,.dn,.spark,#Purple > path.hen-p{animation:none!important;transition:none}:host(.hov) .up,:host(.hov) .dn,:host(.hov) .stem{transform:none}}
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
        <g transform="translate(125.85 17.0) scale(1.9) translate(-125.85 -17.0)"><g class="spark">
          <g>
            <polygon class="cls-15" stroke="#f7931e" stroke-width="0.9" stroke-linejoin="round" vector-effect="non-scaling-stroke" points="125.38 15.13 125.58 25.5 130.91 16.62 125.93 25.7 134.96 20.69 126.13 26.05 136.44 26.26 126.13 26.46 134.96 31.82 125.93 26.81 130.91 35.89 125.58 27.01 125.38 37.38 125.18 27.01 119.85 35.89 124.83 26.81 115.8 31.82 124.63 26.46 114.32 26.26 124.63 26.05 115.8 20.69 124.83 25.7 119.85 16.62 125.18 25.5 125.38 15.13"/>
            <polygon id="Star_2" data-name="Star 2" class="cls-15" points="125.61 14.26 125.84 25.82 137.31 26.49 125.82 26.72 125.15 38.26 124.93 26.7 113.45 26.02 124.94 25.8 125.61 14.26"/>
            <ellipse class="cls-11" cx="125.38" cy="26.26" rx="7.37" ry="7.42"/>
          </g>
          <g>
            <polygon class="cls-3" stroke="#8cc63f" stroke-width="0.9" stroke-linejoin="round" vector-effect="non-scaling-stroke" points="137.31 38.04 137.41 43.22 140.08 38.78 137.59 43.32 142.1 40.82 137.69 43.5 142.84 43.6 137.69 43.7 142.1 46.38 137.59 43.88 140.08 48.42 137.41 43.98 137.31 49.16 137.21 43.98 134.55 48.42 137.04 43.88 132.52 46.38 136.94 43.7 131.78 43.6 136.94 43.5 132.52 40.82 137.04 43.32 134.55 38.78 137.21 43.22 137.31 38.04"/>
            <polygon id="Star_2-2" data-name="Star 2" class="cls-3" points="137.43 37.6 137.54 43.38 143.28 43.72 137.53 43.83 137.2 49.6 137.08 43.82 131.35 43.48 137.09 43.37 137.43 37.6"/>
            <ellipse class="cls-10" cx="137.31" cy="43.6" rx="3.69" ry="3.71"/>
          </g>
          <g>
            <polygon class="cls-3" stroke="#8cc63f" stroke-width="0.9" stroke-linejoin="round" vector-effect="non-scaling-stroke" points="114.32 39.89 114.39 43.35 116.16 40.39 114.5 43.42 117.51 41.75 114.57 43.53 118.01 43.6 114.57 43.67 117.51 45.46 114.5 43.79 116.16 46.81 114.39 43.85 114.32 47.31 114.25 43.85 112.48 46.81 114.14 43.79 111.13 45.46 114.07 43.67 110.63 43.6 114.07 43.53 111.13 41.75 114.14 43.42 112.48 40.39 114.25 43.35 114.32 39.89"/>
            <polygon id="Star_2-3" data-name="Star 2" class="cls-3" points="114.4 39.6 114.47 43.45 118.3 43.68 114.47 43.75 114.24 47.6 114.17 43.75 110.34 43.52 114.18 43.45 114.4 39.6"/>
            <ellipse class="cls-9" cx="114.32" cy="43.6" rx="2.46" ry="2.47"/>
          </g>
          <g>
            <polygon class="cls-2" stroke="#f0f" stroke-width="0.9" stroke-linejoin="round" vector-effect="non-scaling-stroke" points="125.38 47.89 125.52 54.81 129.07 48.89 125.75 54.94 131.77 51.6 125.88 55.18 132.76 55.31 125.88 55.45 131.77 59.02 125.75 55.68 129.07 61.73 125.52 55.81 125.38 62.73 125.25 55.81 121.69 61.73 125.01 55.68 118.99 59.02 124.88 55.45 118.01 55.31 124.88 55.18 118.99 51.6 125.01 54.94 121.69 48.89 125.25 54.81 125.38 47.89"/>
            <polygon id="Star_2-4" data-name="Star 2" class="cls-2" points="125.54 47.31 125.68 55.02 133.33 55.47 125.67 55.62 125.23 63.31 125.08 55.6 117.43 55.15 125.09 55 125.54 47.31"/>
            <ellipse class="cls-7" cx="125.38" cy="55.31" rx="4.92" ry="4.94"/>
          </g>
        </g></g>
        <g transform="translate(219.53 154.25) scale(2.0) translate(-219.53 -154.25)"><g class="spark b">
          <g>
            <polygon class="cls-15" stroke="#f7931e" stroke-width="0.9" stroke-linejoin="round" vector-effect="non-scaling-stroke" points="219.09 128.61 219.29 138.98 224.62 130.1 219.64 139.18 228.67 134.17 219.84 139.53 230.15 139.73 219.84 139.93 228.67 145.29 219.64 140.28 224.62 149.37 219.29 140.49 219.09 150.86 218.89 140.49 213.56 149.37 218.54 140.28 209.51 145.29 218.34 139.93 208.03 139.73 218.34 139.53 209.51 134.17 218.54 139.18 213.56 130.1 218.89 138.98 219.09 128.61"/>
            <polygon id="Star_2-5" data-name="Star 2" class="cls-15" points="219.32 127.73 219.55 139.29 231.02 139.96 219.53 140.19 218.86 151.73 218.64 140.17 207.16 139.5 218.65 139.27 219.32 127.73"/>
            <ellipse class="cls-5" cx="219.09" cy="139.73" rx="7.37" ry="7.42"/>
          </g>
          <g>
            <polygon class="cls-3" stroke="#8cc63f" stroke-width="0.9" stroke-linejoin="round" vector-effect="non-scaling-stroke" points="231.02 151.51 231.12 156.7 233.79 152.26 231.3 156.8 235.81 154.29 231.4 156.97 236.55 157.08 231.4 157.18 235.81 159.86 231.3 157.35 233.79 161.89 231.12 157.45 231.02 162.64 230.92 157.45 228.26 161.89 230.75 157.35 226.23 159.86 230.65 157.18 225.49 157.08 230.65 156.97 226.23 154.29 230.75 156.8 228.26 152.26 230.92 156.7 231.02 151.51"/>
            <polygon id="Star_2-6" data-name="Star 2" class="cls-3" points="231.14 151.08 231.25 156.86 236.99 157.19 231.24 157.31 230.91 163.08 230.79 157.3 225.06 156.96 230.8 156.85 231.14 151.08"/>
            <ellipse class="cls-6" cx="231.02" cy="157.08" rx="3.69" ry="3.71"/>
          </g>
          <g>
            <polygon class="cls-3" stroke="#8cc63f" stroke-width="0.9" stroke-linejoin="round" vector-effect="non-scaling-stroke" points="208.03 153.37 208.1 156.82 209.87 153.86 208.21 156.89 211.22 155.22 208.28 157.01 211.72 157.08 208.28 157.14 211.22 158.93 208.21 157.26 209.87 160.29 208.1 157.33 208.03 160.78 207.96 157.33 206.19 160.29 207.85 157.26 204.84 158.93 207.78 157.14 204.34 157.08 207.78 157.01 204.84 155.22 207.85 156.89 206.19 153.86 207.96 156.82 208.03 153.37"/>
            <polygon id="Star_2-7" data-name="Star 2" class="cls-3" points="208.11 153.08 208.18 156.93 212.01 157.15 208.18 157.23 207.95 161.08 207.88 157.22 204.05 157 207.88 156.92 208.11 153.08"/>
            <ellipse class="cls-4" cx="208.03" cy="157.08" rx="2.46" ry="2.47"/>
          </g>
          <g>
            <polygon class="cls-2" stroke="#f0f" stroke-width="0.9" stroke-linejoin="round" vector-effect="non-scaling-stroke" points="219.09 161.37 219.22 168.28 222.78 162.36 219.46 168.42 225.48 165.08 219.59 168.65 226.46 168.78 219.59 168.92 225.48 172.49 219.46 169.15 222.78 175.21 219.22 169.29 219.09 176.2 218.96 169.29 215.4 175.21 218.72 169.15 212.7 172.49 218.59 168.92 211.72 168.78 218.59 168.65 212.7 165.08 218.72 168.42 215.4 162.36 218.96 168.28 219.09 161.37"/>
            <polygon id="Star_2-8" data-name="Star 2" class="cls-2" points="219.24 160.78 219.39 168.49 227.04 168.94 219.38 169.09 218.94 176.78 218.79 169.08 211.14 168.63 218.8 168.48 219.24 160.78"/>
            <ellipse class="cls-8" cx="219.09" cy="168.78" rx="4.92" ry="4.94"/>
          </g>
        </g></g>
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
