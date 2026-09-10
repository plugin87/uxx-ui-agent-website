#!/bin/bash
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
IDX="$1"; N="$2"
PROFILE="/tmp/dscap/profile-$IDX"; mkdir -p "$PROFILE"
i=0
for name in linear-app openai claude canva tesla mastercard ibm nvidia lamborghini ferrari starbucks renault; do
  if [ $((i % N)) -ne "$IDX" ]; then i=$((i+1)); continue; fi
  i=$((i+1))
  url=$(awk -v n="$name" -F'\t' '$1==n{print $2}' tools/design-systems.tsv)
  [ -z "$url" ] && continue
  png="/tmp/dscap/$name.png"
  "$CH" --headless=old --disable-gpu --hide-scrollbars --no-first-run --no-default-browser-check \
    --disable-extensions --disable-background-networking --user-data-dir="$PROFILE" \
    --window-size=1280,800 --virtual-time-budget=22000 --screenshot="$png" "$url" >/dev/null 2>&1 &
  pid=$!; t=0
  while kill -0 $pid 2>/dev/null && [ $t -lt 60 ]; do sleep 1; t=$((t+1)); done
  kill -9 $pid 2>/dev/null; wait $pid 2>/dev/null
  if [ -s "$png" ]; then sips -Z 720 -s format jpeg -s formatOptions 72 "$png" --out "images/design-systems/$name.jpg" >/dev/null 2>&1; echo "OK $name"; else echo "FAIL $name"; fi
  rm -f "$png"
done
