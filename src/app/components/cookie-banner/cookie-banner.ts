import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from '../../services/consent.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (consent.bannerOpen()) {
      <div class="cookie-banner glass-card" role="dialog" aria-live="polite" aria-labelledby="cookie-title">
        <div class="cookie-text">
          <h2 id="cookie-title" class="cookie-title">Analytics cookies</h2>
          <p>
            With your permission, we use Google Analytics cookies to see which pages are useful. We don't use
            advertising cookies, and the site works fully without them.
            <a routerLink="/privacy" fragment="cookies">Privacy policy</a>
          </p>
        </div>
        <div class="cookie-actions">
          <button type="button" class="btn-secondary" (click)="consent.decline()">Decline</button>
          <button type="button" class="btn-primary" (click)="accept()">Accept</button>
        </div>
      </div>
    }
  `,
  styles: [`
    .cookie-banner {
      position: fixed;
      left: 24px;
      right: 24px;
      bottom: 24px;
      z-index: 900;
      max-width: 760px;
      margin: 0 auto;
      padding: 20px 24px;
      display: flex;
      align-items: center;
      gap: 24px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
    }

    .cookie-banner:hover {
      transform: none;
    }

    .cookie-title {
      font-size: 1rem;
      margin-bottom: 4px;
    }

    .cookie-text p {
      font-size: 0.88rem;
      color: var(--color-text-secondary);
      line-height: 1.55;
    }

    .cookie-text a {
      color: var(--color-teal);
      white-space: nowrap;
    }

    .cookie-actions {
      display: flex;
      gap: 10px;
      flex-shrink: 0;
    }

    .cookie-actions button {
      padding: 10px 20px;
    }

    :host-context([data-theme="light"]) .cookie-banner,
    :host-context(.light-theme) .cookie-banner {
      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
    }

    @media (max-width: 640px) {
      .cookie-banner {
        left: 16px;
        right: 16px;
        bottom: 16px;
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
      }
      .cookie-actions button {
        flex: 1;
      }
    }
  `]
})
export class CookieBannerComponent {
  readonly consent = inject(ConsentService);
  private readonly analytics = inject(AnalyticsService);

  accept(): void {
    this.consent.accept();
    this.analytics.trackPageView(location.pathname);
  }
}
