# Motion — Iberdrola Design System

Motion is how the Iberdrola brand *feels* in use: warm, optimistic, and energetic —
but never flashy. Every animation should earn its place by helping people understand
what changed, where their attention should go, or that the system is working.

> **One rule above all:** if an animation doesn't clarify or delight with purpose,
> remove it. Restraint reads as quality.

---

## Principles

1. **Purposeful** — Animate to communicate: a state change, a spatial relationship,
   a cause and effect. Never animate for decoration alone.
2. **Calm** — Movement is smooth and settled. Prefer gentle fades and short slides
   over bounces and spins. The interface should feel composed, like a well-run grid.
3. **Energetic, not flashy** — A subtle lift on hover, a tricolor line that draws
   itself, a counter that ticks up. Energy shows in small, confident gestures.
4. **Fast where it counts** — Interactions the user drives (taps, hovers, toggles)
   resolve quickly so the product feels responsive. Ambient/entrance motion can be
   a touch slower and softer.
5. **Consistent** — Reuse the duration and easing tokens below so motion feels like
   one system across web, app, email, and presentations.
6. **Accessible** — Motion is an enhancement, never a requirement. Honour
   `prefers-reduced-motion` everywhere (see below).

---

## Duration tokens

Defined in [`tokens/motion.css`](../tokens/motion.css). Use the token, never a raw ms value.

| Token                   | Value   | Use for                                                        |
| ----------------------- | ------- | ------------------------------------------------------------- |
| `--ib-duration-fast`    | `150ms` | Micro-feedback: button press, toggle, chip select, icon state |
| `--ib-duration-base`    | `250ms` | Standard UI: hovers, card lift, dropdowns, tab switches       |
| `--ib-duration-slow`    | `400ms` | Entrances, reveals, accordion open, page-region transitions   |
| `--ib-duration-slower`  | `700ms` | Ambient/hero motion, energy-line draw, large staggered scenes |

Rule of thumb: the larger the element or the distance it travels, the longer the
duration. Small controls should feel instant; big surfaces can take their time.

## Easing tokens

| Token                  | Curve                             | Use for                                                        |
| ---------------------- | --------------------------------- | ------------------------------------------------------------- |
| `--ib-ease-standard`   | `cubic-bezier(0.2, 0, 0, 1)`      | Default for most transitions — quick out, gentle settle       |
| `--ib-ease-decelerate` | `cubic-bezier(0, 0, 0.2, 1)`      | Elements **entering** the screen (fade/slide in)              |
| `--ib-ease-accelerate` | `cubic-bezier(0.4, 0, 1, 1)`      | Elements **leaving** the screen (fade/slide out)             |
| `--ib-ease-spring`     | `cubic-bezier(0.34, 1.56, 0.64, 1)` | A single playful accent: a check, a badge pop, a like — use sparingly |

Composed helpers are also provided: `--ib-transition-base` (all / base / standard)
and `--ib-transition-color` (colour-only, fast). Prefer these for everyday work.

```css
.card   { transition: var(--ib-transition-base); }
.link   { transition: var(--ib-transition-color); }
.enter  { transition: transform var(--ib-duration-slow) var(--ib-ease-decelerate),
                      opacity   var(--ib-duration-slow) var(--ib-ease-decelerate); }
```

---

## What to animate

- **Entrances / reveals** — Content fades up as it enters the viewport
  (`opacity` + small `translateY`). Stagger groups by ~80ms per item for rhythm.
  See `[data-ib-reveal]` in the component library.
- **Hovers & presses** — Buttons lift 1px and cast a soft shadow on hover, settle on
  press. Cards lift ~4px. Keep transforms tiny.
- **State changes** — Toggles slide, tabs/underlines move, accordion chevrons rotate,
  badges recolour. Show the change, don't just swap it.
- **Page & region transitions** — Cross-fade or slide regions with `--ib-duration-slow`
  and a decelerate curve so new content feels like it *arrives*.
- **Loaders** — For waits, use a calm brand spinner, a skeleton shimmer, or the
  tricolor energy line. Signal progress without anxiety.
- **Data coming alive** — Count-ups on stats, bars/rings growing to value, an energy
  line drawing in. This is where "energetic" belongs.

## What to animate *toward*

- Transform (`translate`, `scale`, `rotate`) and `opacity` — these are GPU-cheap.
- Avoid animating `width`, `height`, `top/left`, `box-shadow` on large or repeated
  elements; prefer `transform` and pre-composited shadows.

---

## Reduced motion — required

Every animation **must** degrade gracefully. The motion tokens already collapse to
`0ms` under `prefers-reduced-motion: reduce`, so token-based transitions largely
self-disable. For keyframe animations, JS-driven motion, and anything essential,
add an explicit guard:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- Reveal-on-scroll content must be **visible** in its final state (never stuck hidden).
- Loaders may show a static indicator instead of a spin.
- JS that animates values (count-ups) should jump straight to the final value.

Check with `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before
starting JS animations.

---

## Do / Don't

| ✅ Do                                                        | ❌ Don't                                                       |
| ----------------------------------------------------------- | ------------------------------------------------------------- |
| Use the duration & easing **tokens**                        | Hard-code `300ms ease-in-out` or random cubic-beziers         |
| Keep interaction feedback ≤ `--ib-duration-base`            | Make the user wait on slow, decorative transitions            |
| Animate `transform` and `opacity`                           | Animate layout properties (`width`, `top`) on many elements   |
| Move a small distance (a few px) with intent                | Fly elements across the screen or spin them for no reason     |
| Stagger groups gently (~80ms steps)                         | Cascade dozens of items with long delays                      |
| Use `--ib-ease-spring` once, as a highlight                 | Bounce everything — it turns calm into chaotic                |
| Respect `prefers-reduced-motion`                            | Ship motion with no reduced-motion fallback                   |
| Let motion reinforce the tricolor brand accent              | Introduce off-brand colours or flashy neon effects            |
| Reuse `--ib-transition-base` / `--ib-transition-color`      | Reinvent a transition string on every component               |

---

See runnable examples in [`animations/examples/index.html`](./examples/index.html).
