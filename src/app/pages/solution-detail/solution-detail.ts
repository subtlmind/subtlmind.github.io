import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BriefingService } from '../../services/briefing.service';
import { SOLUTIONS, findSolution } from '../../content/solutions';
import { TARGETS_FOOTNOTE } from '../../content/site';
import { SOLUTION_BLOCK_STYLES } from '../solutions/solution-block.styles';

@Component({
  selector: 'app-solution-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (solution(); as s) {
      <div class="page-wrapper">
        <section class="hero-section">
          <div class="container">
            <nav class="breadcrumb" aria-label="Breadcrumb">
              <a routerLink="/solutions">Solutions</a>
              <span aria-hidden="true">/</span>
              <span>{{ s.title }}</span>
            </nav>
            <div class="tag-eyebrow">{{ s.eyebrow.toUpperCase() }}</div>
            <h1 class="hero-title">{{ s.title }}</h1>
            <p class="hero-subtitle">{{ s.summary }}</p>
            <div class="hero-cta-group">
              <button (click)="briefingService.open()" class="btn-primary">
                <span>Request a Consultation</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <a routerLink="/solutions" class="btn-secondary"><span>All Solutions</span></a>
            </div>
          </div>
        </section>

        <!-- WHAT IT DOES -->
        <section class="section-padding detail-main">
          <div class="container">
            <div class="solution-grid">
              <div class="solution-info">
                <div class="tag-eyebrow no-dot">— HOW IT WORKS</div>
                <h2 class="solution-title">What we build</h2>
                <p class="solution-desc">{{ s.desc }}</p>
                <ul class="bullet-list">
                  @for (b of s.bullets; track b) {
                    <li>{{ b }}</li>
                  }
                </ul>
                <div class="solution-stats-strip">
                  @for (st of s.stats; track st.label) {
                    <div class="mini-stat">
                      <span class="stat-number">{{ st.value }}</span>
                      <span class="stat-label">{{ st.label }}</span>
                    </div>
                  }
                </div>
                <p class="targets-note">{{ targetsFootnote }}</p>
              </div>

              <div class="blueprint-card-wrap">
                <div class="blueprint-header-bar">
                  <div class="blueprint-title-wrap">
                    <span class="blueprint-dot"></span>
                    <span class="blueprint-title">ARCHITECTURE // {{ s.blueprintLabel.toUpperCase() }}</span>
                  </div>
                  <span class="blueprint-pill">HIGH-LEVEL VIEW</span>
                </div>
                <div class="blueprint-viewport">
                  <img [src]="s.image" [alt]="s.imageAlt" class="blueprint-img" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- USE CASES -->
        <section class="section-padding bg-alt-subtle">
          <div class="container">
            <div class="tag-eyebrow no-dot">— TYPICAL USE CASES</div>
            <h2 class="section-title">Where teams use it</h2>
            <div class="usecase-grid">
              @for (u of s.useCases; track u.title) {
                <div class="glass-card usecase-card">
                  <h3 class="usecase-title">{{ u.title }}</h3>
                  <p class="usecase-desc">{{ u.desc }}</p>
                </div>
              }
            </div>

            <div class="integrations">
              <span class="integrations-label">Works with</span>
              <div class="integrations-tags">
                @for (i of s.integrations; track i) {
                  <span class="tech-tag">{{ i }}</span>
                }
              </div>
            </div>
          </div>
        </section>

        <!-- ENGAGEMENT -->
        <section class="section-padding">
          <div class="container">
            <div class="tag-eyebrow no-dot">— HOW A PROJECT RUNS</div>
            <h2 class="section-title">From first call to production</h2>
            <div class="steps-grid">
              <div class="glass-card step-card">
                <span class="step-num text-teal">01</span>
                <h3 class="step-title">Site review</h3>
                <p class="step-desc">We look at your equipment, cameras, network and the problem you want solved, and agree what success looks like.</p>
              </div>
              <div class="glass-card step-card">
                <span class="step-num text-amber">02</span>
                <h3 class="step-title">Pilot</h3>
                <p class="step-desc">A small deployment on real assets, measured against the metrics we agreed at the start.</p>
              </div>
              <div class="glass-card step-card">
                <span class="step-num text-teal">03</span>
                <h3 class="step-title">Rollout</h3>
                <p class="step-desc">Scale to more lines, floors or sites, with monitoring, model updates and support.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- OTHER SOLUTIONS -->
        <section class="section-padding bg-alt-subtle">
          <div class="container">
            <div class="tag-eyebrow no-dot">— RELATED</div>
            <h2 class="section-title">Other solutions</h2>
            <div class="related-grid">
              @for (o of others(); track o.slug) {
                <a [routerLink]="['/solutions', o.slug]" class="glass-card related-card">
                  <span class="related-eyebrow">{{ o.eyebrow }}</span>
                  <span class="related-title">{{ o.title }}</span>
                  <span class="related-desc">{{ o.summary }}</span>
                </a>
              }
            </div>
          </div>
        </section>

        <!-- CTA -->
        <section class="section-padding">
          <div class="container">
            <div class="glass-card cta-banner-card">
              <div class="cta-inner-grid">
                <div class="cta-text-col">
                  <h2 class="cta-banner-title">Discuss {{ s.title.toLowerCase() }} for your site</h2>
                  <p class="cta-banner-desc">Tell us about your equipment and goals. We reply within one business day.</p>
                </div>
                <div class="cta-action-col">
                  <button (click)="briefingService.open()" class="btn-primary w-full">
                    <span>Request a Consultation</span>
                  </button>
                  <a routerLink="/contact" class="btn-secondary w-full"><span>Contact Us</span></a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    }
  `,
  styles: [`
    .hero-section {
      padding-top: 150px;
      padding-bottom: 40px;
      background: radial-gradient(circle at 50% 0%, rgba(45, 212, 191, 0.08) 0%, transparent 70%);
    }

    .breadcrumb {
      display: flex;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--color-text-muted);
      margin-bottom: 20px;
    }

    .breadcrumb a {
      color: var(--color-teal);
      text-decoration: none;
    }

    .hero-title {
      font-size: clamp(2.4rem, 4.5vw, 3.6rem);
      margin-bottom: 20px;
      font-weight: 800;
      letter-spacing: -0.03em;
    }

    .hero-subtitle {
      font-size: 1.15rem;
      color: var(--color-text-secondary);
      max-width: 720px;
      line-height: 1.6;
    }

    .hero-cta-group {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 32px;
    }

    .bg-alt-subtle {
      background: var(--color-bg-alt);
    }

    .section-title {
      margin-bottom: 32px;
    }

    .usecase-grid, .steps-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .usecase-card, .step-card {
      padding: 28px;
    }

    .usecase-title, .step-title {
      font-size: 1.1rem;
      margin-bottom: 10px;
    }

    .usecase-desc, .step-desc {
      font-size: 0.95rem;
      color: var(--color-text-secondary);
    }

    .step-num {
      display: block;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.85rem;
      margin-bottom: 12px;
    }

    .integrations {
      margin-top: 36px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 14px;
    }

    .integrations-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .integrations-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tech-tag {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--color-text-secondary);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 9999px;
      padding: 4px 12px;
    }

    .related-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .related-card {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 24px;
      text-decoration: none;
    }

    .related-card:hover {
      transform: translateY(-2px);
    }

    .related-eyebrow {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-teal);
    }

    .related-title {
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-text-heading);
    }

    .related-desc {
      font-size: 0.9rem;
      color: var(--color-text-secondary);
    }

    @media (max-width: 1024px) {
      .usecase-grid, .steps-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .usecase-grid, .steps-grid, .related-grid {
        grid-template-columns: 1fr;
      }
    }
  `, SOLUTION_BLOCK_STYLES]
})
export class SolutionDetailComponent {
  readonly briefingService = inject(BriefingService);
  private readonly route = inject(ActivatedRoute);
  readonly targetsFootnote = TARGETS_FOOTNOTE;

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug'))), {
    initialValue: this.route.snapshot.paramMap.get('slug')
  });

  readonly solution = computed(() => findSolution(this.slug()));
  readonly others = computed(() => SOLUTIONS.filter((s) => s.slug !== this.slug()));
}
