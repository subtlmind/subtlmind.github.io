# Subtlmind Design System & Theme Guidelines

This document specifies the official design system, typography, color palette, foreground-to-background contrast requirements, and component styling rules for the **Subtlmind** web properties.

> [!IMPORTANT]
> Any future feature, page, component, or theme change MUST comply with the rules outlined in this document to preserve visual consistency, brand integrity, and WCAG AA accessibility.

---

## 1. Brand Philosophy & Aesthetic

Subtlmind pioneers **Ambient Intelligence for Intuitive Modern Living** across the Internet of Things (IoT), Edge Computing, Deep Learning, and Large Language Models.

The visual identity embodies:
- **Calm & Invisible**: Technology that works quietly in the background without intrusive, blinking sirens or noisy dashboards.
- **Architectural Elegance**: Obsidian dark slate canvases accented with precision cyan/teal telemetry paths and warm circadian amber accents.
- **High-Contrast Technical Clarity**: Crisp, highly readable typography adhering to strict accessibility contrast ratios.

---

## 2. Color Palette System

### 2.1 Dark Theme (Default)

| Token | CSS Variable | Hex / RGBA | Usage |
| :--- | :--- | :--- | :--- |
| **Obsidian Ink** | `--color-bg` | `#06090F` | Global canvas background |
| **Slate Deep** | `--color-bg-alt` | `#0B111E` | Section alternating backgrounds, footer |
| **Card Surface** | `--color-surface` / `--color-card` | `#101829` | Glass card and container fill |
| **Surface Hover** | `--color-surface-hover` | `#151F33` | Interactive card hover state |
| **Surface Translucent** | `--color-surface-translucent` | `rgba(16, 24, 41, 0.88)` | Floating menus, modal overlays |
| **Teal Accent** | `--color-teal` / `--color-cyan` | `#2DD4BF` | Primary brand accent, primary CTA button, active telemetry |
| **Teal Hover** | — | `#14B8A6` | Button hover, active focus ring |
| **Teal Light / Mint** | — | `#99F6E4` | Text gradient stops, telemetry data values |
| **Warm Amber** | `--color-amber` | `#F59E0B` | Circadian lighting, secondary metrics, early warnings |
| **Amber Light** | — | `#FDE68A` | Text gradient terminal stop, highlight badges |
| **Emerald Status** | — | `#10B981` | Online status pulse, verified SLA beacons |
| **Subtlmind Slate** | `--color-slate-brand` | `#3E404B` | Secondary corporate branding elements |
| **Card Border** | `--color-border` | `rgba(255, 255, 255, 0.08)` | Default glass card borders |
| **Teal Border Glow** | `--color-border-glow` | `rgba(45, 212, 191, 0.35)` | Interactive hover & focus glow |

---

### 2.2 Light Theme

| Token | CSS Variable | Hex / RGBA | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas Light** | `--color-bg` | `#F8FAFC` | Light mode canvas background |
| **Surface Light Alt** | `--color-bg-alt` | `#F1F5F9` | Section alternation, footer |
| **Card Surface** | `--color-surface` / `--color-card` | `#FFFFFF` | Solid light card background |
| **Border Light** | `--color-border` | `#E2E8F0` | Structural borders |
| **Teal Dark** | `--color-teal` / `--color-cyan` | `#0F766E` | High-contrast teal (6.5:1 on white, WCAG AA/AAA) |
| **Amber Dark** | `--color-amber` | `#B45309` | High-contrast amber (5.0:1 on white, WCAG AA) |
| **Button Primary Bg** | `--color-btn-primary-bg` | `#0F766E` | Primary button fill in light mode |
| **Button Primary Text** | `--color-btn-primary-text` | `#FFFFFF` | High-contrast text on primary button |

---

## 3. Contrast & Foreground Text Rules (Accessibility)

> [!CAUTION]
> **Strict Rules Against Text Blending:**
> 1. Never hardcode `#FFFFFF`, `#CBD5E1`, `#94A3B8`, `#5EEAD4`, or `#2DD4BF` directly in HTML templates or scoped CSS without theme variables!
> 2. On white card backgrounds in light theme (`#FFFFFF`), light grays like `#CBD5E1` are virtually invisible (1.3:1 contrast). Always use `var(--color-text-muted)` (`#475569`, 6.0:1 contrast) or `var(--color-text-secondary)` (`#334155`, 9.0:1 contrast).
> 3. Never use white text (`#FFFFFF`) on elements that sit on light theme cards. Always use `var(--color-text-heading)` or the global utility `.text-heading`.

### 3.1 Dark Background Foreground Tokens

```css
/* Dark Theme (Default) */
--color-text-heading:   #FFFFFF; /* 17.5:1 Contrast - Primary titles & h1-h6 */
--color-text-body:      #F1F5F9; /* 15.2:1 Contrast - Primary paragraphs & inputs */
--color-text-secondary: #CBD5E1; /* 11.0:1 Contrast - Descriptive copy, bullet points */
--color-text-muted:     #94A3B8; /* 6.8:1 Contrast - Labels, tags, timestamps, footnotes */
--color-btn-primary-bg: #2DD4BF; /* Primary button background */
--color-btn-primary-text: #06090F; /* High-contrast button text */
```

### 3.2 Light Background Foreground Tokens

```css
/* Light Theme */
--color-text-heading:   #0F172A; /* 16.5:1 Contrast - Titles & h1-h6 */
--color-text-body:      #1E293B; /* 13.5:1 Contrast - Paragraphs */
--color-text-secondary: #334155; /* 9.0:1 Contrast - Descriptive copy */
--color-text-muted:     #475569; /* 6.0:1 Contrast - Labels & timestamps (WCAG AA compliant) */
--color-btn-primary-bg: #0F766E; /* 6.5:1 Contrast on light canvas */
--color-btn-primary-text: #FFFFFF; /* High-contrast button text */
```

### 3.3 Form Inputs & Placeholders
- **Background**: `var(--color-input-bg)` (`#0A0F1C` in dark mode, `#FFFFFF` in light mode).
- **Text Color**: `var(--color-text-heading)` (`#FFFFFF` in dark mode, `#0F172A` in light mode).
- **Border**: `1px solid var(--color-border)` (`#1E293B` in dark mode, `#E2E8F0` in light mode).
- **Placeholder Text**: Must use `var(--color-text-muted)` (never low-contrast or hardcoded dark values).
- **Focus Ring**: `border-color: var(--color-teal); box-shadow: 0 0 12px rgba(45, 212, 191, 0.2);`.

---

## 4. Typography Hierarchy

The design system uses three font families:

1. **Display Headings**: `'Plus Jakarta Sans', sans-serif`
   - Weight: `700` (Bold) to `800` (Extra Bold).
   - Letter-spacing: `-0.025em` to `-0.03em`.
   - Used for `h1`, `h2`, hero headlines, section headers.

2. **Body & Interface**: `'Inter', sans-serif`
   - Weight: `400` (Regular), `500` (Medium), `600` (Semi-bold).
   - Used for body paragraphs, buttons, forms, lists, navigation items.

3. **Telemetry & Technical Specs**: `'JetBrains Mono', monospace`
   - Weight: `500` to `700`.
   - Used for telemetry bars, protocol tags, status pills, latency readouts, timestamps, and architecture labels.

```css
--font-display: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-sans:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono:    'JetBrains Mono', 'Fira Code', Menlo, Consolas, monospace;
```

---

## 5. Components & UI Patterns

### 5.1 Text Gradient
High-contrast gradients configured specifically for both themes:
```css
/* Dark Mode: White to Teal */
.text-gradient {
  background: linear-gradient(135deg, #FFFFFF 20%, #2DD4BF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Light Mode: Slate Dark to Deep Teal */
[data-theme="light"] .text-gradient,
html.light-theme .text-gradient {
  background: linear-gradient(135deg, #0F172A 20%, #0F766E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### 5.2 Clean Solid Cards
Cards are clean, calm, and readable without visual clutter or intrusive background particles:
```css
.glass-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

[data-theme="light"] .glass-card,
html.light-theme .glass-card {
  background: #FFFFFF;
  border-color: #E2E8F0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}
```

### 5.3 Buttons
- **Primary CTA (`.btn-primary`)**:
  - Dark Mode: Background `#2DD4BF`, text `#06090F` (font-weight: 600, contrast 11.2:1)
  - Light Mode: Background `#0F766E`, text `#FFFFFF` (font-weight: 600, contrast 6.5:1)
- **Secondary Action (`.btn-secondary`)**:
  - Uses `var(--color-surface)`, `var(--color-text-heading)`, and `var(--color-border)`.
  - Dark Mode: Background `#10192D`, text `#FFFFFF`, border `#1E293B`.
  - Light Mode: Background `#FFFFFF`, text `#0F172A`, border `#E2E8F0`.

---

## 6. Technical Architecture Diagrams (SVGs)

All static architectural schematics in `/public/assets/solutions/` follow these strict parameters:
1. **Dimensions**: `viewBox="0 0 800 480"` (16:9 widescreen ratio).
2. **Background**: Dark technical canvas `#070B14` with `24x24` subtle grid overlay.
3. **Card Modules**: Filled with `#10182B` to `#0B111F` gradients and `1px` subtle borders (`rgba(255, 255, 255, 0.08)`).
4. **Information Flow**: Left-to-right (`Sense / Optical Input` → `Edge Acceleration / Neural Processing` → `Act / Resolution`).
5. **Telemetry Strip**: Anchored at `y=440`, height `40px` with monospaced metrics.
6. **Watermark**: `SUBTLMIND` header brand with teal status dot and pillar identifier.

### Official Blueprints Suite:
- `iot-sensory-architecture.svg`: Pillar 01 — Sensory Data & IoT Edge Telemetry
- `video-inference-architecture.svg`: Pillar 02 — Real-Time Video Inference & Computer Vision (IP Cameras, Machine Vision, Thermal)
- `predictive-maintenance-dl.svg`: Pillar 03 — Deep Learning & Predictive Anomaly Forecasting
- `conversational-rag-pipeline.svg`: Pillar 04 — Language Models & Conversational RAG Copilot
- `smart-operations-loop.svg`: Pillar 05 — Closed-Loop Autonomy & Smart Operations

---

## 7. Responsive Breakpoints

- **Desktop (Wide)**: `1240px` max container width.
- **Tablet / Laptop**: `1024px` (multi-column grids collapse to 2 columns).
- **Mobile**: `640px` – `768px` (all grids stack to single column, cards reduce padding from `48px` to `24px`).
