# Subtlmind — Predictive Maintenance & Vision AI for Factories and Buildings

Official website and digital presence for **Subtlmind** ([subtlmind.in](https://subtlmind.in)), engineered with modern Angular (standalone components, signals, and application builder).

---

## Toolchain & Environment Versions

The application is built, tested, and verified with the following toolchain versions:

| Tool | Recommended Version | Supported Version | Notes |
| :--- | :--- | :--- | :--- |
| **NVM** | `0.39.7` | `^0.39.0` | Node Version Manager |
| **Node.js** | `v24.22.0` | `v22.23.3` (LTS) | JavaScript Runtime |
| **NPM** | `11.19.1` | `10.9.9` | Package Manager |
| **Angular CLI (`@angular/cli`)** | `22.2.3` | `22.2.3` | Angular Command Line Interface |
| **Angular Core (`@angular/core`)** | `22.2.3` | `22.2.3` | Standalone components & Signals |
| **TypeScript** | `6.0.3` | `~6.0.2` | Type system |
| **Vitest** | `5.0.5` | `^5.0.0` | Unit test engine |
| **Operating System** | Linux x64 / macOS / Windows | Cross-platform | Verified on Linux |

---

## Repository Branch Architecture

The repository uses a dual-branch structure tailored for GitHub Pages user/organization sites:

- **`dev` branch**: **Source Code Branch**. Contains all Angular TypeScript source code (`src/`), styling (`src/styles.css`), configurations (`angular.json`, `package.json`, `tsconfig.json`), tests, and brand assets. All development, commits, and pull requests occur on this branch.
- **`main` branch**: **GitHub Pages Deployment Branch**. Contains exclusively the compiled static production output files (`index.html`, `404.html`, `CNAME`, `.nojekyll`, hashed JavaScript bundles, and assets) at the root level, served live by GitHub Pages at [https://subtlmind.in](https://subtlmind.in).

---

## Installation & Setup Instructions

### 1. Install & Configure NVM

If Node Version Manager (NVM) is not already installed on your machine:

```bash
# Install NVM (macOS/Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load NVM into your shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

Verify NVM installation:

```bash
nvm --version   # Output: 0.39.7
```

---

### 2. Install & Select Node.js

Install and switch to the recommended Node.js version:

```bash
# Install recommended Node version
nvm install 24.22.0
nvm use 24.22.0

# Verify active versions
node -v   # Output: v24.22.0
npm -v    # Output: 11.19.1
```

*(Alternatively, Node `22.23.3` LTS is also fully supported via `nvm install 22.23.3 && nvm use 22.23.3`)*

---

### 3. Clone Repository & Install Dependencies

```bash
# Clone the repository
git clone git@github.com:INXENUITY/inxenuity.github.io.git subtlmind
cd subtlmind

# Ensure you are on the dev branch
git checkout dev

# Install npm dependencies
npm install
```

Verify that Angular CLI is available:

```bash
npx ng version
```

---

## Development & Build Workflow

### 1. Serve (Local Development Server)

Start the Angular development server with live reload:

```bash
# Ensure NVM environment is loaded
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 24.22.0

# Start development server
npm start
# or: npx ng serve --host 0.0.0.0 --port 4200
```

Open your browser at:
`http://localhost:4200/`

---

### 2. Run Tests

Execute unit tests via Vitest:

```bash
# Single execution (CI mode)
npm test -- --watch=false

# Interactive watch mode
npm test
```

---

### 3. Build (Production Artifacts)

Compile the application with production optimizations:

```bash
# Ensure NVM environment is loaded
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 24.22.0

# Run production build
npm run build
```

This command:
1. Runs `ng build` with production optimizations (AOT compilation, tree-shaking, minification, script bundling).
2. **Pre-renders every route to static HTML** (`outputMode: "static"` in `angular.json`, routes in `src/app/app.routes.server.ts`), so search engines, link previews and AI crawlers see full page content without running JavaScript. New solution pages are picked up automatically from `src/app/content/solutions.ts`.
3. Copies static assets from `public/` (`CNAME`, `.nojekyll`, favicons, `robots.txt`, `site.webmanifest`, `assets/`) into the output directory.
4. Runs `scripts/postbuild.mjs`, which writes `404.html` (client-only app shell for unknown URLs), `<route>.html` copies so GitHub Pages serves `/about` without a trailing-slash redirect, and `sitemap.xml` generated from the pre-rendered pages.

Output directory:
`dist/inxenuity-site/browser/`

---

## Publishing to GitHub Pages (`main` Branch)

Follow these exact steps to commit source changes on `dev` and publish the compiled site to `main`.

### Step 1: Commit and Push Source Changes to `dev`

```bash
# Ensure you are on the dev branch
git checkout dev

# Check working tree status
git status

# Stage all source changes
git add -A

# Commit changes
git commit -m "feat: describe your updates"

# Push to origin dev
git push origin dev
```

---

### Step 2: Build the Production Application

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 24.22.0

# Clean build
npm run build
```

---

### Step 3: Deploy to `main` via Git Worktree

Deploying via a temporary Git worktree is fast, clean, and prevents accidentally dirtying your working tree or switching branches:

```bash
# 1. Ensure local main branch is synchronized with remote
git fetch origin main:main

# 2. Remove any previous temporary worktree if present
git worktree remove --force /tmp/subtlmind-deploy 2>/dev/null || true

# 3. Create a clean worktree checked out to the main branch
git worktree add /tmp/subtlmind-deploy main

# 4. Clean existing files from the main branch (preserves .git metadata)
rm -rf /tmp/subtlmind-deploy/*

# 5. Copy the newly compiled build files to the worktree root
cp -r dist/inxenuity-site/browser/* /tmp/subtlmind-deploy/

# 6. Ensure required GitHub Pages files are present at the root
#    (404.html and sitemap.xml are already generated by `npm run build`; do not overwrite them)
echo "subtlmind.in" > /tmp/subtlmind-deploy/CNAME
touch /tmp/subtlmind-deploy/.nojekyll

# 7. Commit and push the build files to main
cd /tmp/subtlmind-deploy
git add -A
git commit -m "Deploy: Publish latest Subtlmind build to GitHub Pages"
git push origin main

# 8. Return to your repository and remove the temporary worktree
cd -
git worktree remove --force /tmp/subtlmind-deploy
```

Your updates will be live globally at [https://subtlmind.in](https://subtlmind.in) within 1–2 minutes via GitHub Pages.

---

## Key Features & Capabilities

1. **Five Architectural Pillars**:
   - **Pillar 01 — Sensory Data & IoT Architecture** (`/solutions#iot`): Sub-15ms edge ingestion, MQTT/Modbus/BLE/Matter, store-and-forward WAN resilience.
   - **Pillar 02 — Real-Time Video Inference & Computer Vision** (`/solutions#vision`): IP/machine/thermal camera analytics, edge detection (YOLO/RT-DETR), segmentation, and classification.
   - **Pillar 03 — Deep Learning & Predictive Maintenance** (`/solutions#predictive`): Multi-modal cross-validation, 240-hour lead warnings, vibration/thermal harmonics.
   - **Pillar 04 — Language Models & Conversational Control** (`/solutions#conversational`): Domain-grounded hybrid RAG copilots and natural language ambient control.
   - **Pillar 05 — Smart Operations & Automation** (`/solutions#automation`): Real-time closed-loop actuation, BACnet/OPC-UA/REST PLC interlocks.

2. **Search Engine Optimization (SEO)**:
   - Dynamic per-route metadata (`title`, `description`, `keywords`, `canonical`, Open Graph, Twitter cards) via `SeoService`.
   - Schema.org JSON-LD structured data (`Organization`, `WebSite`, `SoftwareApplication`) with verified `sameAs` social associations.
   - Automated `sitemap.xml` and `robots.txt` generation.

3. **Analytics & Lead Tracking**:
   - Google Tag (gtag.js) integration (`G-N7BBG3G3LZ`).
   - SPA route transition tracking (`page_view`) on Angular `NavigationEnd`.
   - Lead conversion tracking (`generate_lead`) on consultation and contact form submissions.

4. **Brand & Social Presence**:
   - **LinkedIn**: [https://www.linkedin.com/company/subtlmind](https://www.linkedin.com/company/subtlmind)
   - **Instagram**: [https://www.instagram.com/subtlmind](https://www.instagram.com/subtlmind)
   - **YouTube**: [https://www.youtube.com/@subtlmind](https://www.youtube.com/@subtlmind)
   - **GitHub**: [https://github.com/subtlmind](https://github.com/subtlmind)
   - **Direct Contact**: `hello@subtlmind.in`

---

## Design System & Theme Guidelines

The Subtlmind color palette, typography hierarchy, contrast accessibility rules (WCAG AA), and component standards are formally documented in [`docs/THEME_AND_DESIGN_SYSTEM.md`](file:///home/vinod/inxenuity.github.io/docs/THEME_AND_DESIGN_SYSTEM.md).

All future code contributions and UI styling additions must adhere to:
- **Primary Palette**: Obsidian Ink (`#06090F`), Slate Deep (`#0B111E`), Card Surface (`#101829`), Teal Accent (`#2DD4BF`), and Warm Amber (`#F59E0B`).
- **Foreground Text Contrast on Dark Backgrounds**:
  - Headings: `#FFFFFF`
  - Body Text: `#F1F5F9`
  - Secondary Copy: `#CBD5E1` (≥ 8.5:1 contrast)
  - Labels & Metadata: `#94A3B8` (≥ 6.5:1 contrast)
- **Typography**: `Plus Jakarta Sans` (Display), `Inter` (Body), and `JetBrains Mono` (Telemetry).

---

## License

Copyright © 2026 Subtlmind. All rights reserved.
