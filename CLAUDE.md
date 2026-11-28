# Subtlmind website (inxenuity.github.io)

Angular 22 standalone-component marketing site, deployed to GitHub Pages.

- `npm start`: dev server
- `npm run build`: production build (also copies `index.html` to `404.html` for SPA routing)
- `npm test`: Vitest

## Code conventions
- Standalone components with inline `template` and `styles` in a single `.ts` file (see `src/app/pages/*`, `src/app/components/*`).
- Prettier: 100-char lines, single quotes, Angular parser for HTML. 2-space indent (`.editorconfig`).
- Shared state lives in `src/app/services/` (theme, SEO, analytics, scroll, briefing).

## Visual consistency (mandatory)
Every UI change must keep the existing theme, colors, fonts and spacing. The full rules are in
[.claude/rules/design-system.md](.claude/rules/design-system.md). The background and rationale are in
[docs/THEME_AND_DESIGN_SYSTEM.md](docs/THEME_AND_DESIGN_SYSTEM.md).

Short version:
- Use the CSS variables in `src/styles.css` (`var(--color-*)`, `var(--font-*)`). Do not hardcode hex colors in components.
- Fonts: Plus Jakarta Sans for headings, Inter for body/UI, JetBrains Mono for technical labels. Add no other fonts.
- Every change must look right in both the dark (default) and the light theme.
- Reuse the global classes (`.container`, `.section-padding`, `.tag-eyebrow`, `.glass-card`, `.hud-card`, `.btn-primary`, `.btn-secondary`, `.grid-2`, `.grid-4`, `.form-*`, `.text-*`) before writing new CSS.

@.claude/rules/design-system.md
