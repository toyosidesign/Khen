"""Install a new logo SVG as the site logo.

Writes assets/khen-logo.svg (header) and assets/khen-logo-light.svg (footer,
black lettering turned white), then updates the <img> tags on every page with
the new aspect ratio and a fresh ?v= cache-buster.

The lettering is either a <g id="Letters"> group or the shapes with no class
(the exporter leaves black fills unclassed); the coloured parts are untouched.

Usage: python3 scripts/build-logo.py "assets/Logo.svg"
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = ["index.html", "projects.html", "about.html", "fluent-conveyors.html"]
HEADER_H, FOOTER_H = 64, 72  # display heights in px; keep in sync with site.css

src = Path(sys.argv[1]).read_text()
svg = re.sub(r"<\?xml[^>]*\?>", "", src)
svg = re.sub(r'\sdata-name="[^"]*"', "", svg)
svg = re.sub(r">\s+<", "><", svg)
svg = re.sub(r"\s*([{};:])\s*", r"\1", svg).strip()

if '<g id="Letters">' in svg:
    light = svg.replace('<g id="Letters">', '<g id="Letters" fill="#fff">', 1)
else:
    light = re.sub(r"<(path|polygon|rect|circle)(?![^>]*\bclass=)", r'<\1 fill="#fff"', svg)
if light == svg:
    sys.exit("could not find the black lettering to recolour for the footer")

(ROOT / "assets" / "khen-logo.svg").write_text(svg)
(ROOT / "assets" / "khen-logo-light.svg").write_text(light)

_, _, vw, vh = map(float, re.search(r'viewBox="([^"]*)"', svg).group(1).split())
ratio = vw / vh

version = None
for name in PAGES:
    page = ROOT / name
    text = page.read_text()
    current = re.search(r"khen-logo\.svg\?v=(\d+)", text)
    version = version or (int(current.group(1)) + 1 if current else 1)
    for file, h in (("khen-logo.svg", HEADER_H), ("khen-logo-light.svg", FOOTER_H)):
        text = re.sub(
            rf'<img src="assets/{re.escape(file)}(\?v=\d+)?" alt="Khen" width="\d+" height="\d+" />',
            f'<img src="assets/{file}?v={version}" alt="Khen" width="{round(h * ratio)}" height="{h}" />',
            text,
        )
    page.write_text(text)

print(f"logo installed (aspect {ratio:.3f}), cache version v={version}")
