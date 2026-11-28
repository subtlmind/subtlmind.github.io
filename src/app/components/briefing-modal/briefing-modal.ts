import { Component, EventEmitter, Input, Output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsService } from '../../services/analytics.service';
import { CONTACT_EMAIL, ENQUIRY_SEGMENTS, enquiryEmail, mailtoHref } from '../../content/site';

@Component({
  selector: 'app-briefing-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isOpen" class="modal-overlay" (click)="onBackdropClick($event)">
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="briefing-title">
        <!-- Close Button -->
        <button class="modal-close" (click)="closeModal()" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="tag-eyebrow">SUBTLMIND</div>
        <h2 class="modal-title" id="briefing-title">Request a Consultation</h2>
        <p class="modal-desc">
          Tell us briefly about your site and goals. We will reply by email within one business day to arrange a call.
        </p>

        <!-- Direct Email Card -->
        <div class="direct-email-strip">
          <div class="email-info">
            <span class="email-badge">EMAIL US DIRECTLY</span>
            <span class="email-address">{{ email }}</span>
          </div>
          <div class="email-actions">
            <a 
              [href]="emailHref" 
              class="btn-email-direct">
              Send Email ↗
            </a>
            <button (click)="copyEmail()" class="btn-copy">
              {{ isCopied() ? 'Copied!' : 'Copy' }}
            </button>
          </div>
        </div>

        <!-- Consultation Form -->
        <div *ngIf="!isSubmitted()" class="form-wrapper">
          <form (ngSubmit)="onSubmit()" class="consultation-form">
            <div class="form-row-2">
              <div class="form-field">
                <label class="field-label" for="bm-name">Full Name *</label>
                <input 
                  type="text" 
                  name="fullName" id="bm-name" 
                  [(ngModel)]="formData.fullName" 
                  required 
                  placeholder="Alex Rivera"
                  class="field-input" 
                />
              </div>
              <div class="form-field">
                <label class="field-label" for="bm-email">Work Email *</label>
                <input 
                  type="email" 
                  name="workEmail" id="bm-email" 
                  [(ngModel)]="formData.workEmail" 
                  required 
                  placeholder="alex@company.com"
                  class="field-input" 
                />
              </div>
            </div>

            <div class="form-field">
              <label class="field-label" for="bm-segment">Industry *</label>
              <select 
                id="bm-segment"
                name="segment" 
                [(ngModel)]="formData.segment" 
                required 
                class="field-select">
                @for (seg of segments; track seg) {
                  <option [value]="seg">{{ seg }}</option>
                }
              </select>
            </div>

            <div class="form-field">
              <label class="field-label" for="bm-brief">What would you like to achieve? *</label>
              <textarea 
                name="brief" id="bm-brief" 
                [(ngModel)]="formData.brief" 
                required 
                rows="3"
                placeholder="E.g. we want early warning on chiller failures across three buildings..."
                class="field-textarea">
              </textarea>
            </div>

            <p class="form-note">This opens your email app with the message ready to send to {{ email }}.</p>
            <button type="submit" class="btn-submit">
              <span>Write Email</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>
        </div>

        <!-- Success Confirmation State -->
        <div *ngIf="isSubmitted()" class="submission-success">
          <div class="success-icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 class="success-title">Almost there: press Send in your email app</h3>
          <p class="success-desc">
            Thanks, {{ formData.fullName || 'there' }}. We opened a draft to <strong>{{ email }}</strong> in your email app. Once it is sent, we will reply to <strong>{{ formData.workEmail || 'your email' }}</strong> within one business day with times for a call.
          </p>
          <p class="success-desc">
            Email app didn't open? Copy the message and send it from any email account.
          </p>
          <div class="success-actions">
            <button (click)="copyDraft()" class="btn-secondary">{{ isDraftCopied() ? 'Copied!' : 'Copy Message' }}</button>
            <button (click)="closeModal()" class="btn-primary">Done</button>
          </div>
        </div>

        <!-- Footer Meta Info -->
        <div class="modal-footer-info">
          <div class="footer-meta-item">
            <span class="meta-label">BASED IN</span>
            <span class="meta-value">HYDERABAD, IN</span>
          </div>
          <div class="footer-meta-item">
            <span class="meta-label">REPLY TIME</span>
            <span class="meta-value">UNDER 1 BUSINESS DAY</span>
          </div>
          <div class="footer-meta-item">
            <span class="meta-label">YOU TALK TO</span>
            <span class="meta-value">THE ENGINEERS WHO BUILD IT</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-note {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      margin-bottom: 12px;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(6, 9, 15, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
      animation: fadeIn 0.2s ease-out;
    }

    .modal-card {
      width: 100%;
      max-width: 640px;
      max-height: 90vh;
      overflow-y: auto;
      background: var(--color-surface, #101829);
      border: 1px solid var(--color-card-border, rgba(255, 255, 255, 0.1));
      border-radius: 20px;
      padding: 36px;
      position: relative;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(45, 212, 191, 0.15);
      animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--color-border);
      border-radius: 10px;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-secondary);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .modal-close:hover {
      color: #ffffff;
      border-color: var(--color-cyan);
      background: rgba(45, 212, 191, 0.12);
    }

    .modal-title {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-top: 4px;
      margin-bottom: 8px;
    }

    .modal-desc {
      font-size: 0.92rem;
      color: var(--color-text-secondary);
      line-height: 1.55;
      margin-bottom: 24px;
    }

    .direct-email-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 14px 18px;
      border-radius: 14px;
      background: rgba(45, 212, 191, 0.08);
      border: 1px solid rgba(45, 212, 191, 0.25);
      margin-bottom: 24px;
    }

    .email-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .email-badge {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      color: var(--color-teal);
      letter-spacing: 0.08em;
    }

    .email-address {
      font-family: var(--font-mono);
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--color-text-heading);
    }

    .email-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-email-direct {
      display: inline-flex;
      align-items: center;
      padding: 7px 14px;
      border-radius: 8px;
      background: var(--color-btn-primary-bg);
      color: var(--color-btn-primary-text);
      font-size: 0.82rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .btn-email-direct:hover {
      background: var(--color-btn-primary-hover);
      box-shadow: 0 0 14px rgba(45, 212, 191, 0.4);
    }

    .btn-copy {
      padding: 7px 12px;
      border-radius: 8px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      color: var(--color-text-secondary);
      font-size: 0.82rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-copy:hover {
      color: var(--color-teal);
      border-color: var(--color-teal);
    }

    .consultation-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-row-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .field-label {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--color-text-body);
      letter-spacing: 0.02em;
    }

    .field-input, .field-select, .field-textarea {
      width: 100%;
      background: var(--color-input-bg);
      border: 1px solid var(--color-border);
      border-radius: 10px;
      padding: 10px 14px;
      color: var(--color-text-heading);
      font-family: var(--font-sans);
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .field-input::placeholder, .field-textarea::placeholder {
      color: var(--color-text-muted);
      opacity: 0.9;
    }

    .field-input:focus, .field-select:focus, .field-textarea:focus {
      border-color: var(--color-teal);
      box-shadow: 0 0 12px rgba(45, 212, 191, 0.2);
    }

    .field-textarea {
      resize: vertical;
      min-height: 80px;
    }

    .btn-submit {
      margin-top: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 13px 20px;
      border-radius: 12px;
      background: var(--color-btn-primary-bg);
      color: var(--color-btn-primary-text);
      font-family: var(--font-sans);
      font-size: 0.92rem;
      font-weight: 700;
      border: none;
      cursor: pointer;
      box-shadow: 0 0 25px rgba(45, 212, 191, 0.35);
      transition: all 0.25s ease;
    }

    .btn-submit:hover {
      background: var(--color-btn-primary-hover);
      box-shadow: 0 0 35px rgba(45, 212, 191, 0.55);
      transform: translateY(-1px);
    }

    .submission-success {
      text-align: center;
      padding: 28px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
    }

    .success-icon-wrap {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: rgba(45, 212, 191, 0.15);
      border: 1px solid var(--color-teal);
      color: var(--color-teal);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .success-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--color-text-heading);
    }

    .success-desc {
      font-size: 0.92rem;
      color: var(--color-text-secondary);
      max-width: 440px;
      line-height: 1.6;
    }

    .success-actions {
      display: flex;
      gap: 12px;
      margin-top: 10px;
    }

    .modal-footer-info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding-top: 20px;
      margin-top: 24px;
      border-top: 1px solid var(--color-border);
      text-align: center;
    }

    .meta-label {
      display: block;
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 600;
      color: var(--color-text-muted);
      letter-spacing: 0.08em;
      margin-bottom: 4px;
    }

    .meta-value {
      font-family: var(--font-mono);
      font-size: 0.76rem;
      font-weight: 600;
      color: var(--color-cyan);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 600px) {
      .modal-card {
        padding: 24px;
      }
      .form-row-2 {
        grid-template-columns: 1fr;
      }
      .direct-email-strip {
        flex-direction: column;
        align-items: flex-start;
      }
      .modal-footer-info {
        grid-template-columns: 1fr;
        gap: 10px;
      }
    }
  `]
})
export class BriefingModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  isSubmitted = signal(false);
  isCopied = signal(false);
  isDraftCopied = signal(false);
  readonly email = CONTACT_EMAIL;
  readonly emailHref = mailtoHref('Consultation request');
  readonly segments = ENQUIRY_SEGMENTS;
  private draftText = '';

  formData = {
    fullName: '',
    workEmail: '',
    segment: ENQUIRY_SEGMENTS[0] as string,
    brief: ''
  };

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  private readonly analyticsService = inject(AnalyticsService);

  onSubmit(): void {
    if (this.formData.fullName && this.formData.workEmail && this.formData.brief) {
      const draft = enquiryEmail(
        { name: this.formData.fullName, email: this.formData.workEmail, segment: this.formData.segment, message: this.formData.brief },
        'Consultation request'
      );
      this.draftText = `To: ${this.email}\nSubject: ${draft.subject}\n\n${draft.body}`;
      if (typeof window !== 'undefined') {
        window.location.href = draft.href;
      }
      this.isSubmitted.set(true);
      this.analyticsService.trackEvent('generate_lead', {
        event_category: 'consultation',
        event_label: this.formData.segment,
        value: 1
      });
    }
  }

  resetForm(): void {
    this.formData = {
      fullName: '',
      workEmail: '',
      segment: ENQUIRY_SEGMENTS[0],
      brief: ''
    };
    this.draftText = '';
    this.isSubmitted.set(false);
  }

  copyDraft(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.draftText);
      this.isDraftCopied.set(true);
      setTimeout(() => this.isDraftCopied.set(false), 2000);
    }
  }

  copyEmail(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.email);
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
    }
  }
}
