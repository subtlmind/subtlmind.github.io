---
paths:
  - "src/**/*.ts"
  - "src/**/*.css"
  - "src/**/*.html"
  - "public/assets/**/*.svg"
---

# Subtlmind design system rules

Follow these rules for every new page, component, section or style change. Source of truth:
**`src/styles.css`** (tokens and global classes). `docs/THEME_AND_DESIGN_SYSTEM.md` explains the
reasoning, but where its hex values differ from `styles.css`, `styles.css` wins.

## 1. Colors: tokens only
- In component `styles` and templates, use `var(--color-*)` tokens. Do not hardcode `#fff`, `#FFFFFF`,
  `#CBD5E1`, `#94A3B8`, `#2DD4BF` or any other theme color. A hardcoded hex breaks one of the two themes.
- Text tokens by role:
  - `--color-text-heading`: titles, h1–h6, emphasized values
  - `--color-text-body`: primary paragraphs, inputs
  - `--color-text-secondary`: descriptive copy, bullets
  - `--color-text-muted`: labels, tags, timestamps, footnotes (lowest contrast you may use for text)
- Surfaces: `--color-bg`, `--color-bg-alt` (alternating sections, footer), `--color-surface`,
  `--color-surface-hover`, `--color-card`, `--color-input-bg`, `--color-nav-bg`.
- Borders: `--color-border` by default, `--color-border-glow` for hover and focus.
- Accents:
  - `--color-teal` (alias `--color-cyan`) is the primary brand accent: CTAs, active states, telemetry values.
  - `--color-amber` is secondary: warnings, circadian/secondary metrics. Use it sparingly.
  - Emerald `#10B981` is reserved for "online" status pulses (`.pulse-dot`).
- Do not add new hues such as purple, pink or blue as UI accents. The only exception is third-party
  brand colors inside tech logos (`tech-logos.ts`).
- If you need a new color, add it as a token to **both** `:root` and the light block
  (`[data-theme="light"], html.light-theme`) in `src/styles.css`, checking WCAG AA contrast
  (≥4.5:1 for body text) against that theme's background. Do not define it locally in a component.
- Translucent teal glows such as `rgba(45, 212, 191, 0.x)` for shadows and hover borders are part of the
  dark-theme style. When you use one, give it a light-theme override (the existing pattern uses
  `rgba(15, 118, 110, 0.x)` or `#0D9488`).

## 2. Dual theme: dark is the default, light must also work
- Light mode is applied with `data-theme="light"` and the `.light-theme` class on `<html>`, set by
  `ThemeService` and the inline script in `src/index.html`. Do not add another theming mechanism.
- Write light-theme overrides in components with this selector set (it matches `tech-logos.ts`):
  ```css
  :host-context([data-theme="light"]) .x,
  :host-context(.light-theme) .x { ... }
  ```
  In `src/styles.css`, use `[data-theme="light"] .x, html.light-theme .x`.
- Never put white text on a surface that turns white in light mode. Use `--color-text-heading` or `.text-heading`.
- Gradient text: use `.text-gradient` (it already has both theme variants). Do not create new gradients.

## 3. Typography
- Only three families, all loaded from Google Fonts in `src/index.html`. Do not add new fonts or weights
  that aren't loaded there.
  - `var(--font-display)` (Plus Jakarta Sans), weight 700–800, letter-spacing `-0.025em` to `-0.03em`:
    h1/h2, hero headlines, section titles.
  - `var(--font-sans)` (Inter), weight 400/500/600: body text, buttons, nav, forms, lists.
  - `var(--font-mono)` (JetBrains Mono), weight 500–700: eyebrows, tags, status pills, stats, latency
    readouts, timestamps, architecture labels. These are usually uppercase with wide letter-spacing.
- Reference font families through these variables only. Never write a font-family name directly.
- Keep the global scale: body is 15px with line-height 1.6. h1 is `clamp(2.5rem, 5vw, 3.8rem)`, h2 is
  `clamp(1.8rem, 3.5vw, 2.6rem)`, h3 is `1.35rem`. Paragraphs are `1rem` with line-height 1.65. Use
  `clamp()` for any new large headline.
- Section eyebrow: `<div class="tag-eyebrow">LABEL</div>` (add `no-dot` for the `— LABEL` style).

## 4. Layout and spacing
- Wrap content in `.container` (max-width 1240px, 24px side padding).
- Vertical rhythm: `.section-padding` (96px) for sections, `.hero-padding` for page heroes. Alternate
  section backgrounds with `--color-bg` / `--color-bg-alt`.
- Grids: `.grid-2` / `.grid-4` with a 24px gap. Breakpoints: `1024px` (4→2 columns), `768px`
  (everything stacks to one column), plus `640px`/`600px` for small-phone tweaks. Every new layout must
  stack cleanly on mobile, with no horizontal scroll.
- The fixed navbar needs 88px of clearance. Anchored sections already get `scroll-margin-top`, so don't fight it.

## 5. Components and shape
- Cards: `.glass-card` (radius 16px) or `.hud-card` (radius 12px, optional `.hud-bracket-tl-br` corner
  accents). Cards are solid, quiet surfaces. No busy backgrounds, particles or heavy blur.
- Buttons: `.btn-primary` for the single main CTA in a view, `.btn-secondary` for everything else.
  Radius 12px, font-weight 600. Do not invent new button styles.
- Forms: `.form-group`, `.form-label`, `.form-input` / `.form-select` / `.form-textarea`. Placeholders
  use `--color-text-muted`. Inputs have a 3px radius; focus shows a cyan border with a soft glow.
- Lists: `.bullet-list`. Status: `.pulse-dot`.
- Radii: 12px (buttons, HUD cards), 16px (cards, media frames), 9999px (pills), 50% (dots).
- Motion is calm and subtle: 0.2–0.25s `ease` (or `cubic-bezier(0.16, 1, 0.3, 1)`), hover lift of at most
  `translateY(-2px)`. No flashing, bouncing or attention-grabbing loops. Keep the brand's
  "calm, invisible technology" feel.

## 6. Architecture SVGs (`public/assets/solutions/`)
- `viewBox="0 0 800 480"`, dark canvas `#070B14` with a 24×24 subtle grid.
- Modules filled with a `#10182B`→`#0B111F` gradient and a 1px `rgba(255,255,255,0.08)` border.
- Flow left to right: Sense → Edge/Neural processing → Act.
- Monospace telemetry strip at `y=440`, 40px tall. `SUBTLMIND` watermark with a teal status dot and the
  pillar identifier.

## 7. Brand assets
- Use the existing logos and icons in `public/assets/` (`subtlmind-logo-*`, `subtlmind-icon-*`,
  `subtlmind-wordmark-*`). Pick the white or primary variant on dark surfaces and the black variant on
  light ones. Do not recolor or redraw them.

## 8. Before you finish a UI change
- Check: no new hardcoded theme colors, no new font families, global classes reused where possible.
- Check that the change looks right in both themes and at the mobile breakpoints (`npm start`, then
  toggle the theme in the navbar).
- If you add a reusable token or class, add it to `src/styles.css` and update
  `docs/THEME_AND_DESIGN_SYSTEM.md` to match.
