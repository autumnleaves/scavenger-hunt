# Melbourne Hunt Web App (v3.5)

A lightweight static, mobile-first tracker for the Melbourne scavenger hunt. Built with plain HTML/CSS/JS so it can deploy directly via GitHub Pages.

## Features

- Dynamic rendering of 14 challenges / 32 targets
- Per-target ticking for two players (Tom & Mon)
- Cooperative challenge identification (#10, #14)
- Skip toggle per challenge
- Automatic completion bonus (+2) when both fully finish ≥10 challenges
- Local persistence (localStorage)
- Export / Import progress JSON
- Filter (All vs Remaining) & challenge-level progress bars
- Long-press a challenge title to collapse/expand all

## Directory

```text
site/
  index.html
  assets/
    style.css
    script.js
```

## Deployment (GitHub Pages)

1. Commit and push the `site` directory to `main` (already present).
2. In the repository settings: Pages -> Build from root `/ (main)` or choose `/root` depending on GitHub UI; simplest: move contents into `/docs` if you prefer auto-detection.
3. If using `site/` specifically, you can:
   - Settings -> Pages -> Source: `Deploy from a branch`
   - Branch: `main` and Folder: `/site`
4. Save; wait for Pages to build (1–2 mins). URL: `https://<username>.github.io/<repo>/`.

## Data Model

```json
State = {
  "version": "3.5",
  "bonusAwarded": false,
  "challenges": [
    { "id": 1, "skipped": false, "targets": [ { "Tom": false, "Mon": false }, ... ] },
    ...
  ]
}
```

Exported JSON matches this schema.

## Versioning

If you update the hunt (e.g., new targets), increment `huntData.version` in `script.js` to avoid loading stale saved state. Old saved state will be discarded automatically when version mismatch occurs.

## Customisation

- Add players: adjust `huntData.players` and state shape logic (extend target objects to include new player keys).
- Change colour scheme: tweak CSS variables at top of `style.css`.
- Add timing or timestamps: append timestamp fields to target toggle logic.

## Completion Bonus Logic

The app auto-awards a one-time +2 points to both players once *at least 10* challenges are fully completed by both (all targets ticked, not skipped). Progress toward this threshold is shown near the scores.

## Accessibility Notes

- Buttons have clear focus states via colour shift.
- Collapse controls are explicit; long-press is an enhancement, not required.
- Further improvement: add ARIA-expanded on collapse toggles (future enhancement).

## Future Enhancements (Ideas)

- Offline PWA manifest + service worker
- Timestamp log & timeline export
- Dark/light theme toggle
- Player avatar initials instead of text labels

## License

Personal use for your scavenger hunt; no external dependencies.
