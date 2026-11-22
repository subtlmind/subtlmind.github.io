import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BriefingService } from '../../services/briefing.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-wrapper">
      <!-- HERO SECTION -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <div class="tag-eyebrow">ABOUT SUBTLMIND</div>
            <h1 class="hero-title">
              Pioneering Ambient Intelligence<br />
              <span class="text-gradient">For Intuitive Modern Living</span>
            </h1>
            <p class="hero-subtitle">
              We believe the most powerful technology is the kind that works quietly in the background—anticipating needs, preventing disruptions, and optimizing environments without demanding constant human intervention.
            </p>
          </div>
        </div>
      </section>

      <!-- OUR STORY & STATS SECTION -->
      <section class="section-padding story-section">
        <div class="container">
          <div class="story-grid">
            <!-- Left: Our Story Text -->
            <div class="story-text-col">
              <div class="tag-eyebrow no-dot">— WHO WE ARE</div>
              <h2 class="story-title">Technology that Works Quietly in the Background</h2>
              <p class="story-para">
                Subtlmind is a technology-first company pioneering the convergence of the Internet of Things (IoT), Deep Learning, and Large Language Models (LLMs). We believe the future of smart spaces shouldn't be defined by complex menus, blinking alert sirens, or constant smartphone notifications.
              </p>
              <p class="story-para">
                By bridging the physical and digital worlds, we capture continuous real-time sensory data from connected environments and translate it into actionable, human-centric intelligence. Whether for modern residential ecosystems or complex industrial operations, Subtlmind builds resilient architectures designed for effortless modern living.
              </p>
              <p class="story-para">
                From micro-zone circadian lighting to sub-second chiller vibration diagnostics, every solution we engineer is designed to dissolve into the background—lowering cognitive load and elevating everyday living.
              </p>
            </div>

            <!-- Right: 2x2 Stats Grid -->
            <div class="stats-grid">
              <div class="stat-card glass-card">
                <div class="stat-number text-teal">2026</div>
                <div class="stat-label">Founded</div>
              </div>

              <div class="stat-card glass-card">
                <div class="stat-number text-heading">&lt; 15ms</div>
                <div class="stat-label">Edge Telemetry Inference</div>
              </div>

              <div class="stat-card glass-card">
                <div class="stat-number text-amber">99.4%</div>
                <div class="stat-label">Anomaly Detection Precision</div>
              </div>

              <div class="stat-card glass-card">
                <div class="stat-number text-teal">-32%</div>
                <div class="stat-label">Downtime &amp; Energy Waste</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- VISION & MISSION SECTION -->
      <section class="section-padding bg-alt-subtle">
        <div class="container">
          <div class="section-header text-center">
            <div class="tag-eyebrow no-dot">— GUIDING NORTH STAR</div>
            <h2 class="section-title">Our Vision &amp; Mission</h2>
          </div>

          <div class="grid-2 vm-grid">
            <!-- Vision -->
            <div class="glass-card vm-box">
              <div class="vm-icon-wrap icon-teal">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <h3 class="vm-title">Our Vision</h3>
              <p class="vm-desc">
                To create a world where physical spaces and connected systems think, adapt, and respond naturally—making modern living and operations seamless, sustainable, and intuitive.
              </p>
            </div>

            <!-- Mission -->
            <div class="glass-card vm-box">
              <div class="vm-icon-wrap icon-amber">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="vm-title">Our Mission</h3>
              <p class="vm-desc">
                To engineer innovative, reliable AI and IoT architectures that turn continuous sensory streams into clear, predictive, and conversational intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CORE PRINCIPLES / THE SUBTLMIND ADVANTAGE -->
      <section id="principles" class="section-padding">
        <div class="container">
          <div class="section-header">
            <div class="tag-eyebrow no-dot">— CORE PRINCIPLES</div>
            <h2 class="section-title">The Subtlmind Advantage</h2>
          </div>

          <div class="grid-2 principles-grid">
            <div class="glass-card principle-card">
              <h3 class="principle-title">Tech-First Engineering</h3>
              <p class="principle-text">
                Built from the ground up on modern AI/ML and scalable IoT frameworks rather than legacy retrofits. Every telemetry pipeline, model inference runtime, and control loop is engineered for determinism and speed.
              </p>
            </div>

            <div class="glass-card principle-card">
              <h3 class="principle-title">Subtle by Design</h3>
              <p class="principle-text">
                Technology that reduces cognitive load—delivering calm, proactive outcomes instead of noisy alarm fatigue. We believe the best interface is an environment that adapts before you have to ask.
              </p>
            </div>

            <div class="glass-card principle-card">
              <h3 class="principle-title">Full-Stack Intelligence</h3>
              <p class="principle-text">
                Unified expertise spanning hardware-level sensor integration (MQTT, Modbus, BLE), deep learning time-series pipelines, and natural-language AI agent interfaces that communicate in plain English.
              </p>
            </div>

            <div class="glass-card principle-card">
              <h3 class="principle-title">Built to Scale</h3>
              <p class="principle-text">
                Modular microservices and edge orchestration engineered to grow effortlessly from a single smart room to enterprise-wide multi-property deployments with zero architectural lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- LEADERSHIP / TEAM SECTION -->
      <section id="team" class="section-padding team-section bg-alt-subtle">
        <div class="container">
          <div class="section-header">
            <div class="tag-eyebrow no-dot">— LEADERSHIP</div>
            <h2 class="section-title">Leadership Team</h2>
          </div>

          <div class="grid-2 team-grid">
            <!-- 1. SHIVA KUMAR K -->
            <div class="team-card glass-card">
              <div class="team-card-header">
                <div class="avatar-badge">SK</div>
                <div class="team-title-wrap">
                  <h3 class="member-name">Shiva Kumar K</h3>
                  <div class="member-role">Founder and CEO</div>
                </div>
              </div>
              <p class="member-bio">
                Founder and Chief Executive Officer driving Subtlmind's vision to pioneer ambient AI, IoT sensory architectures, and predictive intelligence. Leads strategic direction, core technology roadmap, and deployment of resilient AI solutions across modern living and industrial environments.
              </p>
            </div>

            <!-- 2. VINOD KUMAR K -->
            <div class="team-card glass-card">
              <div class="team-card-header">
                <div class="avatar-badge">VK</div>
                <div class="team-title-wrap">
                  <h3 class="member-name">Vinod Kumar K</h3>
                  <div class="member-role">Co-Founder and FDE</div>
                </div>
              </div>
              <p class="member-bio">
                Co-Founder and Forward Deployed Engineer (FDE) leading hands-on engineering deployments, scalable cloud platforms, distributed model inference pipelines, and edge-to-cloud telemetry systems. Drives direct architecture implementation for high-throughput sensor fusion, real-time computer vision, domain language models, and edge deployments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- HOW WE BUILD / ENGINEERING PHILOSOPHY -->
      <section class="section-padding philosophy-section">
        <div class="container">
          <div class="section-header">
            <div class="tag-eyebrow no-dot">— ENGINEERING PHILOSOPHY</div>
            <h2 class="section-title">How We Build</h2>
          </div>

          <div class="grid-2 philosophy-grid">
            <div class="glass-card ph-card">
              <div class="philosophy-header">
                <span class="step-num text-teal">01</span>
                <h3 class="philosophy-title">Measure Everything</h3>
              </div>
              <p class="philosophy-text">
                Every layer of the stack emits structured sensory telemetry. We do not deploy a model without strict latency benchmarks, anomaly drift detectors, and automated failover paths.
              </p>
            </div>

            <div class="glass-card ph-card">
              <div class="philosophy-header">
                <span class="step-num text-amber">02</span>
                <h3 class="philosophy-title">Fail Gracefully</h3>
              </div>
              <p class="philosophy-text">
                Real-world IoT networks face WAN outages and packet drops. Our edge gateways employ store-and-forward buffers and local decision autonomy to ensure spaces never stop functioning.
              </p>
            </div>

            <div class="glass-card ph-card">
              <div class="philosophy-header">
                <span class="step-num text-teal">03</span>
                <h3 class="philosophy-title">Compose, Don't Monolith</h3>
              </div>
              <p class="philosophy-text">
                The Subtlmind architecture is a set of modular, observable primitives. Clients adopt the layers they need—whether edge sensor networks, predictive models, or conversational agents—without vendor lock-in.
              </p>
            </div>

            <div class="glass-card ph-card">
              <div class="philosophy-header">
                <span class="step-num text-amber">04</span>
                <h3 class="philosophy-title">Privacy is Fundamental</h3>
              </div>
              <p class="philosophy-text">
                Ambient spaces require absolute occupant trust. We emphasize radar and non-invasive sensors over invasive cameras, sanitize telemetry on-edge, and enforce hardware-backed mTLS encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA BANNER -->
      <section class="section-padding">
        <div class="container">
          <div class="glass-card cta-banner-card">
            <div class="cta-inner-grid">
              <div class="cta-text-col">
                <h2 class="cta-banner-title">Collaborate with Our Architecture Team</h2>
                <p class="cta-banner-desc">
                  Whether exploring an ambient living ecosystem or upgrading an industrial facility with predictive intelligence, our engineering team is ready to assist.
                </p>
              </div>
              <div class="cta-action-col">
                <button (click)="briefingService.open()" class="btn-primary w-full">
                  <span>Schedule a Consultation</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
                <a routerLink="/contact" class="btn-secondary w-full">
                  <span>Contact Solutions Desk</span>
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
      max-width: 680px;
      line-height: 1.6;
    }

    /* Story Section */
    .story-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 60px;
      align-items: center;
    }

    .story-title {
      font-size: clamp(1.8rem, 3vw, 2.3rem);
      margin-bottom: 24px;
    }

    .story-para {
      font-size: 0.96rem;
      color: var(--color-text-secondary);
      line-height: 1.7;
      margin-bottom: 18px;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .stat-card {
      padding: 32px 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }

    .stat-number {
      font-family: var(--font-mono);
      font-size: 2.4rem;
      font-weight: 800;
      margin-bottom: 8px;
      line-height: 1;
    }

    .stat-label {
      font-family: var(--font-mono);
      font-size: 0.76rem;
      font-weight: 600;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .text-teal { color: var(--color-teal); }
    .text-teal-light { color: var(--color-teal); }
    .text-amber { color: var(--color-amber); }
    .text-heading { color: var(--color-text-heading); }

    /* Vision Mission */
    .bg-alt-subtle {
      background: var(--color-bg-alt);
      border-top: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
    }

    .vm-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;
    }

    .vm-box {
      padding: 36px;
    }

    .vm-icon-wrap {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }

    .icon-teal {
      background: rgba(45, 212, 191, 0.12);
      border: 1px solid rgba(45, 212, 191, 0.3);
      color: var(--color-teal);
    }

    .icon-amber {
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.3);
      color: var(--color-amber);
    }

    .vm-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-bottom: 12px;
    }

    .vm-desc {
      font-size: 0.96rem;
      color: var(--color-text-secondary);
      line-height: 1.65;
    }

    /* Principles */
    .principles-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .principle-card {
      padding: 32px;
    }

    .principle-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-bottom: 12px;
    }

    .principle-text {
      font-size: 0.92rem;
      color: var(--color-text-secondary);
      line-height: 1.65;
    }

    /* Team */
    .team-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;
    }

    .team-card {
      padding: 32px;
    }

    .team-card-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
    }

    .avatar-badge {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: rgba(45, 212, 191, 0.12);
      border: 1px solid rgba(45, 212, 191, 0.35);
      color: var(--color-teal);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono);
      font-size: 1.1rem;
      font-weight: 800;
    }

    .member-name {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-bottom: 4px;
    }

    .member-role {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--color-teal);
      letter-spacing: 0.05em;
    }

    .member-bio {
      font-size: 0.92rem;
      color: var(--color-text-secondary);
      line-height: 1.65;
    }

    /* Philosophy */
    .philosophy-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .ph-card {
      padding: 30px;
    }

    .philosophy-header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 12px;
    }

    .step-num {
      font-family: var(--font-mono);
      font-size: 1.3rem;
      font-weight: 800;
    }

    .philosophy-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-text-heading);
    }

    .philosophy-text {
      font-size: 0.9rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
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

    @media (max-width: 900px) {
      .story-grid, .vm-grid, .principles-grid, .team-grid, .philosophy-grid, .cta-inner-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 600px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      .cta-banner-card {
        padding: 28px;
      }
    }
  `]
})
export class AboutComponent {
  readonly briefingService = inject(BriefingService);
}
