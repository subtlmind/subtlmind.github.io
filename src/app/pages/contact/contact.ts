import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsService } from '../../services/analytics.service';
import { CONTACT_EMAIL, ENQUIRY_SEGMENTS, enquiryEmail, mailtoHref } from '../../content/site';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-wrap">
      <!-- HERO SECTION -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <div class="tag-eyebrow">CONTACT</div>
            <h1 class="hero-title">
              Talk to Our Engineers
            </h1>
            <p class="hero-subtitle">
              Email us at <strong>{{ email }}</strong> or use the form below to tell us about your site and what you want to achieve. We reply within one business day.
            </p>
          </div>
        </div>
      </section>

      <!-- PRIMARY CONTACT CARDS GRID -->
      <section class="section-padding channels-section">
        <div class="container">
          <div class="channels-grid">
            <!-- 1. ENTERPRISE EMAIL -->
            <div class="channel-card glass-card">
              <div class="card-header">
                <div class="icon-circle email-circle">
                  <!-- Mail SVG -->
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <span class="status-pill teal-pill">REPLY &lt; 1 BUSINESS DAY</span>
              </div>
              <h3 class="card-title">Email Us</h3>
              <p class="card-desc">
                Send project details, equipment lists, drawings or partnership enquiries straight to our engineering team.
              </p>
              <div class="card-val">{{ email }}</div>
              <div class="card-actions">
                <a 
                  [href]="emailHref" 
                  class="btn-primary" 
                  style="flex: 1; justify-content: center;">
                  <span>Send Direct Email</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <button (click)="copyText(email, 'email')" class="btn-copy">
                  {{ copiedField() === 'email' ? 'Copied!' : 'Copy' }}
                </button>
              </div>
            </div>

            <!-- 2. ARCHITECTURE SCOPING & CONFIDENTIALITY -->
            <div class="channel-card glass-card">
              <div class="card-header">
                <div class="icon-circle review-circle">
                  <!-- Shield / Blueprint SVG -->
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <span class="status-pill amber-pill">FREE</span>
              </div>
              <h3 class="card-title">45-Minute Site Review</h3>
              <p class="card-desc">
                A free call with one of our founding engineers to review your equipment, data and goals. We can sign a mutual NDA first.
              </p>
              <div class="card-val">45-Minute Call</div>
              <div class="card-actions">
                <a href="#discovery-form" class="btn-secondary" style="flex: 1; justify-content: center;">
                  <span>Request a Consultation &darr;</span>
                </a>
              </div>
            </div>

            <!-- 3. HEADQUARTERS & R&D -->
            <div class="channel-card glass-card">
              <div class="card-header">
                <div class="icon-circle hq-circle">
                  <!-- Map Pin SVG -->
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <span class="status-pill teal-pill">ON-SITE WORK</span>
              </div>
              <h3 class="card-title">Based in Hyderabad</h3>
              <p class="card-desc">
                Our engineering team is based in Hyderabad and works on site with clients across India. Remote engagements are available elsewhere.
              </p>
              <div class="card-val">HYDERABAD, IN</div>
              <div class="card-actions">
                <span class="hq-badge">Telangana, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- INTERACTIVE ARCHITECTURE DISCOVERY FORM -->
      <section id="discovery-form" class="section-padding form-section bg-alt-subtle">
        <div class="container">
          <div class="form-layout-grid">
            <div class="form-pitch-col">
              <div class="tag-eyebrow no-dot">— REQUEST A CONSULTATION</div>
              <h2 class="form-section-title">
                Tell us about your project
              </h2>
              <p class="form-section-desc">
                A few lines is enough: what site or equipment, and what you want to monitor, inspect or automate.
              </p>

              <div class="benefits-stack">
                <div class="benefit-item">
                  <span class="benefit-check">&#10003;</span>
                  <span>Free 45-minute review of your site and goals</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-check">&#10003;</span>
                  <span>A written pilot plan with scope, timeline and success metrics</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-check">&#10003;</span>
                  <span>You talk directly to the engineers who will build it</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-check">&#10003;</span>
                  <span>Mutual NDA signed before we look at your data</span>
                </div>
              </div>
            </div>

            <div class="form-card-col">
              <div class="glass-card form-container-card">
                <!-- Form State -->
                <form *ngIf="!isFormSubmitted()" (ngSubmit)="submitForm()" class="consult-form">
                  <div class="form-grid-2">
                    <div class="field-wrap">
                      <label class="input-lbl" for="cf-name">Full Name *</label>
                      <input 
                        type="text" 
                        [(ngModel)]="formData.name" 
                        name="name" id="cf-name" 
                        required 
                        placeholder="Alex Rivera"
                        class="text-input" 
                      />
                    </div>
                    <div class="field-wrap">
                      <label class="input-lbl" for="cf-email">Work Email *</label>
                      <input 
                        type="email" 
                        [(ngModel)]="formData.email" 
                        name="email" id="cf-email" 
                        required 
                        placeholder="alex@company.com"
                        class="text-input" 
                      />
                    </div>
                  </div>

                  <div class="field-wrap">
                    <label class="input-lbl" for="cf-segment">Industry *</label>
                    <select 
                      id="cf-segment"
                      [(ngModel)]="formData.segment" 
                      name="segment" 
                      required 
                      class="text-select">
                      @for (seg of segments; track seg) {
                        <option [value]="seg">{{ seg }}</option>
                      }
                    </select>
                  </div>

                  <div class="field-wrap">
                    <label class="input-lbl" for="cf-brief">What would you like to achieve? *</label>
                    <textarea 
                      [(ngModel)]="formData.brief" 
                      name="brief" id="cf-brief" 
                      required 
                      rows="4"
                      placeholder="E.g. we run 40 compressors across two plants and want warning before they fail..."
                      class="text-area">
                    </textarea>
                  </div>

                  <p class="form-note">Sending opens your email app with this message ready to go, addressed to {{ email }}.</p>
                  <button type="submit" class="btn-primary w-full">
                    <span>Write Email</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </form>

                <!-- Success Confirmation State -->
                <div *ngIf="isFormSubmitted()" class="form-success-box">
                  <div class="success-icon-badge">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 class="success-header">Almost there: press Send in your email app</h3>
                  <p class="success-message">
                    Thanks, {{ formData.name }}. We opened a draft addressed to <strong>{{ email }}</strong> in your email app. Once you send it, we will reply to <strong>{{ formData.email }}</strong> within one business day.
                  </p>
                  <p class="success-message">
                    Email app didn't open? Copy your message and send it to {{ email }} from any email account.
                  </p>
                  <div class="success-actions">
                    <button (click)="copyText(draftText, 'message')" class="btn-primary">
                      {{ copiedField() === 'message' ? 'Copied!' : 'Copy Message' }}
                    </button>
                    <button (click)="resetForm()" class="btn-secondary">
                      Start Over
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TECHNICAL ENGAGEMENT MODEL -->
      <section class="section-padding commitments-section">
        <div class="container">
          <div class="section-header text-center">
            <div class="tag-eyebrow no-dot">— HOW WE WORK</div>
            <h2 class="section-title">How a Project Runs</h2>
            <p class="section-subtitle max-w-2xl mx-auto">
              Four steps, each with a clear deliverable, so you can stop after any of them.
            </p>
          </div>

          <div class="commitments-grid">
            <div class="commit-card glass-card">
              <div class="commit-num text-teal">01</div>
              <h4 class="commit-title">Site &amp; Data Review</h4>
              <p class="commit-desc">
                We look at your equipment, existing sensors, cameras and network, and identify where data can save you money or risk.
              </p>
            </div>

            <div class="commit-card glass-card">
              <div class="commit-num text-amber">02</div>
              <h4 class="commit-title">System Design</h4>
              <p class="commit-desc">
                We design the full system, from sensors and edge hardware to models and the alerts or dashboards your team will use.
              </p>
            </div>

            <div class="commit-card glass-card">
              <div class="commit-num text-teal">03</div>
              <h4 class="commit-title">Pilot</h4>
              <p class="commit-desc">
                A small deployment on real assets, measured against success metrics we agree with you up front.
              </p>
            </div>

            <div class="commit-card glass-card">
              <div class="commit-num text-amber">04</div>
              <h4 class="commit-title">Rollout &amp; Support</h4>
              <p class="commit-desc">
                Scale to the rest of the site or portfolio, with monitoring, remote updates and ongoing support.
              </p>
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
      text-align: center;
      background: radial-gradient(circle at 50% 0%, rgba(45, 212, 191, 0.08) 0%, transparent 70%);
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-title {
      font-size: clamp(2.4rem, 4.5vw, 3.4rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 20px;
    }

    .hero-subtitle {
      font-size: 1.1rem;
      color: var(--color-text-secondary);
      line-height: 1.65;
    }

    /* Channels Grid */
    .channels-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .channel-card {
      padding: 32px;
      display: flex;
      flex-direction: column;
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .icon-circle {
      width: 50px;
      height: 50px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .email-circle {
      background: rgba(45, 212, 191, 0.14);
      color: var(--color-teal);
    }

    .review-circle {
      background: rgba(245, 158, 11, 0.14);
      color: var(--color-amber);
    }

    .hq-circle {
      background: rgba(168, 85, 247, 0.14);
      color: #A855F7;
    }

    .status-pill {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding: 4px 10px;
      border-radius: 9999px;
    }

    .teal-pill {
      background: rgba(45, 212, 191, 0.12);
      color: var(--color-teal);
      border: 1px solid rgba(45, 212, 191, 0.3);
    }

    .amber-pill {
      background: rgba(245, 158, 11, 0.12);
      color: var(--color-amber);
      border: 1px solid rgba(245, 158, 11, 0.3);
    }


    .card-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-bottom: 10px;
    }

    .card-desc {
      font-size: 0.88rem;
      color: var(--color-text-secondary);
      line-height: 1.55;
      margin-bottom: 20px;
      flex-grow: 1;
    }

    .card-val {
      font-family: var(--font-mono);
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--color-text-heading);
      margin-bottom: 16px;
      word-break: break-all;
    }

    .card-actions {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .btn-copy {
      padding: 10px 16px;
      border-radius: 10px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      color: var(--color-text-secondary);
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-copy:hover {
      color: var(--color-teal);
      border-color: var(--color-teal);
    }

    .hq-badge {
      font-family: var(--font-mono);
      font-size: 0.74rem;
      font-weight: 500;
      color: var(--color-text-muted);
    }

    /* Form Section */
    .bg-alt-subtle {
      background: var(--color-bg-alt);
      border-top: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
    }

    .form-layout-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 56px;
      align-items: center;
    }

    .form-section-title {
      font-size: clamp(2rem, 3.2vw, 2.5rem);
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 16px;
    }

    .form-section-desc {
      font-size: 1.05rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin-bottom: 28px;
    }

    .benefits-stack {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .benefit-item {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.92rem;
      color: var(--color-text-body);
    }

    .benefit-check {
      color: #2DD4BF;
      font-weight: 700;
      font-size: 1.1rem;
    }

    .form-container-card {
      padding: 36px;
    }

    .consult-form {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .form-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .field-wrap {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .input-lbl {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--color-text-body);
    }

    .text-input, .text-select, .text-area {
      width: 100%;
      background: var(--color-input-bg);
      border: 1px solid var(--color-border);
      border-radius: 10px;
      padding: 11px 14px;
      color: var(--color-text-heading);
      font-family: var(--font-sans);
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .text-input::placeholder, .text-area::placeholder {
      color: var(--color-text-muted);
      opacity: 0.9;
    }

    .text-input:focus, .text-select:focus, .text-area:focus {
      border-color: var(--color-teal);
      box-shadow: 0 0 12px rgba(45, 212, 191, 0.2);
    }

    .text-area {
      resize: vertical;
      min-height: 90px;
    }

    .w-full {
      width: 100%;
      justify-content: center;
    }

    .form-success-box {
      text-align: center;
      padding: 32px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .success-icon-badge {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(45, 212, 191, 0.15);
      border: 1px solid var(--color-teal);
      color: var(--color-teal);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .form-note {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      margin-bottom: 14px;
    }

    .success-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
    }

    .success-header {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-text-heading);
    }

    .success-message {
      font-size: 0.95rem;
      color: var(--color-text-secondary);
      max-width: 420px;
      line-height: 1.6;
    }

    /* Commitments Grid */
    .commitments-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-top: 40px;
    }

    .commit-card {
      padding: 28px;
    }

    .commit-num {
      font-family: var(--font-mono);
      font-size: 1.4rem;
      font-weight: 800;
      margin-bottom: 12px;
    }

    .commit-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-bottom: 8px;
    }

    .commit-desc {
      font-size: 0.86rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }

    .text-teal { color: var(--color-teal); }
    .text-amber { color: var(--color-amber); }

    @media (max-width: 1024px) {
      .channels-grid {
        grid-template-columns: 1fr;
      }
      .form-layout-grid {
        grid-template-columns: 1fr;
      }
      .commitments-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 640px) {
      .form-grid-2 {
        grid-template-columns: 1fr;
      }
      .commitments-grid {
        grid-template-columns: 1fr;
      }
      .form-container-card {
        padding: 24px;
      }
    }
  `]
})
export class ContactComponent {
  copiedField = signal<'email' | 'message' | null>(null);
  isFormSubmitted = signal(false);
  readonly email = CONTACT_EMAIL;
  readonly emailHref = mailtoHref('Project enquiry');
  readonly segments = ENQUIRY_SEGMENTS;
  draftText = '';

  formData = {
    name: '',
    email: '',
    segment: ENQUIRY_SEGMENTS[0] as string,
    brief: ''
  };

  copyText(text: string, field: 'email' | 'message'): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      this.copiedField.set(field);
      setTimeout(() => this.copiedField.set(null), 2000);
    }
  }

  private readonly analyticsService = inject(AnalyticsService);

  submitForm(): void {
    if (this.formData.name && this.formData.email && this.formData.brief) {
      const draft = enquiryEmail(
        { name: this.formData.name, email: this.formData.email, segment: this.formData.segment, message: this.formData.brief },
        'Project enquiry'
      );
      this.draftText = `To: ${this.email}\nSubject: ${draft.subject}\n\n${draft.body}`;
      if (typeof window !== 'undefined') {
        window.location.href = draft.href;
      }
      this.isFormSubmitted.set(true);
      this.analyticsService.trackEvent('generate_lead', {
        event_category: 'contact_form',
        event_label: this.formData.segment,
        value: 1
      });
    }
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      segment: ENQUIRY_SEGMENTS[0],
      brief: ''
    };
    this.draftText = '';
    this.isFormSubmitted.set(false);
  }
}
