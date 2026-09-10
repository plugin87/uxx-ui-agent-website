#!/usr/bin/env python3
"""Render the social card and the favicon set from the page's own design.

Both are screenshots of real HTML rendered in headless Chrome, so they use the
same tokens, the same pixel mark and the same type as the site itself.
"""
import os, subprocess, shutil, sys, glob, time

CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP = "/tmp/gen"
os.makedirs(TMP, exist_ok=True)

def shot(html_path, out_png, w, h):
    """Chrome occasionally never exits on a fresh profile, so it gets a leash."""
    if os.path.exists(out_png):
        os.remove(out_png)
    proc = subprocess.Popen([CH, "--headless=old", "--disable-gpu", "--hide-scrollbars",
                             "--no-first-run", "--no-default-browser-check",
                             "--disable-extensions", "--disable-background-networking",
                             "--user-data-dir=" + TMP + "/profile",
                             "--window-size=%d,%d" % (w, h),
                             "--virtual-time-budget=6000",
                             "--screenshot=" + out_png,
                             "http://localhost:3000/" + html_path],
                            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(45):
        if proc.poll() is not None:
            break
        time.sleep(1)
    if proc.poll() is None:
        proc.kill()
        proc.wait()
    return os.path.exists(out_png) and os.path.getsize(out_png) > 0

mark = open("public/favicon-pixel.svg").read()

# ---- social card -------------------------------------------------------
tiles = sorted(glob.glob("images/design-systems/*.jpg"))[:24]
strip = "".join('<img src="/%s">' % t for t in tiles)
open("tools/_og.html", "w").write("""<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="/public/styles.css"><link rel="stylesheet" href="/public/theme.css">
<link rel="stylesheet" href="/public/site.css">
<style>
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:var(--color-surface-sunken)}
.card{position:relative;width:1200px;height:630px;display:flex;flex-direction:column;justify-content:space-between}
.top{padding:64px 64px 0}
.brand{display:flex;align-items:center;gap:16px;margin-bottom:44px}
.brand svg{width:56px;height:56px;image-rendering:pixelated}
.brand span{font-family:var(--font-pixel);font-size:15px;letter-spacing:.06em;color:#fff;text-transform:uppercase;line-height:1.3}
h1{font-family:var(--font-sans);font-size:74px;font-weight:700;letter-spacing:-2px;line-height:1;color:#fff;margin:0 0 22px;max-width:19ch}
p{font-family:var(--font-sans);font-size:24px;line-height:1.4;color:var(--color-text-secondary);margin:0;max-width:44ch}
.strip{display:flex;gap:12px;padding:0 0 40px 64px}
.strip img{width:150px;height:94px;object-fit:cover;object-position:top center;border-radius:8px;flex-shrink:0}
</style></head><body data-theme="dark"><div class="card">
<div class="top"><div class="brand">%s<span>UX/UI<br>Agent Skills</span></div>
<h1>Turn Claude into a Senior Design Architect.</h1>
<p>Design tokens, 50 component specs, WCAG 2.2 gates, 138 design systems and code for any framework.</p></div>
<div class="strip">%s</div></div></body></html>""" % (mark.replace('#0B0B0C', '#FFFFFF').replace('#FFFFFF', '#0B0B0C', 1) if False else mark, strip))

ok = shot("tools/_og.html", TMP + "/og.png", 1200, 630)
if ok:
    os.makedirs("images/Meta", exist_ok=True)
    subprocess.run(["sips", "-s", "format", "png", TMP + "/og.png",
                    "--out", "images/Meta/og-card.png"], capture_output=True)
    print("images/Meta/og-card.png written")

# ---- favicons ----------------------------------------------------------
for size, name in [(16, "favicon-16.png"), (32, "favicon-32.png"),
                   (96, "favicon-96.png"), (180, "favicon-touch.png")]:
    open("tools/_fav.html", "w").write("""<!DOCTYPE html><html><head><meta charset="utf-8">
<style>html,body{margin:0;width:%dpx;height:%dpx;overflow:hidden}
svg{display:block;width:%dpx;height:%dpx;image-rendering:pixelated}</style></head><body>%s</body></html>"""
                                       % (size, size, size, size, mark))
    if shot("tools/_fav.html", TMP + "/f%d.png" % size, size, size):
        shutil.copy(TMP + "/f%d.png" % size, "images/Favicon/" + name)
        print("images/Favicon/%s written" % name)

for f in ("tools/_og.html", "tools/_fav.html"):
    if os.path.exists(f):
        os.remove(f)
