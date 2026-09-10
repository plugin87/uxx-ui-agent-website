#!/usr/bin/env python3
"""Generate the JSON-LD block in index.html from the page's own content.

Answer engines penalise markup that disagrees with the visible page, so the
FAQ schema is read out of the rendered FAQ section rather than typed twice.
Run after editing the FAQ.
"""
import json, re, html, sys

SITE = "https://skills.designlazyyy.com"
src = open("index.html", encoding="utf8").read()

# --- read the visible FAQ ------------------------------------------------
def strip_tags(fragment):
    text = re.sub(r"<[^>]+>", "", fragment)
    return html.unescape(" ".join(text.split()))

items = re.findall(r'<dt>(.*?)</dt>\s*<dd>(.*?)</dd>', src, re.S)
if not items:
    sys.exit("no FAQ items found in index.html")

faq = {
    "@type": "FAQPage",
    "@id": SITE + "/#faq",
    "mainEntity": [
        {
            "@type": "Question",
            "name": strip_tags(q),
            "acceptedAnswer": {"@type": "Answer", "text": strip_tags(a)},
        }
        for q, a in items
    ],
}

# --- read the visible how-to steps ---------------------------------------
# scoped to the <ol class="steps"> so it cannot pick up an <h3> from another
# section that happens to come earlier in the document
steps_block = re.search(r'<ol class="steps".*?</ol>', src, re.S)
if not steps_block:
    sys.exit("no <ol class=\"steps\"> found in index.html")
steps = re.findall(r'<h3>(.*?)</h3>\s*<p>(.*?)</p>', steps_block.group(0), re.S)
howto = {
    "@type": "HowTo",
    "@id": SITE + "/#how-to-use",
    "name": "How to use UX/UI Agent Skills",
    "totalTime": "PT2M",
    "step": [
        {
            "@type": "HowToStep",
            "position": i + 1,
            "name": strip_tags(n),
            "text": strip_tags(t),
            "url": SITE + "/#how-to-use",
        }
        for i, (n, t) in enumerate(steps)
    ],
}

software = {
    "@type": "SoftwareApplication",
    "@id": SITE + "/#software",
    "name": "UX/UI Agent Skills",
    "alternateName": "ux-ui-agent-skills",
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Design system tooling",
    "operatingSystem": "macOS, Linux, Windows",
    "url": SITE + "/",
    "codeRepository": "https://github.com/plugin87/ux-ui-agent-skills",
    "downloadUrl": "https://www.npmjs.com/package/ux-ui-agent-skills",
    "installUrl": "https://www.npmjs.com/package/ux-ui-agent-skills",
    "softwareVersion": "2.5.1",
    "license": "https://opensource.org/licenses/MIT",
    "isAccessibleForFree": True,
    "author": {"@type": "Person", "name": "plugin87", "url": "https://github.com/plugin87"},
    "description": ("A kit of structured instructions, DTCG design tokens, 50 component specs, "
                    "17 runnable skills and 138 brand-grade design systems that turns Claude into "
                    "a UX/UI expert agent, targeting any framework and any design system."),
    "featureList": [
        "DTCG design tokens on a three-tier architecture",
        "50 component specs with the eight states and accessibility specs",
        "Code generation for any framework via the Adapter Protocol",
        "138 brand-grade design systems",
        "WCAG 2.2 AA enforcement through 37 objective gates",
        "17 runnable skills invoked as slash commands",
    ],
    "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"},
    "requirements": "Claude Code or any Claude-powered IDE",
}

website = {
    "@type": "WebSite",
    "@id": SITE + "/#website",
    "url": SITE + "/",
    "name": "UX/UI Agent Skills",
    "inLanguage": "en",
    "publisher": {"@id": SITE + "/#person"},
    "about": {"@id": SITE + "/#software"},
}

person = {
    "@type": "Person",
    "@id": SITE + "/#person",
    "name": "plugin87",
    "url": "https://github.com/plugin87",
}

graph = {"@context": "https://schema.org", "@graph": [website, person, software, faq, howto]}
block = json.dumps(graph, indent=2, ensure_ascii=False)

new = '  <script type="application/ld+json">\n' + block + '\n  </script>\n'
pattern = re.compile(r'  <script type="application/ld\+json">.*?</script>\n', re.S)
if not pattern.search(src):
    sys.exit("no existing JSON-LD block to replace")
open("index.html", "w", encoding="utf8").write(pattern.sub(new, src, count=1))

print("JSON-LD rebuilt: %d FAQ answers, %d how-to steps" % (len(faq["mainEntity"]), len(howto["step"])))
