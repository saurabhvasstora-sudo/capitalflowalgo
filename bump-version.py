#!/usr/bin/env python3
"""
Cache-busting helper.

Run this after editing anything in assets/ and before `git push`:

    python bump-version.py

It hashes the CSS/JS bundle and rewrites the ?v=... query string on every
page, so returning visitors get the new files immediately instead of a
cached copy. If you forget to run it, the site still works — visitors just
may keep an old CSS/JS for a while.
"""
import re, glob, hashlib, os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

ASSETS = [
    "assets/css/style.css",
    "assets/js/config.js",
    "assets/js/performance-data.js",
    "assets/js/main.js",
]

h = hashlib.sha1()
for f in ASSETS:
    h.update(open(f, "rb").read())
ver = h.hexdigest()[:8]

changed = 0
for page in glob.glob("*.html"):
    t = open(page, encoding="utf-8").read()
    orig = t
    for asset in ASSETS:
        t = re.sub(re.escape(asset) + r"(\?v=[a-f0-9]+)?", asset + "?v=" + ver, t)
    if t != orig:
        open(page, "w", encoding="utf-8").write(t)
        changed += 1

print(f"asset version -> {ver}  ({changed} page(s) updated)")
