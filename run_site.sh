#!/usr/bin/env bash
# Run the Melbourne Hunt static site via Python http.server
# Usage: ./run_site.sh [PORT]
set -euo pipefail
PORT="${1:-8000}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"
if [ ! -d site ]; then
  echo "Site directory not found" >&2
  exit 1
fi
echo "Serving site on http://localhost:${PORT}/ (Ctrl+C to stop)"
python -m http.server "${PORT}" -d site
