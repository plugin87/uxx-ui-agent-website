# uxx-ui-agent-website

The landing page for [ux-ui-agent-skills](https://github.com/plugin87/ux-ui-agent-skills),
built with the kit it is advertising.

Static HTML, no framework, no build step for development. The scroll
choreography comes from a portfolio template; everything on top of it, the
proof strip, the design-system wall, the how-to-use section and the install
block, is new and driven by the kit's own design tokens.

## Local

```
python3 tools/serve.py 3000      # sends no-store, so edits show on reload
```

Then open http://localhost:3000.

## Deploy (Cloudflare Workers)

The project was created as a Worker, not a Pages project, so it deploys with
`wrangler` reading `wrangler.jsonc`. In the dashboard:

| Setting | Value |
|---|---|
| Build command | `bash tools/build.sh` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

The build has to run first, because `wrangler.jsonc` serves `./dist` and
nothing else. With the build command left as `None` the deploy fails on a
missing directory.

Custom domain: add it under the Worker's **Domains** tab, then point the site
at it in one command.

```
python3 tools/set_domain.py skills.designlazyyy.com
```

That rewrites the canonical URL, the sitemap, the OG tags and `robots.txt`
together, so they cannot drift apart.

`tools/build.sh` copies only the web files into `dist/`. The kit itself
(`tokens/`, `components/`, `scripts/`, `CLAUDE.md` and the rest) stays in the
repo, where it is the point, but never reaches the CDN.

`_headers` sets the cache policy and the security headers, `_redirects` folds
`/index.html` and `/about` onto their canonical URLs, and `404.html` is served
for anything else (`not_found_handling: "404-page"`). All three are copied into
`dist/` by the build.

> The canonical URL, the sitemap and the OG tags are all set to
> `https://skills.designlazyyy.com`. Change that one string in
> `robots.txt`, `sitemap.xml`, `index.html` and `about.html` if a custom
> domain is attached.

## Built with the kit

The page is not just about the kit, it is gated by it. Every value in
`public/site.css` resolves through `public/theme.css`, which is generated from
`tokens/*.json`.

```
python3 tools/build_theme.py                        # tokens/*.json -> public/theme.css
python3 scripts/lint_hardcodes.py public/site.css   # no hex, px or timing off the theme
python3 scripts/validate_theme_refs.py public/theme.css public/site.css
python3 scripts/check_no_emoji.py index.html about.html public/site.css
python3 scripts/validate_contrast.py                # WCAG 2.2, light and dark
node    scripts/verify_responsive.mjs index.html    # no sideways scroll at 280/320/414
```

Two real bugs came out of running these against the page: `--space-2.5` is not
a legal custom-property name, so every half-step token was failing silently,
and a `<pre>` in a grid item without `min-width: 0` was scrolling the whole
document sideways on a phone.

## The design-system wall

`images/design-systems/` holds 61 homepage screenshots, captured locally with
headless Chrome. They are the live web, not mockups.

```
./tools/capture.sh 0 1        # capture everything in tools/design-systems.tsv
python3 tools/build_wall.py   # regenerate the wall markup in index.html
python3 tools/build_meta.py   # regenerate the social card and the favicon set
```

77 of the library's 138 entries have no screenshot: most are aesthetic
archetypes with no address, and a handful of hosts answer a headless browser
with a consent wall. Those are listed by name instead of shown.

## License

MIT. The screenshots are of third-party websites and remain the property of
their owners; they are used here to illustrate the design systems the kit
specs.
