#!/bin/bash
# Installs everything a render needs: ffmpeg (apt) and the npm packages.
# Works from any folder. `npm run preview/reel` run this by themselves when something is missing,
# so no Claude "environment" settings are needed.
set -e
cd "$(dirname "$0")"
if ! command -v ffmpeg >/dev/null 2>&1; then
  if [ "$(id -u)" = "0" ]; then SUDO=""; else SUDO="sudo"; fi
  $SUDO apt-get update -y || true
  $SUDO apt-get install -y --no-install-recommends ffmpeg
fi
if [ ! -d node_modules ]; then
  npm ci --no-audit --no-fund
fi
ffmpeg -version | head -n 1
echo "Setup done. Ab chalao: npm run preview -- <naam>"
