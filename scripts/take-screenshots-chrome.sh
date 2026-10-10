#!/bin/bash
set -e

SCREENSHOT_DIR="/Volumes/Rin T705 M2 Drive/GitHub/rin-contact-landing-preview"
mkdir -p "$SCREENSHOT_DIR"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

if [ ! -f "$CHROME" ]; then
  echo "Error: Chrome not found at $CHROME"
  exit 1
fi

echo "Taking screenshots with system Chrome..."

# Desktop light
"$CHROME" --headless --screenshot="$SCREENSHOT_DIR/desktop-light.png" \
  --window-size=1440,900 --force-color-profile=srgb \
  --virtual-time-budget=5000 \
  http://localhost:3000 2>/dev/null || true

sleep 2

# Desktop dark (use prefers-color-scheme via User-Agent CSS)
"$CHROME" --headless --screenshot="$SCREENSHOT_DIR/desktop-dark.png" \
  --window-size=1440,900 --force-color-profile=srgb \
  --force-dark-mode --virtual-time-budget=5000 \
  http://localhost:3000 2>/dev/null || true

sleep 2

# Mobile light
"$CHROME" --headless --screenshot="$SCREENSHOT_DIR/mobile-light.png" \
  --window-size=390,844 --force-color-profile=srgb \
  --virtual-time-budget=5000 \
  http://localhost:3000 2>/dev/null || true

echo "✓ Screenshots saved to: $SCREENSHOT_DIR"
ls -lh "$SCREENSHOT_DIR"
