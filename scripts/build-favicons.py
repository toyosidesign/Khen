"""Build the favicon set from assets/Fav Icon.png.

The source is a (possibly non-square) tile with its own background colour.
It is centred on a square of that colour so its margins are kept, corners
are rounded for browser tabs, and iOS gets an opaque square (it rounds the
corners itself). Bumps the ?v= cache-buster on every page so browsers fetch
the new icon.

Usage: python3 scripts/build-favicons.py   (needs Pillow)
"""
import re
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "Fav Icon.png"
PAGES = ["index.html", "projects.html", "about.html", "fluent-conveyors.html", "fluent-conveyors-website.html", "preview.html"]

im = Image.open(SRC).convert("RGBA")
w, h = im.size
bg = im.getpixel((w // 2, 3))[:3] + (255,)  # tile colour, sampled inside the top edge
side = max(w, h)

square = Image.new("RGBA", (side, side), bg)
square.paste(im, ((side - w) // 2, (side - h) // 2), im)

mask = Image.new("L", (side, side), 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, side - 1, side - 1), radius=int(side * 0.18), fill=255)
rounded = square.copy()
rounded.putalpha(mask)

big = rounded.resize((512, 512), Image.LANCZOS)
big.resize((32, 32), Image.LANCZOS).save(ROOT / "assets" / "favicon-32.png")
big.resize((192, 192), Image.LANCZOS).save(ROOT / "assets" / "favicon-192.png")
big.save(ROOT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
square.resize((180, 180), Image.LANCZOS).convert("RGB").save(ROOT / "assets" / "apple-touch-icon.png")

version = None
for name in PAGES:
    page = ROOT / name
    text = page.read_text()
    current = re.search(r"favicon-32\.png\?v=(\d+)", text)
    version = version or (int(current.group(1)) + 1 if current else 1)
    text = re.sub(r'((?:assets/(?:favicon-32|favicon-192|apple-touch-icon)\.png)|favicon\.ico)(\?v=\d+)?"', rf'\1?v={version}"', text)
    page.write_text(text)

print(f"favicons built from {SRC.name} (tile {bg[:3]}), cache version v={version}")
