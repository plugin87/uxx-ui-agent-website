#!/bin/bash
# Capture design-system homepages as JPEG tiles.
# Usage: tools/capture.sh <worker-index> <worker-count>
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
IDX="${1:-0}"; N="${2:-1}"
PROFILE="/tmp/dscap/profile-$IDX"
mkdir -p "$PROFILE" images/design-systems
i=0
while IFS=$'\t' read -r name url; do
  [ -z "$name" ] && continue
  if [ $((i % N)) -ne "$IDX" ]; then i=$((i+1)); continue; fi
  i=$((i+1))
  out="images/design-systems/$name.jpg"
  [ -s "$out" ] && { echo "SKIP $name"; continue; }
  png="/tmp/dscap/$name.png"
  "$CH" --headless=old --disable-gpu --hide-scrollbars --no-first-run \
    --no-default-browser-check --disable-extensions --disable-background-networking \
    --user-data-dir="$PROFILE" --window-size=1280,800 --virtual-time-budget=9000 \
    --screenshot="$png" "$url" >/dev/null 2>&1 &
  pid=$!
  t=0
  while kill -0 $pid 2>/dev/null && [ $t -lt 40 ]; do sleep 1; t=$((t+1)); done
  kill -9 $pid 2>/dev/null
  wait $pid 2>/dev/null
  if [ -s "$png" ]; then
    sips -Z 720 -s format jpeg -s formatOptions 72 "$png" --out "$out" >/dev/null 2>&1
    [ -s "$out" ] && echo "OK   $name" || echo "CONV $name"
  else
    echo "FAIL $name"
  fi
  rm -f "$png"
done < tools/design-systems.tsv
