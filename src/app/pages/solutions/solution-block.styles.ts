/** Styles shared by the solutions overview and the per-solution pages. */
export const SOLUTION_BLOCK_STYLES = `
    .solution-block {
      scroll-margin-top: 100px;
    }

    .solution-grid {
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      align-items: center;
      gap: 60px;
    }

    .solution-grid.reverse {
      grid-template-columns: 0.95fr 1.05fr;
    }

    .solution-title {
      font-size: clamp(1.8rem, 3vw, 2.3rem);
      margin-bottom: 18px;
    }

    .solution-desc {
      font-size: 0.98rem;
      color: var(--color-text-secondary);
      line-height: 1.65;
    }

    .solution-stats-strip {
      display: flex;
      gap: 20px;
      margin-top: 28px;
      padding-top: 20px;
      border-top: 1px solid var(--color-border);
    }

    .mini-stat {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .stat-number {
      font-family: var(--font-mono);
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--color-teal);
    }

    .stat-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--color-text-muted);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    /* Architecture blueprint frame. Intentionally dark in both themes: the SVG blueprints
       in /assets/solutions use a fixed dark canvas (see docs/THEME_AND_DESIGN_SYSTEM.md §6). */
    .blueprint-card-wrap {
      width: 100%;
      min-width: 0;
      border-radius: 16px;
      overflow: hidden;
      background: #080D1A;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
      border: 1px solid var(--color-border);
      transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    }

    .blueprint-card-wrap:hover {
      border-color: rgba(45, 212, 191, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 20px 48px rgba(45, 212, 191, 0.12);
    }

    :host-context([data-theme="light"]) .blueprint-card-wrap:hover,
    :host-context(.light-theme) .blueprint-card-wrap:hover {
      border-color: var(--color-teal);
      box-shadow: 0 12px 32px rgba(15, 118, 110, 0.15);
    }

    .blueprint-header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 18px;
      background: rgba(10, 16, 28, 0.95);
      border-bottom: 1px solid var(--color-border);
      gap: 12px;
      flex-wrap: wrap;
    }

    .blueprint-title-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .blueprint-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #2DD4BF;
      box-shadow: 0 0 8px #2DD4BF;
    }

    .blueprint-title {
      font-family: var(--font-mono);
      font-size: 0.74rem;
      font-weight: 700;
      color: #CBD5E1;
      letter-spacing: 0.08em;
    }

    .blueprint-pill {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      color: #2DD4BF;
      background: rgba(45, 212, 191, 0.12);
      border: 1px solid rgba(45, 212, 191, 0.3);
      padding: 3px 10px;
      border-radius: 9999px;
      letter-spacing: 0.06em;
    }

    .blueprint-viewport {
      background: #070B14;
      line-height: 0;
      overflow: hidden;
    }

    .blueprint-img {
      width: 100%;
      height: auto;
      display: block;
      aspect-ratio: 16 / 9.6;
      object-fit: contain;
      background-color: #070B14;
    }

    /* CTA Section */
    .cta-banner-card {
      padding: 48px;
      border-color: var(--color-border);
    }

    .cta-inner-grid {
      display: grid;
      grid-template-columns: 1.25fr 0.75fr;
      gap: 40px;
      align-items: center;
    }

    .cta-banner-title {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 12px;
    }

    .cta-banner-desc {
      font-size: 1rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }

    .cta-action-col {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .w-full {
      width: 100%;
      justify-content: center;
    }

    .solution-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 22px;
      font-family: var(--font-sans);
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--color-teal);
      text-decoration: none;
    }

    .solution-link:hover {
      text-decoration: underline;
    }

    .targets-note {
      margin-top: 12px;
      font-size: 0.78rem;
      color: var(--color-text-muted);
    }

    @media (max-width: 900px) {
      .solution-grid, .solution-grid.reverse {
        grid-template-columns: 1fr;
        gap: 36px;
      }
      .cta-inner-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .solution-stats-strip {
        flex-wrap: wrap;
      }
      .cta-banner-card {
        padding: 24px;
      }
    }
`;
