# Iberdrola — Email templates

Table-based, inline-styled HTML emails that match the Iberdrola Design System. Three ready-to-adapt templates plus this guide.

| File | Purpose |
| --- | --- |
| `newsletter.html` | Monthly newsletter — logo header, forest hero, 3 content cards/articles, app CTA, full footer. |
| `promo.html` | Bold forest-green promotional email — big `-50%` offer, prominent CTA, urgency line, footer. |
| `transactional.html` | Confirmation email — "Tu contrato Plan Online está activo", summary table, support contact, footer. |

## Why the code looks the way it does

Email clients are not browsers. Gmail, Outlook (Word rendering engine), Yahoo and others strip `<head>` CSS, ignore CSS variables, drop `<style>` blocks and have patchy support for flexbox, grid, `float`, `position` and even `padding` on some elements.

The templates therefore follow the email-safe rules below.

### 1. Inline styles with literal hex values
Every visual style lives in a `style=""` attribute on the element, using **literal hex colors** — CSS custom properties (`var(--ib-*)`) do not work in email. The `<style>` block in `<head>` is **progressive enhancement only** (a mobile media query); the layout is fully functional without it.

Token → inline hex mapping used across the templates:

| Design token | Inline hex | Used for |
| --- | --- | --- |
| `--ib-green-500` (primary) | `#00A443` | CTA button fill, accents |
| `--ib-green-700` (hover/link) | `#00823A` | Links, "leer más", phone/email |
| `--ib-green-900` (deep forest) | `#004A2F` | Tint-panel headings |
| `--ib-green-950` (forest band) | `#013D28` | Hero + footer backgrounds |
| `--ib-green-800` | `#006B33` | Top of forest gradient |
| `--ib-orange-500` (accent) | `#FF9C1A` | Urgency bar, offer number, badges |
| `--ib-orange-600` | `#E8850A` | Peach-card label text |
| `--ib-blue-500` (accent) | `#0DA9FF` | Tricolor bar, blue label |
| `--ib-blue-600` | `#008FE0` | Sky-card label text |
| `--ib-neutral-900` (ink) | `#1A1A1A` | Headings |
| `--ib-neutral-700` (body) | `#333333` | Body copy |
| `--ib-neutral-500` (muted) | `#6B7280` | Secondary copy |
| `--ib-neutral-400` | `#9DA29A` | Legal fine print |
| `--ib-neutral-200` (border) | `#E1E3DE` | Card borders, table rules |
| `--ib-neutral-100` | `#EEEFEC` | Header divider |
| `--ib-neutral-50` (off-white) | `#F6F7F5` | Page background, summary card |
| `--ib-tint-mint` | `#E8F3EC` | Mint panels, success badge |
| `--ib-tint-peach` | `#FCEFE3` | Peach card |
| `--ib-tint-sky` | `#E7F4FC` | Sky card / info panel |
| `--ib-tint-sand` | `#FBF6EC` | Sand accents |
| forest text on dark | `#D9E5DE` | Body copy on forest bands |
| muted on dark | `#9FB8AC` | Footer legal on forest |
| `--ib-gradient-forest` | `linear-gradient(160deg,#006B33 0%,#013D28 100%)` | Hero background (with `bgcolor="#013D28"` fallback) |
| brand font | `Figtree,'Segoe UI',Arial,sans-serif` | All text (Arial is the web-safe fallback) |

Radii: pill buttons/badges use `border-radius:999px`; cards use `16px` (lg); the outer container uses `16px`.

### 2. 600px max width
The main content table is `width="600"` with `max-width:600px` — the industry-standard safe width that fits every desktop preview pane and scales down fluidly. The mobile media query collapses two-column rows to full width (`.ib-stack`) and reduces padding.

### 3. Images must be hosted
There are **no local images** in these templates. Two techniques are used for image areas:

- **Logo** — inline SVG (`brand/logos/*.svg`) is referenced so the preview looks right. **SVG does NOT render in Gmail, Outlook or most clients.** For production, export the logo to a **hosted PNG** (retina @2x, e.g. 264×132 served at 132×66) and swap the `<img src>` to the absolute `https://` URL. Each logo has an HTML comment marking the swap.
- **Photos / hero art** — represented by a table cell with a brand-tint `bgcolor` and a centered label. Each is marked with an `<!-- IMAGE SLOT -->` comment. For production, replace the cell with `<img src="https://…" width="…" alt="…" style="display:block;">`. Always host on a CDN with absolute URLs, set explicit `width`/`height`, and include meaningful `alt` text (many clients block images by default).

Buttons are **bulletproof** (styled `<td bgcolor>` + padded `<a>`), so they render even with images off.

### 4. Other safeguards baked in
- `role="presentation"` on all layout tables (accessibility).
- Hidden **preheader** text after `<body>` controls the inbox preview snippet.
- `<!--[if mso]>` PixelsPerInch fix for Outlook scaling.
- `mso-hide:all`, `mso-table-lspace/rspace:0` for Outlook.
- HTML entities (`&#8594;`, `&#8364;`, `&#169;`) instead of raw glyphs for encoding safety.
- `color-scheme: light only` to avoid forced dark-mode color inversion.

## Testing advice
Preview panes lie — always test on real clients before sending.

1. **Litmus** or **Email on Acid** — render across Gmail (web/iOS/Android), Outlook 2016–365 (Windows), Apple Mail, Yahoo, Outlook.com. These catch the Outlook/Word quirks a browser never shows.
2. Send **real seed tests** to your own Gmail + Outlook accounts.
3. Check **images-off** rendering (Gmail blocks images by default) — confirm the layout, CTAs and alt text still communicate the message.
4. Verify the **preheader** snippet in the inbox list view.
5. Test **mobile** (narrow viewport) — columns should stack and text should stay legible.
6. Run through a spam/deliverability check and validate all links + the unsubscribe link.

## Quick local preview
Open any file directly in a browser, or from the design-system root:

```
open templates/email/promo.html
```

Browser preview approximates Apple Mail; it is **not** representative of Gmail/Outlook. Use Litmus/Email on Acid for real coverage.
