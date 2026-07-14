# Iberdrola — Display banners

Seven self-contained HTML/CSS display ads at exact IAB standard pixel sizes, all on-brand with the Iberdrola Design System (forest/white backgrounds, logo, short headline, pill CTA, tricolor flame accent).

Open `index.html` for the full gallery preview.

## Sizes

| File | IAB name | Size (px) | Background |
| --- | --- | --- | --- |
| `300x250.html` | Medium Rectangle (MPU) | 300 × 250 | Forest gradient |
| `728x90.html` | Leaderboard | 728 × 90 | White |
| `160x600.html` | Wide Skyscraper | 160 × 600 | Forest gradient |
| `320x50.html` | Mobile Banner | 320 × 50 | Forest gradient |
| `970x250.html` | Billboard | 970 × 250 | Forest gradient |
| `300x600.html` | Half Page | 300 × 600 | Forest gradient |
| `1080x1080.html` | Square (social / paid) | 1080 × 1080 | Forest gradient |

Each file is standalone: fixed `.ad` dimensions, inline `<style>`, brand tokens as literal values, and the brand font pulled from Google Fonts (Figtree) with a `Segoe UI` / `system-ui` fallback. The two light banners (728×90) use the full-color logo; forest banners use the mono logo rendered white.

## Brand ingredients used
- **Forest gradient** `linear-gradient(…, #006B33 0%, #013D28 …)` (matches `--ib-gradient-forest`).
- **Tricolor accent** flame-colored 42/33/25 split bar (`#00A443` / `#0DA9FF` / `#FF9C1A`), plus the tricolor flame icon (`brand/logos/iberdrola-icon.svg`).
- **Pill CTA** `border-radius:999px` — white pill with green text (`#00823A`) on forest, green pill (`#00A443`) with white text on white.
- **Type** Figtree, weights 600/700, tight tracking for headlines.
- **Radii** 8–20 px on the ad frame per size.

## Static export (screenshot each at 1×)
Ad servers (Google Ads, DV360, etc.) often require a **static image** fallback. Export each banner as a PNG at its exact size with headless Chrome:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# One example (repeat per size, matching --window-size to the ad):
"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --window-size=300,250 --default-background-color=00000000 \
  --screenshot=300x250.png --virtual-time-budget=2000 \
  "file://$(pwd)/300x250.html"
```

For **retina / high-DPI** exports add `--force-device-scale-factor=2` (produces a 2× PNG — 600×500 for the 300×250, etc.), then downscale if the platform needs 1×. Set `--window-size` to the exact ad dimensions each time so there is no letterboxing.

Tip: the `.ad` element has rounded corners; if your ad slot needs square corners for the static export, set `border-radius:0` on `.ad` before screenshotting.

## HTML5 / animation note
These are **static** creatives. To animate for HTML5 display:
- Keep total weight and CPU low; animate with **CSS `@keyframes`** on `transform` / `opacity` only (GPU-friendly), or a lightweight timeline lib.
- Respect IAB limits: **≤ 15 s** total animation, **≤ 3 loops**, then rest on a clear end-frame that shows logo + CtA.
- Include `prefers-reduced-motion` handling and always ship a **static fallback** (the PNG export above) as the end-frame.
- For Google Ads HTML5, add the required `<meta name="ad.size" content="width=300,height=250">` tag and the clickTag variable, then package the file + assets in a ZIP.

## Production checklist
- Replace the Google Fonts `@import` with the **self-hosted** Figtree (or the licensed Iberdrola font) for offline/ad-server delivery.
- Inline or bundle the logo SVGs (currently referenced from `../../brand/logos/`) so each creative is a single self-contained package.
- Add the real click-through URL / clickTag per platform.
- Confirm final rendered size matches the slot exactly (no scrollbars, no clipping).
