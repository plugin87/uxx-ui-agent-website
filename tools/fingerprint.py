#!/usr/bin/env python3
"""Stamp every local asset reference in dist/ with a content hash.

Without this the CSS and JS carry a one-day cache and a filename that never
changes, so a deploy that adds markup depending on new CSS reaches a returning
visitor as new HTML over stale styles: the page arrives unstyled and stays that
way until their cache expires. The hash changes whenever the file does, so the
long cache is safe and a change takes effect on the next request.

Runs against dist/ only. The source files keep clean paths for local dev.
"""
import hashlib, pathlib, re, sys

dist = pathlib.Path("dist")
if not dist.is_dir():
    sys.exit("dist/ not built")

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()[:10]

# every asset the pages reference by a public/ path
assets = {}
for f in sorted((dist / "public").glob("*")):
    if f.suffix in {".css", ".js"}:
        assets[f.name] = digest(f)

if not assets:
    sys.exit("no assets found to fingerprint")

pattern = re.compile(r'((?:href|src)=")((?:/)?public/)([A-Za-z0-9_.-]+\.(?:css|js))(")')

stamped = 0
for page in sorted(dist.glob("*.html")):
    text = page.read_text(encoding="utf8")

    def sub(m):
        global stamped
        name = m.group(3)
        if name not in assets:
            return m.group(0)
        stamped += 1
        return "%s%s%s?v=%s%s" % (m.group(1), m.group(2), name, assets[name], m.group(4))

    new = pattern.sub(sub, text)
    if new != text:
        page.write_text(new, encoding="utf8")

# analytics.js and reveal.js are also loaded from inside other assets? they are
# not, but say what was done either way
print("fingerprinted %d reference(s) across %d asset(s)" % (stamped, len(assets)))
for name, h in assets.items():
    print("  %-16s %s" % (name, h))
