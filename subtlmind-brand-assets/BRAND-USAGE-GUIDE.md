# Subtlmind Brand & Logo Asset Package

## Color System
- **Subtlmind Slate (Primary):** `#3E404B` (`RGB 62, 64, 75`)
- **Obsidian Ink (High-Contrast Dark):** `#111216` (`RGB 17, 18, 22`)
- **Pure White (Inverse / Dark Mode):** `#FFFFFF` (`RGB 255, 255, 255`)
- **Dark Surface Canvas:** `#14161B` (`RGB 20, 22, 27`)

## Directory Structure

### `01-primary-logo/`
Full horizontal lockup (`icon + subtlmind`) in Primary Slate, Pure White, and Obsidian Black:
- `svg/`: Infinite-scale vector masters (`subtlmind-logo-primary.svg`, `-white.svg`, `-black.svg`)
- `png/`: Transparent PNGs at `512w`, `1024w`, `2048w`, `4096w` + lossless `2048w.webp`

### `02-icon-mark/`
Standalone isometric `S` stack emblem in square `1:1` artboards:
- `svg/`: Unboxed marks (`primary`, `white`, `black`) + rounded app badges (`badge-dark`, `badge-light`)
- `png/`: `64x64`, `128x128`, `256x256`, `512x512`, `1024x1024`, `2048x2048`

### `03-wordmark/`
Standalone `subtlmind` logotype without emblem:
- `svg/`: `primary`, `white`, `black`
- `png/`: `512w`, `1024w`, `2048w`

### `04-web-favicons/`
Complete web & PWA favicon suite:
- `favicon.svg` (supports automatic `prefers-color-scheme: dark` switching)
- `favicon.ico` (multi-resolution `16x16`, `32x32`, `48x48`)
- `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png`, `favicon-96x96.png`
- `apple-touch-icon.png` (`180x180` opaque slate tile)
- `android-chrome-192x192.png`, `android-chrome-512x512.png`, `android-chrome-maskable-512x512.png`
- `site.webmanifest`

#### HTML `<head>` Snippet
```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#3E404B">
```

### `05-social-og-banners/`
- `og-image-light-1200x630.png` & `og-image-dark-1200x630.png` (OpenGraph / LinkedIn / X link cards)
- `x-twitter-banner-1500x500.png`
- `linkedin-banner-1584x396.png`
- `social-avatar-light-1024x1024.png` & `social-avatar-dark-1024x1024.png`

### `06-mobile-app-icons/`
- `ios/`: Full Xcode `AppIcon.appiconset` (`20@2x` through `1024x1024` RGB no-alpha App Store icon + `Contents.json`)
- `android/`: Google Play `512x512`, Adaptive Icon layers (`ic_launcher_foreground-432x432.png`, `ic_launcher_background-432x432.png`), and `mdpi`–`xxxhdpi` launcher icons.
