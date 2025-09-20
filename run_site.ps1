# Run the Melbourne Hunt static site via Python http.server
# Usage: powershell -ExecutionPolicy Bypass -File .\run_site.ps1 [-Port 8000]
param(
  [int]$Port = 8000
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$sitePath = Join-Path $root 'site'
if(!(Test-Path $sitePath)) {
  Write-Error "Site directory not found: $sitePath"; exit 1
}

Write-Host "Serving 'site' directory at http://localhost:$Port/ (Ctrl+C to stop)" -ForegroundColor Cyan
Write-Host "Opening browser..." -ForegroundColor DarkGray

# Launch server in current process so Ctrl+C stops it
try {
  Start-Process "http://localhost:$Port/" | Out-Null
  python -m http.server "$Port" -d site
} catch {
  Write-Error "Failed to start Python http.server. Ensure Python is on PATH."; exit 1
}
