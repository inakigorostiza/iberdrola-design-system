# Iberdrola — Logo Usage

The master brand asset is the **full lockup**: the *125* anniversary numeral + the tricolor
flame/leaf symbol + the *iberdrola* wordmark.

## Available files (`brand/logos/`)

| File | Use |
|---|---|
| `iberdrola-logo-full.svg` | Primary, full-color lockup. Default choice on light backgrounds. |
| `iberdrola-logo-mono.svg` | Single-color lockup using `currentColor`. Set CSS `color` for white-on-dark, all-green, or black print. |
| `iberdrola-icon.svg` | Tricolor symbol only. App icons, favicons, avatars, tight spaces. |
| `iberdrola-wordmark.svg` | Wordmark only. Rare — pair with the symbol whenever possible. |

## Color the mono logo

```html
<span style="color:#fff">        <!-- white on dark -->
  <!-- inline the SVG or use <img> with a filter -->
</span>
```
Because `iberdrola-logo-mono.svg` uses `fill="currentColor"`, inlining it and setting `color`
recolors the whole mark in one property.

## Clear space
Keep free space around the logo equal to the **height of the flame symbol** on all sides.
Nothing (text, images, edges) may enter this zone.

## Minimum size
- Full lockup: **≥ 120px** wide on screen (≥ 24mm print).
- Icon only: **≥ 24px**.
Below these sizes switch to the icon-only mark.

## Backgrounds
- **Light / white:** full-color lockup (default).
- **Photography:** place on a calm, low-detail area; if busy, use the mono white version or add a
  subtle scrim. Never place the full-color logo on a clashing background.
- **Dark / forest green (`--ib-green-900`):** use the mono logo set to white, or the full-color
  lockup only where contrast of all three symbol colors remains legible.

## Misuse — never
- ❌ Recolor the wordmark or symbol outside the brand palette.
- ❌ Stretch, skew, rotate, or add effects (shadows, bevels, outlines).
- ❌ Rearrange, resize, or separate the *125*, symbol, and wordmark relative to one another.
- ❌ Place on low-contrast or visually noisy backgrounds.
- ❌ Re-typeset the wordmark in another font.

## Note on the "125"
The *125* is the **125th-anniversary** commemorative element. For an evergreen (non-anniversary)
mark, use the symbol + wordmark portion of the lockup only.
