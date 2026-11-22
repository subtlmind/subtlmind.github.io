import { Component, EventEmitter, Input, Output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-briefing-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isOpen" class="modal-overlay" (click)="onBackdropClick($event)">
      <div class="modal-card">
        <!-- Close Button -->
        <button class="modal-close" (click)="closeModal()" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="tag-eyebrow">SUBTLMIND SOLUTIONS DESK</div>
        <h2 class="modal-title">Schedule an Architecture Consultation</h2>
        <p class="modal-desc">
          Discuss your smart living, predictive maintenance, or conversational AI deployment directly with our solutions architects.
        </p>

        <!-- Direct Email Card -->
        <div class="direct-email-strip">
          <div class="email-info">
            <span class="email-badge">OFFICIAL INQUIRY DESK</span>
            <span class="email-address">subtlmind&#64;outlook.com</span>
          </div>
          <div class="email-actions">
            <a 
              href="mailto:subtlmind@outlook.com?subject=Consultation%20Inquiry%20-%20Subtlmind" 
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
                <label class="field-label">Full Name *</label>
                <input 
                  type="text" 
                  name="fullName" 
                  [(ngModel)]="formData.fullName" 
                  required 
                  placeholder="Alex Rivera"
                  class="field-input" 
                />
              </div>
              <div class="form-field">
                <label class="field-label">Work Email *</label>
                <input 
                  type="email" 
                  name="workEmail" 
                  [(ngModel)]="formData.workEmail" 
                  required 
                  placeholder="alex@company.com"
                  class="field-input" 
                />
              </div>
            </div>

            <div class="form-field">
              <label class="field-label">Ecosystem Segment *</label>
              <select 
                name="segment" 
                [(ngModel)]="formData.segment" 
                required 
                class="field-select">
                <option value="Enterprise Operations">Enterprise Operations &amp; Light Industrial</option>
                <option value="Commercial Real Estate">Commercial Buildings &amp; Smart Workspaces</option>
                <option value="Smart Residential">Smart Living &amp; Residential Ecosystems</option>
                <option value="Custom AI/IoT">Custom AI / IoT Product Partnership</option>
              </select>
            </div>

            <div class="form-field">
              <label class="field-label">Project Brief &amp; Sensory Objectives *</label>
              <textarea 
                name="brief" 
                [(ngModel)]="formData.brief" 
                required 
                rows="3"
                placeholder="Tell us about the spaces, telemetry, or intelligent workflows you want to build..."
                class="field-textarea">
              </textarea>
            </div>

            <button type="submit" class="btn-submit">
              <span>Confirm Consultation Request</span>
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
          <h3 class="success-title">Consultation Requested!</h3>
          <p class="success-desc">
            Thank you, {{ formData.fullName || 'there' }}. Our architecture team has received your brief and will email calendar availability to <strong>{{ formData.workEmail || 'your email' }}</strong> within 1 business day.
          </p>
          <div class="success-actions">
            <button (click)="resetForm()" class="btn-secondary">Submit Another Brief</button>
            <button (click)="closeModal()" class="btn-primary">Done</button>
          </div>
        </div>

        <!-- Footer Meta Info -->
        <div class="modal-footer-info">
          <div class="footer-meta-item">
            <span class="meta-label">HEADQUARTERS</span>
            <span class="meta-value">HYDERABAD, IN</span>
          </div>
          <div class="footer-meta-item">
            <span class="meta-label">RESPONSE SLA</span>
            <span class="meta-value">UNDER 1 BUSINESS DAY</span>
          </div>
          <div class="footer-meta-item">
            <span class="meta-label">ENGAGEMENT MODEL</span>
            <span class="meta-value">DIRECT ARCHITECT ACCESS</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
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

  formData = {
    fullName: '',
    workEmail: '',
    segment: 'Enterprise Operations',
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
      segment: 'Enterprise Operations',
      brief: ''
    };
    this.isSubmitted.set(false);
  }

  copyEmail(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('subtlmind@outlook.com');
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
    }
  }
}
