import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BriefingService } from '../../services/briefing.service';
import { SOLUTIONS } from '../../content/solutions';
import { TARGETS_FOOTNOTE } from '../../content/site';
import { SOLUTION_BLOCK_STYLES } from './solution-block.styles';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-wrapper">
      <!-- HERO SECTION -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <div class="tag-eyebrow">SOLUTIONS</div>
            <h1 class="hero-title">
              From sensors and cameras<br />
              <span class="text-gradient">to automatic action</span>
            </h1>
            <p class="hero-subtitle">
              Seven building blocks for factories, buildings and farms. Use one on its own or combine them into a complete system that runs on edge hardware at your site, in a central cloud platform, or both.
            </p>
          </div>
        </div>
      </section>

      <!-- SOLUTIONS DEEP DIVE SECTIONS -->
      <div class="container solutions-list">
        @for (s of solutions; track s.slug; let odd = $odd) {
          <section [id]="s.anchor" class="solution-block">
            <div class="solution-grid" [class.reverse]="odd">
              <div class="solution-info" [style.order]="odd ? 2 : 1">
                <div class="tag-eyebrow no-dot">— {{ s.pillar }} / {{ s.eyebrow.toUpperCase() }}</div>
                <h2 class="solution-title">{{ s.title }}</h2>
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
                <a [routerLink]="['/solutions', s.slug]" class="solution-link">
                  Use cases &amp; details: {{ s.title }} &rarr;
                </a>
              </div>

              <div class="blueprint-card-wrap" [style.order]="odd ? 1 : 2">
                <div class="blueprint-header-bar">
                  <div class="blueprint-title-wrap">
                    <span class="blueprint-dot"></span>
                    <span class="blueprint-title">ARCHITECTURE // {{ s.blueprintLabel.toUpperCase() }}</span>
                  </div>
                  <span class="blueprint-pill">HIGH-LEVEL VIEW</span>
                </div>
                <div class="blueprint-viewport">
                  <img [src]="s.image" [alt]="s.imageAlt" class="blueprint-img" loading="lazy" />
                </div>
              </div>
            </div>
          </section>
        }
        <p class="targets-note">{{ targetsFootnote }}</p>
      </div>

      <!-- CTA BANNER -->
      <section class="section-padding">
        <div class="container">
          <div class="glass-card cta-banner-card">
            <div class="cta-inner-grid">
              <div class="cta-text-col">
                <h2 class="cta-banner-title">Not sure where to start?</h2>
                <p class="cta-banner-desc">
                  Tell us about your site and the problem you want to solve. We will suggest the smallest useful pilot and what it would take to run it.
                </p>
              </div>
              <div class="cta-action-col">
                <button (click)="briefingService.open()" class="btn-primary w-full">
                  <span>Request a Consultation</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
                <a routerLink="/" fragment="architecture" class="btn-secondary w-full">
                  <span>View System Architecture</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero-section {
      padding-top: 150px;
      padding-bottom: 70px;
      background: radial-gradient(circle at 50% 0%, rgba(45, 212, 191, 0.08) 0%, transparent 70%);
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

    .solutions-list {
      display: flex;
      flex-direction: column;
      gap: 100px;
      padding-top: 30px;
      padding-bottom: 60px;
    }

    @media (max-width: 900px) {
      .solutions-list {
        gap: 70px;
      }
      .solution-info, .blueprint-card-wrap {
        order: initial !important;
      }
    }
  `, SOLUTION_BLOCK_STYLES]
})
export class SolutionsComponent {
  readonly briefingService = inject(BriefingService);
  readonly solutions = SOLUTIONS;
  readonly targetsFootnote = TARGETS_FOOTNOTE;
}
