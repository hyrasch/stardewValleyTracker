# Stardew Valley Bundle Tracker

A static web app that tracks the Community Center bundles of a heavily modded
Stardew Valley 1.6 install. It is built for the bundle set actually in effect in
this install: the **Custom Cornucopia RSV SVE** variant of
*Custom Community Center Bundles* (CCCB), which mixes vanilla items with
Stardew Valley Expanded, Ridgeside Village and Cornucopia items.

## Running it

No build step. Serve the folder with any static server and open it:

```bash
python -m http.server 8765
```

Then visit <http://localhost:8765>. Opening `index.html` directly also works in
most browsers. Progress is stored in the browser's `localStorage`; use
**Export** / **Import** in the toolbar to move it between browsers.

## Views

- **Overview** – progress per room, items that are "last chance" for the
  selected season, items that need rain, and items shared by several bundles.
- **Bundles** – every room and bundle with per-item requirements (quantity,
  quality, how and where to get it). Tick items as you donate them.
- **Planner** – the same requirements grouped the way you play: by condition
  (rainy days, sunny-only, nights, time windows, specific calendar days, areas
  that need unlocking), by season, by location or by activity.
- **Items** – a searchable table of all 198 items.

The toolbar's **Season**, **Weather** and **Only what I can do now** controls
filter and highlight everything by what is currently possible.

## Data

- `js/data.js` – the 48 bundles (from the CCCB pack's `content.json`) and the
  acquisition data for every item. Entries flagged `unsure: true` show a
  "verify" badge: their source could not be confirmed in the mod data files.
- `scripts/extract_mod_data.py` – reads the SVE / Ridgeside / Cornucopia
  Content Patcher and Farm Type Manager files to pull names, fish spawn rules,
  crop seasons, recipes, machine rules, forage spawns and shop listings for the
  mod items. Usage:

  ```bash
  python -I scripts/extract_mod_data.py "<path to Stardew Valley>/Mods" out.json
  ```

  Note: Vortex deploys mods as symlinks, so the script follows links.

## Adjusting

If the bundle pack changes, update `ROOMS` in `js/data.js`. The format mirrors
the pack: each bundle has a reward, the number of items required (`need`) and
its item slots (`id`, `qty`, quality `q` where 2 = gold).
