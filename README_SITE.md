# Melbourne Hunt Web App (v3.6 Local)

Mobile‑first, zero‑dependency (no build step) tracker for the Melbourne CBD birthday scavenger hunt. Pure HTML/CSS/JS + localStorage. This version intentionally rolls back an experimental realtime backend so it works fully offline again.

## Features

- 14 challenges / 32 targets (per‑target scoring)
- Two players (Tom & Mon) each tick targets independently
- Quick cycle button per target (none → Tom → Mon → both → none)
- Player chips for direct toggling
- Location pill with Google Maps link + detailed modal view (primary, suggested, backups)
- Target detail modal (Enter / click row) with rich descriptions
- Cooperative challenges flagged (e.g. #10, #14)
- Skip toggle per challenge
- Automatic completion bonus (+2 for each) after ≥10 fully completed challenges (all targets by both, not skipped)
- Progress bars & All / Remaining filter
- Long‑press any challenge title (650ms) to collapse/expand all
- Confetti celebration when bonus triggers
- Accessible focus & keyboard interactions (Enter/Space opens details)
- Pure local persistence (localStorage) — no server required

Removed (compared to early drafts): Export / Import / Reset buttons (kept code lean). Realtime sync backend experiment has been retired for now; see “Re‑introducing Sync Later”.

## Directory

```text
site/
  index.html
  assets/
    style.css
    script.js
```

## Deployment (GitHub Pages)

Two options:

### 1. (Recommended) GitHub Actions Workflow (auto)

Already included: `.github/workflows/deploy.yml` which publishes the `site/` folder on every push to `main`.

Enable Pages once:
1. Repo Settings → Pages → Build and deployment → Source: GitHub Actions.
2. Save. First push to `main` (or manual Run workflow) will publish.
3. Final URL: `https://<username>.github.io/<repo>/` (root of the Pages site serves contents of `site/`).

Artifacts: The action uploads `site/` as a Pages artifact, then deploys with official `deploy-pages` action. A `.nojekyll` file prevents unwanted Jekyll processing.

### 2. Branch Folder (manual legacy)

If you prefer without Actions: Settings → Pages → Source: `Deploy from a branch`, Branch: `main`, Folder: `/site`.

### Cache Busting Tip

If you make rapid JS/CSS edits and want to ensure clients get the latest, append a version query to asset links (e.g., `style.css?v=3.6.1`). For this simple static setup you can also rely on hard refresh (Ctrl+F5).

## Data Model

```json
State = {
  "version": "3.6",
  "bonusAwarded": false,
  "challenges": [
    { "id": 1, "skipped": false, "targets": [ { "Tom": false, "Mon": false }, ... ] },
    ...
  ]
}
```

Exported JSON matches this schema.

## Versioning

Increment `huntData.version` in `script.js` when you materially change the challenge or target list. Saved progress from older versions is automatically ignored (fresh state created). Current version: 3.6.

## Customisation

- Add players: extend `huntData.players` (then modify `defaultState()` to include new keys per target).
- Colour scheme: adjust CSS variables near top of `style.css`.
- Timestamps / history: add fields inside toggle handlers before `saveState()`.
- Extra metadata: augment challenge objects (e.g., difficulty) and display in render loop.

## Completion Bonus Logic

One‑time +2 for both players once ≥10 challenges are fully completed (every target ticked by both and not skipped). Progress live‑updates; confetti fires exactly when awarded.

## Accessibility Notes

- Visible focus outlines & colour shifts on interactive elements.
- Target detail modal is keyboard dismissible (Esc) and trap‑free (simple overlay deletion) keeping page scroll position.
- Long‑press is additive; standard buttons remain explicit.
- Potential future enhancement: add `aria-expanded` to collapse toggles & focus return after modal close.

## Re‑introducing Sync Later (Optional)

Earlier we experimented with a lightweight Node/Express polling backend for multi‑device live sync. It was removed to simplify running on any phone instantly. If you want it back:

1. Recreate a `server/` folder with an Express app exposing `/state`, `/toggle{,Cycle}`, `/skip`.
2. Add a polling fetch in `script.js` guarded by a query param (e.g., `?sync=1`).
3. On each local change, POST delta and optimistically update UI.
4. Keep localStorage as fallback if server unreachable.

Potential future upgrades if reintroduced: WebSocket push, optimistic conflict markers, presence indicators.

## Future Ideas (Local Mode)

- Offline PWA manifest + install banner
- Optional export/import reinstated as advanced panel
- Dark / light theme toggle
- Timestamped activity log / share sheet
- Web share target for quick photo attaching notes (manual linking)

## License

Personal use for your scavenger hunt; no external dependencies.
