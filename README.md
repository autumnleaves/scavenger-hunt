# Birthday Love Quest Scavenger Hunt

A customizable, romantic two-player scavenger hunt designed for a birthday celebration. All challenge content lives in `scavenger_hunt.yaml`.

## Quick Start

1. Skim `scavenger_hunt.yaml` today.
2. Gather materials (see `meta.materials_general`).
3. Pre-hide any envelopes / sticky notes for challenges referencing physical placement (notably IDs 1, 9).
4. Decide if you will run challenges strictly sequentially (default) or allow flexibility.
5. Start with Challenge 1 and follow dependency chain through 20.
6. Track points on paper or a simple notes app.

## Structure Overview

`scavenger_hunt.yaml` contains:

- `meta`: Occasion info, theme, materials, timing, safety.
- `categories`: High-level thematic buckets.
- `scoring_modifiers`: Optional bonus logic.
- `challenges`: Ordered list of 20 progressively connected activities.

Each challenge has the following fields:

- `id`: Unique integer and dependency anchor.
- `title`
- `category`
- `description`
- `clue`: Riddle-like pointer to location/action.
- `location_hint`: A softer fallback hint.
- `steps`: Execution instructions.
- `materials`: Items needed (keep nearby to reduce friction).
- `difficulty`: 1 (easy) to 5 (hard) subjective.
- `points`: Base score on success.
- `time_limit_minutes`: Soft target; feel free to relax if enjoying yourselves.
- `verification`: Suggested proof type (photo, video, list). Keep private things private—only capture what you're comfortable with.
- `success_condition`: Minimum to earn base points.
- `romantic_touch`: Tiny add-on to amplify warmth.
- `adaptation_options`: Ways to scale difficulty or adjust context.
- `dependency`: Previous challenge ID required; ensures narrative flow.
- `reflection`: Prompt for a short share or emotional check-in.

## Scoring Suggestions

- Award base points if success condition is met within a reasonable time.
- Use `heartfelt_answer_bonus` (2–8) sparingly for especially sweet, creative, or vulnerable moments.
- Apply `early_completion_bonus` (10%) only if you finish the entire hunt under the `meta.target_duration_minutes`.
- Cap total discretionary/bonus points at ~40 to preserve balance.
- Consider a tiny treat (kiss, chocolate, mini gift) every ~75 cumulative points.

### Example Tally Template

```text
ID | Title                         | Points Earned | Bonus | Cumulative
---|-------------------------------|---------------|-------|----------
 1 | Opening Envelope              | 10            | +0    | 10
 2 | First Photo Flashback         | 15            | +2    | 27
 ...
```

## Preparation Timeline (Suggested)

- Night Before: Print photos (Challenge 2), write compliments (9), create encoded phrase sheet (5), prep riddles (13), write trivia questions (17).
- 1 Hour Before: Hide notes/envelopes, lay out snacks/spices, queue playlist, stage candle & lighter.
- Start Time: Bring energy, set phones mostly aside except when needed for verification.

## Customization Ideas

| Goal | How to Adjust |
|------|---------------|
| Shorter runtime | Skip 2-3 mid-chain activities (e.g., 7, 10, 16) and patch dependencies accordingly. |
| Higher puzzle density | Add another cipher or logic riddle between 5 and 6. |
| Outdoors variant | Replace 14 with a short walk naming 3 sounds you hear. |
| Surprise gift reveals | Insert mini gifts after IDs 5, 11, 15. |
| Extra intimacy | Expand reflection prompts into short written notes kept in an envelope. |
| Competitive twist | Track individual accuracy in riddles/trivia for micro-prizes. |

## Safety & Comfort

- Candle: Never leave unattended; have water nearby or use LED alternative.
- Boundaries: Always skip/modify anything that feels off tonight.
- Recording: Only capture media you're both comfortable saving.

## Shortening / Expanding the Chain

If you remove a challenge, update any later `dependency` values pointing to it so the chain remains intact. For a non-linear mode, set `meta.recommended_order: flexible` and ignore `dependency` fields—just ensure required materials are handy.

## Adding New Challenges

Use this template:

```yaml
- id: <next_integer>
  title: <Short Name>
  category: <One of existing or new>
  description: <1-line summary>
  clue: <Primary clue>
  location_hint: <Fallback hint>
  steps:
    - <Step 1>
    - <Step 2>
  materials: [list, of, items]
  difficulty: 1
  points: 10
  time_limit_minutes: 5
  verification: photo_or_text
  success_condition: <Completion rule>
  romantic_touch: <Optional sweetener>
  adaptation_options:
    - "Option A"
  dependency: <previous id or null>
  reflection: <Prompt>
```

Ensure the total potential points roughly match the target (currently 300 base + bonuses).

## Ending the Experience

Challenge 20 wraps with a gift + toast + hug. Consider closing by revisiting the haiku (Challenge 19) and reading it again slowly.

## Optional Post-Hunt Keepsake

Compile photos/screenshots into a single 'Birthday Love Quest' album with captions quoting reflections.

## Troubleshooting

| Issue | Quick Fix |
|-------|-----------|
| Time running long | Drop one upcoming creative challenge; proceed. |
| Low energy dip | Insert a snack break or skip to a movement-based task (6 or 14). |
| Clue confusion | Provide location_hint immediately to keep flow playful. |
| Points feel lopsided | Add a discretionary +5 for any especially meaningful share. |

## Melbourne CBD Variant (Less-Saccharine Urban Exploration)

A separate file `scavenger_hunt_melbourne.yaml` provides a 3-hour(ish) city route version centered on Melbourne’s CBD. Tone is more observational and culture-forward, with subtle collaborative moments instead of overt romantic cues.

### Key Differences

- Duration target: ~180 minutes (vs 150 in original) with built-in walk transitions.
- 11 main challenges + optional side quests (S1–S3) instead of 20 linear indoor-style tasks.
- Field `romantic_touch` replaced by `plus_factor` (small enrichment or micro bonus opportunity).
- Emphasis on: street art, arcades, coffee culture, architectural detail, perspective shifts, micro literary + flavor notes.
- Bonus system: finish-under-time threshold + collaborative insight bonuses; style cap to prevent runaway scoring.

### Route Outline (Default Order)

1. Federation Square – orientation snapshot
2. Hosier Lane – street art prompt set
3. Degraves / Centre Place – coffee micro review
4. Royal or Block Arcade – heritage detail decode
5. Independent bookshop – typography pick + micro plot
6. State Library Reading Room – perspective pair
7. Yarra edge – transient phenomena list
8. Rooftop / upper-level vantage – contrast capture
9. Hidden cozy stop – mini social rule
10. Tram hop – silent vignette gathering
11. Dessert / gelato wrap – vibe word score + closure

Side Quests (optional, once each): textured laneway macro, busker appreciation, hidden green pocket.

### Adapting For Another City

- Swap street art lane with a local mural cluster.
- Replace arcades with historic market or gallery corridor.
- Bookshop step can shift to record store (judge album art typography instead).
- River segment can become waterfront / park perimeter / harbor edge.
- Rooftop can be any elevated legal vantage (library terrace, multi-level car park with permission).

### Weather Adjustments

Refer to `weather_adaptations` in the variant YAML; heavy rain path substitutes indoor cultural stops (museum foyer, gallery) and keeps observational spirit via interior patterns, sound mapping, or people-flow studies.

### Quick Start for the Variant

1. Meet at Federation Square steps.
2. Skim the variant file; note time boxes but treat them as guides, not stress triggers.
3. Track base points + any plus factors in a lightweight note.
4. Decide beforehand if you’ll aggressively chase side quests or let them occur organically.
5. Use headphones sparingly—keep environmental awareness high.

### Light Reflection Close

Use the final dessert moment to bring back the initial vibe words and decide if they held or if a better emergent theme surfaced.

Enjoy the celebration—have fun, stay present, and adapt freely to the mood of the evening. Happy birthday to your partner! 🎉❤️
