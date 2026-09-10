#!/usr/bin/env python3
"""Point the whole site at a domain.

The canonical URL, the sitemap, the OG tags and the robots sitemap line all
have to agree, so they are changed together rather than one file at a time.

    python3 tools/set_domain.py skills.designlazyyy.com
"""
import re, sys, pathlib

FILES = ["index.html", "about.html", "404.html", "robots.txt", "sitemap.xml", "README.md"]
PATTERN = re.compile(r"https://[a-z0-9.-]+\.(?:pages\.dev|designlazyyy\.com|workers\.dev)")

if len(sys.argv) != 2:
    sys.exit("usage: python3 tools/set_domain.py <host>   e.g. skills.designlazyyy.com")

host = sys.argv[1].strip().rstrip("/").replace("https://", "").replace("http://", "")
new = "https://" + host

changed = 0
for name in FILES:
    p = pathlib.Path(name)
    if not p.exists():
        continue
    text = p.read_text(encoding="utf8")
    updated, n = PATTERN.subn(new, text)
    if n:
        p.write_text(updated, encoding="utf8")
        changed += n
        print("%-14s %d reference(s)" % (name, n))

print("site URL is now %s (%d references)" % (new, changed))
