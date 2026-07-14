# Iberdrola Design System

A super-detailed, production-grade design system for **Iberdrola** — one brand foundation for
**every channel**: landing pages, websites, presentations, apps, animations, emails and banners.

It is **framework-agnostic**: a layer of design tokens, a pure HTML/CSS component library, a small
progressive-enhancement JS file, and ready-to-use templates. Consume it from plain HTML today, or
wrap it in React / Vue / Tailwind later.

> **Fonts note:** Iberdrola's brand typeface is proprietary and not distributable here, so the
> system ships with **Figtree** (a close open humanist sans) and is wired so the licensed font
> drops in by editing one variable. See [`fonts/fonts.css`](fonts/fonts.css).

---

## Quick start

```html
<!-- One line gets you tokens + fonts + reset + base + all components -->
<link rel="stylesheet" href="css/iberdrola.css">
<!-- Optional: behaviour for tabs, accordion, mobile nav, carousel, scroll-reveal -->
<script src="js/iberdrola.js" defer></script>
```

Then use component classes:

```html
<a class="ib-btn ib-btn--lg" href="#">Contrata online</a>
<article class="ib-card ib-feature ib-card--hover">…</article>
```

**Open [`docs/index.html`](docs/index.html) in a browser** — it's the living style guide showing
every token, component and template.

---

## What's inside

| Folder | Contents |
|---|---|
| [`tokens/`](tokens/) | Design tokens. `tokens.json` (W3C format) is the **source of truth**; the `.css` files mirror it as CSS custom properties. `iberdrola.tokens.css` imports them all. |
| [`fonts/`](fonts/) | `fonts.css` — Figtree substitute + the one-step swap to the licensed brand font. |
| [`css/`](css/) | `reset.css`, `base.css` (elements + typography + layout utilities), `components.css` (the component library), and **`iberdrola.css`** (the single bundle to import). |
| [`js/`](js/) | `iberdrola.js` — zero-dependency behaviour for interactive components. |
| [`brand/`](brand/) | `logos/` (full, mono/currentColor, icon, wordmark), `logo-usage.md`, `voice-and-imagery.md`. |
| [`templates/`](templates/) | One starting point per channel — see below. |
| [`animations/`](animations/) | `motion.md` principles + runnable micro-interaction examples. |
| [`docs/`](docs/) | ⭐ The living style-guide site. |
| [`resources/`](resources/) | Original source logos + reference screenshots of iberdrola.es. |

---

## Templates per medium

| Channel | Path | Notes |
|---|---|---|
| Landing page | [`templates/landing-page/`](templates/landing-page/) | Hero, plan simulator, features, segments, table, reviews, FAQ, CTA. |
| Website | [`templates/website/`](templates/website/) | `index.html` (home) + `interior.html` (breadcrumbs, tabs, form, FAQ). |
| Presentation | [`templates/presentation/`](templates/presentation/) | 16:9 HTML slide-deck master; export to PDF via browser print. |
| Emails | [`templates/email/`](templates/email/) | Table-based, inline-styled: newsletter, promo, transactional. |
| Banners | [`templates/banner/`](templates/banner/) | IAB display sizes + square social; pixel-accurate. |
| App | [`templates/app/`](templates/app/) | Mobile screen set in phone frames. |
| Animations | [`animations/examples/`](animations/examples/) | Runnable brand micro-interactions. |

---

## Design foundations (summary)

- **Color** — primary green `#00A443`; deep forest `#004A2F` for dark bands & footer; accents
  orange `#FF9C1A` and blue `#0DA9FF`; soft tints mint / peach / sky / sand; full green + neutral
  ramps and semantic colors. Tricolor flame gradient for special moments.
- **Type** — humanist sans (Figtree), fluid `clamp()` scale from `caption` to `display`.
- **Shape** — pill buttons, generously rounded cards (8→32px + pill), soft forest-tinted shadows.
- **Space** — 4px base scale; 1280px container; responsive grid helpers.
- **Motion** — 150/250/400/700ms durations, four easings incl. a spring; honours
  `prefers-reduced-motion`.

---

## Theming & customising

Everything references tokens, so re-theming is central:

- **Swap the typeface:** add an `@font-face` for family `"Iberdrola"` in `fonts/fonts.css`
  (it's already first in `--ib-font-brand`) — the whole system updates.
- **Retune a color:** change it in `tokens/tokens.json` **and** the matching `tokens/*.css`
  variable; every component follows.
- **Dark surfaces:** add `data-ib-theme="dark"` to any container for the dark token set.

---

## Accessibility

Visible focus rings, ARIA wired on nav/tabs/accordion, keyboard support in `js/iberdrola.js`,
WCAG-AA text contrast against intended backgrounds, and full `prefers-reduced-motion` support.

---

## Browser verification

Templates render fully offline (image slots use on-brand placeholders — swap for real `<img>`).
To screenshot any page:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --window-size=1280,2000 \
  --screenshot=out.png "file://$(pwd)/docs/index.html"
```
