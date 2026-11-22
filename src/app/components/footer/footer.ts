import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer-wrapper">
      <div class="container footer-container">
        <!-- Brand & Description -->
        <div class="footer-brand-col">
          <a routerLink="/" (click)="onNavClick('/', undefined, undefined, $event)" class="footer-brand" aria-label="Subtlmind Home">
            <img 
              [src]="themeService.isLight() ? '/assets/subtlmind-logo-primary.svg' : '/assets/subtlmind-logo-white.svg'" 
              alt="Subtlmind" 
              class="brand-company-svg" 
            />
          </a>
          <p class="footer-desc">
            Subtlmind architects and develops edge-to-cloud AI and IoT solutions that transform raw sensory data into predictive maintenance, smart operations, and effortless everyday experiences.
          </p>
          <div class="system-status">
            <span class="pulse-dot"></span>
            <span class="status-text">AMBIENT SENSORY STREAM ACTIVE</span>
          </div>

          <!-- Social Media Links (username: subtlmind) -->
          <div class="footer-social-row">
            <a 
              href="https://www.linkedin.com/company/subtlmind" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="social-link-btn" 
              aria-label="Subtlmind on LinkedIn"
              title="LinkedIn: @subtlmind">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://www.instagram.com/subtlmind" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="social-link-btn" 
              aria-label="Subtlmind on Instagram"
              title="Instagram: @subtlmind">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Instagram</span>
            </a>
            <a 
              href="https://www.youtube.com/@subtlmind" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="social-link-btn" 
              aria-label="Subtlmind on YouTube"
              title="YouTube: @subtlmind">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube</span>
            </a>
            <a 
              href="https://github.com/subtlmind" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="social-link-btn" 
              aria-label="Subtlmind on GitHub"
              title="GitHub: @subtlmind">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <!-- Links Columns -->
        <div class="footer-links-grid">
          <!-- Solutions Column -->
          <div class="footer-col">
            <h4 class="col-title">SOLUTIONS</h4>
            <ul class="col-links">
              <li><a routerLink="/solutions" fragment="iot" (click)="onNavClick('/solutions', 'iot', undefined, $event)">Sensory Data &amp; IoT</a></li>
              <li><a routerLink="/solutions" fragment="vision" (click)="onNavClick('/solutions', 'vision', undefined, $event)">Video Inference &amp; Vision</a></li>
              <li><a routerLink="/solutions" fragment="predictive" (click)="onNavClick('/solutions', 'predictive', undefined, $event)">Predictive Maintenance</a></li>
              <li><a routerLink="/solutions" fragment="conversational" (click)="onNavClick('/solutions', 'conversational', undefined, $event)">Language Model Control</a></li>
              <li><a routerLink="/solutions" fragment="automation" (click)="onNavClick('/solutions', 'automation', undefined, $event)">Smart Operations</a></li>
            </ul>
          </div>

          <!-- Architecture Column -->
          <div class="footer-col">
            <h4 class="col-title">ARCHITECTURE</h4>
            <ul class="col-links">
              <li><a routerLink="/" fragment="architecture" [queryParams]="{ step: 0 }" (click)="onNavClick('/', 'architecture', { step: 0 }, $event)">1. Sense (Edge IoT)</a></li>
              <li><a routerLink="/" fragment="architecture" [queryParams]="{ step: 1 }" (click)="onNavClick('/', 'architecture', { step: 1 }, $event)">2. Process (Telemetry Stream)</a></li>
              <li><a routerLink="/" fragment="architecture" [queryParams]="{ step: 2 }" (click)="onNavClick('/', 'architecture', { step: 2 }, $event)">3. Reason (DL + LLM)</a></li>
              <li><a routerLink="/" fragment="architecture" [queryParams]="{ step: 3 }" (click)="onNavClick('/', 'architecture', { step: 3 }, $event)">4. Act (Closed-Loop Autonomy)</a></li>
            </ul>
          </div>

          <!-- Company Column -->
          <div class="footer-col">
            <h4 class="col-title">COMPANY</h4>
            <ul class="col-links">
              <li><a routerLink="/about" (click)="onNavClick('/about', undefined, undefined, $event)">About Us &amp; Vision</a></li>
              <li><a routerLink="/about" fragment="team" (click)="onNavClick('/about', 'team', undefined, $event)">Leadership</a></li>
              <li><a routerLink="/about" fragment="principles" (click)="onNavClick('/about', 'principles', undefined, $event)">How We Build</a></li>
              <li><a routerLink="/contact" (click)="onNavClick('/contact', undefined, undefined, $event)">Solutions Desk</a></li>
            </ul>
          </div>

          <!-- Direct Contact Column (WhatsApp and phone completely removed) -->
          <div class="footer-col contact-col">
            <h4 class="col-title">DIRECT CONTACT</h4>
            <ul class="col-links">
              <li>
                <a href="mailto:subtlmind@outlook.com?subject=Inquiry%20-%20Subtlmind" class="email-link">
                  <span>subtlmind&#64;outlook.com</span>
                  <span class="link-arrow">&nearr;</span>
                </a>
              </li>
              <li><span class="location-text">HYDERABAD, IN</span></li>
              <li><span class="sla-text">SLA &lt; 1 BUSINESS DAY</span></li>
              <li><span class="sla-text">DIRECT ARCHITECT ACCESS</span></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <div class="container bottom-container">
          <p class="copyright">© 2026 Subtlmind Technologies. All rights reserved.</p>
          <div class="legal-links">
            <a routerLink="/about" fragment="principles" (click)="onNavClick('/about', 'principles', undefined, $event)">Privacy Architecture</a>
            <a routerLink="/" fragment="architecture" [queryParams]="{ step: 1 }" (click)="onNavClick('/', 'architecture', { step: 1 }, $event)">Zero-Trust Edge Security</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-wrapper {
      background: var(--color-bg-alt);
      border-top: 1px solid var(--color-border);
      margin-top: 80px;
      position: relative;
      z-index: 10;
      transition: background-color 0.25s ease, border-color 0.25s ease;
    }

    .footer-container {
      display: flex;
      justify-content: space-between;
      gap: 48px;
      padding-top: 64px;
      padding-bottom: 64px;
    }

    .footer-brand-col {
      max-width: 340px;
      flex-shrink: 0;
    }

    .footer-brand {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      margin-bottom: 20px;
    }

    .brand-company-svg {
      height: 34px;
      width: auto;
      max-width: 180px;
      flex-shrink: 0;
      transition: opacity 0.2s ease, transform 0.2s ease;
      display: block;
    }

    .footer-brand:hover .brand-company-svg {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    .footer-desc {
      font-size: 0.88rem;
      line-height: 1.6;
      color: var(--color-text-secondary);
      margin-bottom: 24px;
    }

    .system-status {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 6px 12px;
      background: rgba(45, 212, 191, 0.08);
      border: 1px solid rgba(45, 212, 191, 0.25);
      border-radius: 8px;
    }

    .status-text {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      color: var(--color-teal);
    }

    /* Social Media Links */
    .footer-social-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 20px;
      flex-wrap: wrap;
    }

    .social-link-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 8px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      color: var(--color-text-secondary);
      font-size: 0.8rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .social-link-btn:hover {
      color: var(--color-teal);
      border-color: var(--color-teal);
      background: rgba(45, 212, 191, 0.08);
      transform: translateY(-2px);
    }

    .social-link-btn svg {
      flex-shrink: 0;
      transition: transform 0.2s ease;
    }

    .social-link-btn:hover svg {
      transform: scale(1.1);
    }

    .footer-links-grid {
      display: flex;
      justify-content: space-between;
      gap: 32px;
      flex: 1;
    }

    .footer-col {
      min-width: max-content;
      flex-shrink: 0;
    }

    .col-title {
      font-family: var(--font-mono);
      font-size: 0.76rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      color: var(--color-cyan);
      margin-bottom: 18px;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .col-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .col-links li {
      white-space: nowrap;
      line-height: 1.4;
    }

    .col-links a {
      color: var(--color-text-secondary);
      text-decoration: none;
      font-size: 0.88rem;
      line-height: 1.4;
      white-space: nowrap;
      transition: color 0.2s ease, transform 0.2s ease;
      display: inline-flex;
      align-items: center;
    }

    .col-links a:hover {
      color: var(--color-text-heading);
      transform: translateX(2px);
    }

    .email-link {
      display: inline-flex !important;
      align-items: center;
      gap: 5px;
      color: var(--color-cyan) !important;
      font-weight: 600;
      white-space: nowrap;
    }

    .link-arrow {
      font-size: 0.85rem;
      transition: transform 0.2s ease;
      display: inline-block;
      line-height: 1;
    }

    .email-link:hover .link-arrow {
      transform: translate(2px, -2px);
    }

    .location-text {
      color: var(--color-text-heading);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      white-space: nowrap;
      display: inline-block;
      line-height: 1.4;
    }

    .sla-text {
      color: var(--color-text-muted);
      font-family: var(--font-mono);
      font-size: 0.74rem;
      font-weight: 500;
      letter-spacing: 0.04em;
      white-space: nowrap;
      display: inline-block;
      line-height: 1.4;
    }

    .footer-bottom {
      border-top: 1px solid var(--color-border);
      padding: 24px 0;
    }

    .bottom-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .copyright {
      font-size: 0.82rem;
      color: var(--color-text-muted);
    }

    .legal-links {
      display: flex;
      gap: 24px;
    }

    .legal-links a {
      font-size: 0.82rem;
      color: var(--color-text-muted);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .legal-links a:hover {
      color: var(--color-cyan);
    }

    @media (max-width: 1140px) {
      .footer-container {
        flex-direction: column;
        gap: 44px;
      }

      .footer-brand-col {
        max-width: 560px;
      }

      .footer-links-grid {
        display: grid;
        grid-template-columns: repeat(4, max-content);
        gap: 36px 32px;
        justify-content: space-between;
      }
    }

    @media (max-width: 860px) {
      .footer-links-grid {
        grid-template-columns: repeat(2, max-content);
        gap: 36px 48px;
        justify-content: flex-start;
      }
    }

    @media (max-width: 520px) {
      .footer-links-grid {
        grid-template-columns: 1fr;
        gap: 28px;
      }
    }

    @media (max-width: 600px) {
      .bottom-container {
        flex-direction: column;
        gap: 12px;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  readonly themeService = inject(ThemeService);
  readonly scrollService = inject(ScrollService);

  onNavClick(route: string, fragment?: string, queryParams?: Record<string, any>, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.scrollService.navigateTo(route, fragment, queryParams);
  }
}
