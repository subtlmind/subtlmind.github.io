import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { COMPANY, CONTACT_EMAIL, mailtoHref } from '../../content/site';

/** Renders /privacy or /terms, selected by the route's `doc` data value. */
@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="legal-page">
      <div class="container legal-container">
        @if (doc === 'privacy') {
          <div class="tag-eyebrow">LEGAL</div>
          <h1 class="legal-title">Privacy Policy</h1>
          <p class="legal-updated">Last updated: {{ lastUpdated }}</p>

          <section>
            <h2>1. Who we are</h2>
            <p>
              This policy explains how {{ entityName }} ("Subtlmind", "we", "us") handles personal data when you
              visit subtlmind.in or contact us. We are based in {{ company.city }}, {{ company.region }}, {{ company.country }},
              and we process personal data in line with India's Digital Personal Data Protection Act, 2023 (DPDP Act).
            </p>
            @if (company.registeredAddress) {
              <p>Registered office: {{ company.registeredAddress }}</p>
            }
          </section>

          <section>
            <h2>2. What we collect</h2>
            <ul>
              <li>
                <strong>Information you send us.</strong> When you email us or use the contact form (which opens a draft
                in your own email app), we receive your name, email address, organisation type and whatever you write in
                your message.
              </li>
              <li>
                <strong>Usage data, only if you accept analytics cookies.</strong> We use Google Analytics 4 to understand
                which pages are visited. It collects pseudonymous data such as pages viewed, approximate location, device
                and browser type, and referring site.
              </li>
              <li>
                <strong>Preferences.</strong> Your light/dark theme and cookie choices are stored in your browser's local
                storage and never sent to us.
              </li>
            </ul>
            <p>We do not sell personal data and we do not use it for automated decision-making about you.</p>
          </section>

          <section>
            <h2>3. Why we use it</h2>
            <ul>
              <li>To reply to your enquiry and discuss a possible project with you.</li>
              <li>To understand how the website is used and improve it.</li>
              <li>To meet legal obligations, for example keeping business records.</li>
            </ul>
            <p>
              We process your data on the basis of your consent (given when you contact us or accept analytics) or for
              the legitimate uses the DPDP Act permits. You can withdraw consent at any time by emailing us.
            </p>
          </section>

          <section>
            <h2>4. Client project data</h2>
            <p>
              When we deploy systems for a client, sensor, video and operational data are processed under a separate
              written agreement with that client, which sets out what is collected, where it is stored and how long it
              is kept. Depending on that agreement, data is processed on the client's own premises, in the client's cloud
              account, or in our managed cloud platform. We remove personal identifiers at the edge where possible (for
              example by blurring faces) and favour non-camera sensing such as mmWave radar for occupancy.
            </p>
          </section>

          <section>
            <h2>5. Who we share it with</h2>
            <p>We share personal data only with service providers that help us run the business:</p>
            <ul>
              <li>Our email provider, which stores the messages you send us.</li>
              <li>Google LLC, for website analytics.</li>
              <li>GitHub, Inc., which hosts this website and keeps standard server logs (such as IP addresses).</li>
            </ul>
            <p>
              Some of these providers store data outside India. We will share data with authorities only where the law
              requires it.
            </p>
          </section>

          <section>
            <h2>6. How long we keep it</h2>
            <p>
              We keep enquiry emails for as long as needed to respond and follow up, and for no more than 24 months after
              our last contact unless we start working together. Google Analytics data is kept for 14 months.
            </p>
          </section>

          <section>
            <h2>7. Your rights</h2>
            <p>Under the DPDP Act you have the right to:</p>
            <ul>
              <li>ask what personal data we hold about you and how we use it;</li>
              <li>have inaccurate data corrected or completed, and ask us to erase it;</li>
              <li>withdraw consent;</li>
              <li>nominate someone to exercise your rights if you die or become incapacitated; and</li>
              <li>have a grievance addressed by us, and escalate it to the Data Protection Board of India if you are not satisfied.</li>
            </ul>
            <p>
              To exercise any of these rights, email <a [href]="privacyMailto">{{ email }}</a>. We will respond within 30 days.
            </p>
          </section>

          <section id="cookies">
            <h2>8. Cookies</h2>
            <p>
              We only use analytics cookies, and only if you agree. When you first visit, a banner asks whether you
              accept Google Analytics. Until you accept, Google Analytics is not loaded and sets no cookies. If you
              accept, it sets cookies named <code>_ga</code> and <code>_ga_*</code>. We do not use advertising cookies.
            </p>
            <p>
              You can change your choice at any time with the "Cookie Settings" link at the bottom of every page.
              Declining removes the analytics cookies. The site works fully either way.
            </p>
          </section>

          <section>
            <h2>9. Children</h2>
            <p>This website is meant for businesses. We do not knowingly collect data from anyone under 18.</p>
          </section>

          <section>
            <h2>10. Changes and contact</h2>
            <p>
              We will post any changes on this page and update the date at the top. For questions or grievances about
              this policy, contact us at <a [href]="privacyMailto">{{ email }}</a>.
            </p>
          </section>
        } @else {
          <div class="tag-eyebrow">LEGAL</div>
          <h1 class="legal-title">Terms of Use</h1>
          <p class="legal-updated">Last updated: {{ lastUpdated }}</p>

          <section>
            <h2>1. About these terms</h2>
            <p>
              These terms apply to your use of subtlmind.in, operated by {{ entityName }}. By using the site you agree to
              them. If you do not agree, please do not use the site.
            </p>
          </section>

          <section>
            <h2>2. Information on this site</h2>
            <p>
              The content here describes our services in general terms and is provided for information only. Performance
              figures are design targets, not guarantees; actual results depend on each site and are agreed and measured
              in a written project agreement. Interactive demos on the site are scripted examples and do not use live data.
            </p>
          </section>

          <section>
            <h2>3. No offer or contract</h2>
            <p>
              Nothing on this site is a binding offer. Any project is governed by a separate written agreement, which
              takes precedence over these terms.
            </p>
          </section>

          <section>
            <h2>4. Intellectual property</h2>
            <p>
              The Subtlmind name, logo, text, diagrams and code on this site belong to us unless stated otherwise. You may
              view and share pages for your own reference but may not copy or reuse them commercially without permission.
              Third-party names and logos shown (for example cloud and hardware platforms we deploy on) belong to their
              owners and do not imply endorsement or partnership.
            </p>
          </section>

          <section>
            <h2>5. Acceptable use</h2>
            <p>Do not misuse the site, for example by trying to gain unauthorised access, overloading it, or sending spam through our contact channels.</p>
          </section>

          <section>
            <h2>6. Third-party links</h2>
            <p>Links to other websites are provided for convenience. We are not responsible for their content or privacy practices.</p>
          </section>

          <section>
            <h2>7. Liability</h2>
            <p>
              The site is provided "as is". To the extent the law allows, we are not liable for any loss arising from your
              use of the site or reliance on its content.
            </p>
          </section>

          <section>
            <h2>8. Privacy</h2>
            <p>Our <a routerLink="/privacy">Privacy Policy</a> explains how we handle personal data.</p>
          </section>

          <section>
            <h2>9. Governing law</h2>
            <p>
              These terms are governed by the laws of India, and the courts of {{ company.city }}, {{ company.region }} have
              exclusive jurisdiction.
            </p>
          </section>

          <section>
            <h2>10. Contact</h2>
            <p>Questions about these terms: <a [href]="termsMailto">{{ email }}</a>.</p>
          </section>
        }
      </div>
    </div>
  `,
  styles: [`
    .legal-page {
      padding-top: 140px;
      padding-bottom: 96px;
    }

    .legal-container {
      max-width: 820px;
    }

    .legal-title {
      margin-bottom: 8px;
    }

    .legal-updated {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--color-text-muted);
      margin-bottom: 40px;
    }

    section {
      margin-bottom: 32px;
    }

    h2 {
      font-size: 1.3rem;
      margin-bottom: 12px;
    }

    p, li {
      font-size: 0.98rem;
      color: var(--color-text-secondary);
      line-height: 1.7;
    }

    p + p {
      margin-top: 10px;
    }

    ul {
      padding-left: 22px;
      margin: 10px 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    strong {
      color: var(--color-text-heading);
    }

    a {
      color: var(--color-teal);
    }

    code {
      font-family: var(--font-mono);
      font-size: 0.88em;
      color: var(--color-text-body);
    }
  `]
})
export class LegalComponent {
  readonly doc: 'privacy' | 'terms' = inject(ActivatedRoute).snapshot.data['doc'];
  readonly company = COMPANY;
  readonly email = CONTACT_EMAIL;
  readonly entityName = COMPANY.legalName || COMPANY.name;
  readonly lastUpdated = '28 November 2026';
  readonly privacyMailto = mailtoHref('Privacy request');
  readonly termsMailto = mailtoHref('Website terms');
}
