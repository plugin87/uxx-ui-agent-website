#!/bin/bash
# Assemble the deployable site into dist/.
#
# The repo carries both the landing page and the ux-ui-agent-skills kit it was
# built with (tokens/, components/, scripts/, CLAUDE.md ...). Only the page
# belongs on the CDN, so the build copies the web files and leaves the engine
# in the repo where it is useful to a reader.
#
# Cloudflare Pages: build command `bash tools/build.sh`, output directory `dist`.
set -e
cd "$(dirname "$0")/.."

rm -rf dist
mkdir -p dist

cp index.html about.html 404.html robots.txt sitemap.xml llms.txt _headers _redirects dist/
cp -R public images dist/

# the dev-only bits never reach the CDN
rm -f dist/public/*.bak dist/images/.DS_Store dist/images/*/.DS_Store

# long-lived asset caches are only safe when the URL changes with the file
python3 tools/fingerprint.py

echo "dist/ built:"
du -sh dist
find dist -type f | wc -l | xargs echo "files:"
