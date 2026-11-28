import {
  Component,
  inject,
  signal,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { BriefingService } from '../../services/briefing.service';
import { TechLogosComponent } from '../../components/tech-logos/tech-logos';
import { CONTACT_EMAIL, TARGETS, TARGETS_FOOTNOTE, mailtoHref } from '../../content/site';

export interface DemoScenario {
  userQuery: string;
  synthesisBadge: string;
  summary: string;
  actions: string[];
  telemetry: string;
}

export interface ArchStep {
  step: string;
  title: string;
  desc: string;
  specs: { label: string; val: string }[];
}

export interface IndustryInfo {
  tag: string;
  title: string;
  desc: string;
  highlights: string[];
  metric: string;
}

@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [CommonModule, RouterLink, TechLogosComponent],
  template: `
    <div class="page-wrapper">
      <!-- HERO SECTION -->
      <section class="hero-section">
        <div class="container hero-container">
          <div class="hero-content">
            <!-- Eyebrow Pill -->
            <div class="hero-pill">
              <span class="live-pulse-dot"></span>
              <span>Industrial IoT &bull; Computer Vision &bull; Edge AI</span>
            </div>

            <h1 class="hero-title">
              Predictive maintenance and vision AI<br />
              <span class="text-gradient">for factories and buildings.</span>
            </h1>

            <p class="hero-subtitle">
              We connect your machines, cameras and building systems, then run AI on your own edge hardware to warn you before equipment fails, spot safety and quality issues on camera, and cut energy waste.
            </p>

            <div class="hero-cta-group">
              <a routerLink="/solutions" class="btn-primary">
                <span>Explore Our Solutions</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <button (click)="briefingService.open()" class="btn-secondary">
                <span>Request a Consultation</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-amber">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>

            <!-- Telemetry Micro-Metrics Strip -->
            <div class="telemetry-strip">
              <div class="metric-card">
                <div class="metric-val text-teal">{{ targets.edgeLatency.value }}</div>
                <div class="metric-lbl">{{ targets.edgeLatency.label }}</div>
              </div>
              <div class="metric-card">
                <div class="metric-val text-heading">{{ targets.precision.value }}</div>
                <div class="metric-lbl">{{ targets.precision.label }}</div>
              </div>
              <div class="metric-card">
                <div class="metric-val text-amber">{{ targets.downtime.value }}</div>
                <div class="metric-lbl">{{ targets.downtime.label }}</div>
              </div>
              <div class="metric-card">
                <div class="metric-val text-teal">On-site</div>
                <div class="metric-lbl">Your data stays on your premises</div>
              </div>
            </div>
            <p class="targets-footnote">{{ targetsFootnote }}</p>
          </div>
        </div>
      </section>

      <!-- ABOUT US, VISION & MISSION OVERVIEW -->
      <section id="about" class="section-padding bg-alt-subtle">
        <div class="container">
          <div class="about-grid">
            <!-- Left Editorial Story -->
            <div class="about-story">
              <div class="tag-eyebrow no-dot">— WHO WE ARE</div>
              <h2 class="section-heading">Technology that works quietly in the background.</h2>
              <p class="story-lead">
                <strong class="text-heading">Subtlmind</strong> is an engineering company that brings together IoT sensors, deep learning and language models. We believe the best technology works quietly in the background: it warns you before something breaks and handles routine adjustments, so your team doesn't have to watch screens all day.
              </p>
              <p class="story-body">
                We collect data from your equipment, cameras and building systems and turn it into clear alerts, answers and automatic actions. Our main focus is factories, warehouses and commercial buildings, and we also work on premium residential projects.
              </p>

              <!-- Philosophy Pill Tags -->
              <div class="philosophy-tags">
                <span class="ph-tag">Sensor &amp; camera data combined</span>
                <span class="ph-tag">Processed on site, privacy first</span>
                <span class="ph-tag">Plain-English answers</span>
              </div>
            </div>

            <!-- Right Vision & Mission Cards -->
            <div class="vision-mission-col">
              <!-- Vision Card -->
              <div class="glass-card vm-card">
                <div class="vm-icon-wrap icon-teal">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
                <h3 class="vm-title">Our Vision</h3>
                <p class="vm-text">
                  To create a world where physical spaces and connected systems think, adapt, and respond naturally—making modern living and operations seamless, sustainable, and intuitive.
                </p>
              </div>

              <!-- Mission Card -->
              <div class="glass-card vm-card">
                <div class="vm-icon-wrap icon-amber">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 class="vm-title">Our Mission</h3>
                <p class="vm-text">
                  To build reliable AI and IoT systems that turn sensor and camera data into early warnings, clear answers and automatic actions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FOUR PILLARS OF AMBIENT INTELLIGENCE -->
      <section id="solutions" class="section-padding">
        <div class="container">
          <div class="section-header">
            <div class="tag-eyebrow no-dot">— CORE CAPABILITIES</div>
            <h2 class="section-title">What We Build</h2>
            <p class="section-subtitle">
              Everything from the sensors on your machines to the AI that explains what they are telling you. <a routerLink="/solutions" class="inline-link">See all solutions &rarr;</a>
            </p>
          </div>

          <div class="grid-2 pillars-grid">
            <!-- Pillar 1 -->
            <div class="glass-card pillar-card">
              <div class="pillar-header">
                <div class="pillar-icon icon-teal">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                  </svg>
                </div>
                <span class="pillar-step-badge">01 / SENSORS &amp; EDGE</span>
              </div>
              <h3 class="pillar-title"><a routerLink="/solutions/iot-sensor-networks">IoT Sensor Networks &amp; Edge Gateways</a></h3>
              <p class="pillar-desc">
                Sensors and rugged edge gateways that monitor your equipment and spaces around the clock, and keep working when the internet drops.
              </p>
              <div class="pillar-tags">
                <span class="tech-tag">Edge Computing</span>
                <span class="tech-tag">Industrial &amp; Commercial IoT</span>
                <span class="tech-tag">MQTT / Streaming</span>
              </div>
            </div>

            <!-- Pillar 2 -->
            <div class="glass-card pillar-card">
              <div class="pillar-header">
                <div class="pillar-icon icon-amber">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
                  </svg>
                </div>
                <span class="pillar-step-badge">02 / VISION &amp; PREDICTIVE AI</span>
              </div>
              <h3 class="pillar-title"><a routerLink="/solutions/computer-vision">Computer Vision</a> &amp; <a routerLink="/solutions/predictive-maintenance">Predictive Maintenance</a></h3>
              <p class="pillar-desc">
                AI on your IP, machine-vision and thermal cameras for safety, quality and hotspot detection, plus models that spot machine wear weeks before a breakdown.
              </p>
              <div class="pillar-tags">
                <span class="tech-tag">Object Detection</span>
                <span class="tech-tag">Thermal Segmentation</span>
                <span class="tech-tag">Edge AI Inference</span>
              </div>
            </div>

            <!-- Pillar 3 -->
            <div class="glass-card pillar-card">
              <div class="pillar-header">
                <div class="pillar-icon icon-teal">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                  </svg>
                </div>
                <span class="pillar-step-badge">03 / OPERATIONS ASSISTANT</span>
              </div>
              <h3 class="pillar-title"><a routerLink="/solutions/conversational-ai">AI Operations Assistant</a></h3>
              <p class="pillar-desc">
                Ask questions about your equipment and building in plain English and get answers grounded in live data and your own manuals.
              </p>
              <div class="pillar-tags">
                <span class="tech-tag">Large Language Models</span>
                <span class="tech-tag">Domain RAG</span>
                <span class="tech-tag">Autonomous AI Agents</span>
              </div>
            </div>

            <!-- Pillar 4 -->
            <div class="glass-card pillar-card">
              <div class="pillar-header">
                <div class="pillar-icon icon-amber">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                </div>
                <span class="pillar-step-badge">04 / AUTOMATION</span>
              </div>
              <h3 class="pillar-title"><a routerLink="/solutions/building-automation">Smart Building &amp; Energy Automation</a></h3>
              <p class="pillar-desc">
                Automatic control of HVAC, lighting and equipment loads based on real occupancy, cutting energy use without affecting comfort.
              </p>
              <div class="pillar-tags">
                <span class="tech-tag">Autonomous Decision Engines</span>
                <span class="tech-tag">Digital Twins</span>
                <span class="tech-tag">Cloud-Native APIs</span>
              </div>
            </div>
          </div>

          <!-- LIVE CONVERSATIONAL SPACE DEMO WIDGET -->
          <div class="demo-widget-container">
            <div class="widget-topbar">
              <div class="window-dots">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot dot-active"></span>
                <span class="widget-title-text">Subtlmind Operations Assistant &mdash; Scripted Demo</span>
              </div>
              <div class="status-indicator-pill">
                <span>Sample data &middot; not live</span>
              </div>
            </div>

            <div class="widget-body">
              <!-- Left: Scenario Buttons & Custom Input -->
              <div class="widget-sidebar">
                <div>
                  <span class="scenario-eyebrow">SCRIPTED DEMO</span>
                  <h4 class="sidebar-title">See what the assistant can do</h4>
                  <p class="sidebar-desc">
                    Pick an example question. The answers are pre-written to show the kind of response a deployed system gives using your sensor data, anomaly models and manuals.
                  </p>

                  <div class="scenario-buttons">
                    <button 
                      type="button"
                      (click)="selectScenario('hvac')" 
                      [class.active-scenario]="activeScenarioKey() === 'hvac'"
                      class="scenario-btn">
                      <div class="scenario-meta">
                        <span class="scenario-tag tag-hvac">Predictive Maintenance</span>
                        <span class="scenario-arrow">&rarr;</span>
                      </div>
                      <p class="scenario-prompt">"Check HVAC vibration &amp; energy status on Floor 3"</p>
                    </button>

                    <button 
                      type="button"
                      (click)="selectScenario('vision')" 
                      [class.active-scenario]="activeScenarioKey() === 'vision'"
                      class="scenario-btn">
                      <div class="scenario-meta">
                        <span class="scenario-tag tag-vision">Video &amp; Vision</span>
                        <span class="scenario-arrow">&rarr;</span>
                      </div>
                      <p class="scenario-prompt">"Inspect loading bay thermal cameras &amp; perimeter IP feeds"</p>
                    </button>

                    <button 
                      type="button"
                      (click)="selectScenario('living')" 
                      [class.active-scenario]="activeScenarioKey() === 'living'"
                      class="scenario-btn">
                      <div class="scenario-meta">
                        <span class="scenario-tag tag-living">Smart Spaces</span>
                        <span class="scenario-arrow">&rarr;</span>
                      </div>
                      <p class="scenario-prompt">"Optimize evening lighting &amp; climate for Zone A"</p>
                    </button>

                    <button 
                      type="button"
                      (click)="selectScenario('industrial')" 
                      [class.active-scenario]="activeScenarioKey() === 'industrial'"
                      class="scenario-btn">
                      <div class="scenario-meta">
                        <span class="scenario-tag tag-industrial">Smart Operations</span>
                        <span class="scenario-arrow">&rarr;</span>
                      </div>
                      <p class="scenario-prompt">"Summarize overnight compressor anomalies &amp; schedule maintenance"</p>
                    </button>
                  </div>
                </div>

              </div>

              <!-- Right: AI Synthesis & Diagnostic Output -->
              <div class="widget-output">
                <!-- User Query Bubble -->
                <div class="query-bubble-wrap">
                  <div class="query-bubble">
                    {{ currentScenario().userQuery }}
                  </div>
                </div>

                <!-- Typing indicator when switching -->
                <div *ngIf="isSynthesizing()" class="synthesis-loading">
                  <span>Preparing example answer</span>
                  <span class="dot-bounce"></span>
                  <span class="dot-bounce"></span>
                  <span class="dot-bounce"></span>
                </div>

                <!-- AI Response Card -->
                <div *ngIf="!isSynthesizing()" class="ai-response-card">
                  <div class="response-header">
                    <span class="response-brand">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                      Subtlmind Intelligence
                    </span>
                    <span class="synthesis-badge">
                      {{ currentScenario().synthesisBadge }}
                    </span>
                  </div>

                  <p class="response-summary">
                    {{ currentScenario().summary }}
                  </p>

                  <div class="actions-section">
                    <div class="actions-heading">What the system did:</div>
                    <ul class="actions-list">
                      <li *ngFor="let act of currentScenario().actions" class="action-item">
                        <span class="check-icon">&#10003;</span>
                        <span>{{ act }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Telemetry Bar -->
                <div class="telemetry-bar">
                  <span class="telemetry-data">{{ currentScenario().telemetry }}</span>
                  <span class="telemetry-status">SAMPLE DATA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4-STEP INTERACTIVE ARCHITECTURE BLUEPRINT -->
      <section id="architecture" class="section-padding bg-alt-subtle">
        <div class="container">
          <div class="section-header text-center">
            <div class="tag-eyebrow no-dot">— SYSTEM BLUEPRINT</div>
            <h2 class="section-title">The Subtlmind Architecture</h2>
            <p class="section-subtitle max-w-2xl mx-auto">
              Four stages, from collecting data on site to acting on it. Select a stage to see the details.
            </p>
          </div>

          <!-- 4-Step Pipeline Buttons -->
          <div class="arch-steps-grid">
            <button 
              *ngFor="let step of archSteps; let idx = index"
              type="button"
              (click)="activeStepIndex.set(idx)"
              [class.active-step]="activeStepIndex() === idx"
              class="arch-step-card">
              <div class="arch-card-top">
                <span class="arch-card-badge">STEP 0{{ idx + 1 }}</span>
                <span class="arch-card-tag">{{ step.step.split('/')[1] }}</span>
              </div>
              <h3 class="arch-card-title">{{ idx + 1 }}. {{ step.step.split('/')[1].trim() }}</h3>
              <p class="arch-card-desc">{{ step.desc | slice:0:70 }}...</p>
            </button>
          </div>

          <!-- Active Architecture Detail Inspector -->
          <div class="glass-card arch-inspector-card">
            <div class="inspector-grid">
              <div class="inspector-info">
                <span class="inspector-step">{{ archSteps[activeStepIndex()].step }}</span>
                <h3 class="inspector-title">{{ archSteps[activeStepIndex()].title }}</h3>
                <p class="inspector-desc">{{ archSteps[activeStepIndex()].desc }}</p>
              </div>

              <div class="inspector-specs-box">
                <div *ngFor="let spec of archSteps[activeStepIndex()].specs" class="spec-row">
                  <span class="spec-label">{{ spec.label }}</span>
                  <span class="spec-val">{{ spec.val }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- INDUSTRIES & USE CASES SHOWCASE -->
      <section id="industries" class="section-padding">
        <div class="container">
          <div class="industries-top">
            <div>
              <div class="tag-eyebrow no-dot">— INDUSTRIES</div>
              <h2 class="section-title">Industries &amp; Use Cases</h2>
            </div>

            <!-- Tabs -->
            <div class="industry-tabs">
              <button 
                type="button" 
                (click)="activeIndustryKey.set('industrial')"
                [class.tab-active]="activeIndustryKey() === 'industrial'"
                class="ind-tab-btn">
                Manufacturing &amp; Warehousing
              </button>
              <button 
                type="button" 
                (click)="activeIndustryKey.set('commercial')"
                [class.tab-active]="activeIndustryKey() === 'commercial'"
                class="ind-tab-btn">
                Commercial Buildings
              </button>
              <button 
                type="button" 
                (click)="activeIndustryKey.set('residential')"
                [class.tab-active]="activeIndustryKey() === 'residential'"
                class="ind-tab-btn">
                Premium Residential
              </button>
            </div>
          </div>

          <!-- Active Industry Card -->
          <div class="glass-card industry-display-card">
            <div class="industry-grid">
              <div class="industry-info-col">
                <span class="industry-tag-badge">{{ currentIndustry().tag }}</span>
                <h3 class="industry-headline">{{ currentIndustry().title }}</h3>
                <p class="industry-summary">{{ currentIndustry().desc }}</p>

                <ul class="industry-bullets">
                  <li *ngFor="let h of currentIndustry().highlights">
                    <span class="check-bullet">&#10003;</span>
                    <span>{{ h }}</span>
                  </li>
                </ul>
              </div>

              <div class="industry-stat-col">
                <div class="stat-impact-box">
                  <div class="stat-eyebrow">DESIGN TARGET</div>
                  <div class="stat-big-metric text-gradient">{{ currentIndustry().metric }}</div>
                  <p class="stat-footnote">
                    {{ targetsFootnote }}
                  </p>
                  <button (click)="briefingService.open()" class="btn-discuss-usecase">
                    Discuss This Use Case &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- WHY FORWARD-THINKING TEAMS CHOOSE SUBTLMIND -->
          <div class="why-us-wrap">
            <div class="section-header">
              <div class="tag-eyebrow no-dot">— WHY SUBTLMIND</div>
              <h2 class="section-title">How We Are Different</h2>
            </div>

            <div class="grid-4 why-grid">
              <div class="why-card glass-card">
                <div class="why-num text-teal">01</div>
                <h4 class="why-title">Tech-First Engineering</h4>
                <p class="why-desc">Built from the ground up on modern AI/ML and cloud-native IoT frameworks rather than fragile legacy retrofits.</p>
              </div>

              <div class="why-card glass-card">
                <div class="why-num text-amber">02</div>
                <h4 class="why-title">Subtle by Design</h4>
                <p class="why-desc">Technology that lowers cognitive load—delivering calm, proactive outcomes instead of noisy alarm fatigue.</p>
              </div>

              <div class="why-card glass-card">
                <div class="why-num text-teal">03</div>
                <h4 class="why-title">Full-Stack Intelligence</h4>
                <p class="why-desc">Unified expertise spanning hardware-level sensor protocols, deep learning pipelines, and conversational AI agents.</p>
              </div>

              <div class="why-card glass-card">
                <div class="why-num text-amber">04</div>
                <h4 class="why-title">Built to Scale</h4>
                <p class="why-desc">Modular microservices and edge orchestration engineered to grow from a single smart space to enterprise portfolios.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PLATFORMS WE DEPLOY ON -->
      <app-tech-logos [mode]="'grid'"></app-tech-logos>

      <!-- FOOTER ARCHITECTURE DISCOVERY CTA BANNER -->
      <section class="section-padding cta-section">
        <div class="container">
          <div class="glass-card cta-banner-card">
            <div class="cta-inner-grid">
              <div class="cta-text-col">
                <div class="tag-eyebrow no-dot">— GET STARTED</div>
                <h2 class="cta-banner-title">
                  Have a site or a problem in mind?
                </h2>
                <p class="cta-banner-desc">
                  Tell us what you want to monitor, inspect or automate. We will tell you honestly what is feasible and what a pilot would involve.
                </p>
                <div class="cta-perks">
                  <div class="perk-item">
                    <span class="perk-icon">&#10003;</span>
                    <span>Free 45-minute review of your site and goals</span>
                  </div>
                  <div class="perk-item">
                    <span class="perk-icon">&#10003;</span>
                    <span>A written pilot plan with scope, timeline and success metrics</span>
                  </div>
                  <div class="perk-item">
                    <span class="perk-icon">&#10003;</span>
                    <span>You talk directly to the engineers who will build it</span>
                  </div>
                </div>
              </div>

              <div class="cta-action-col">
                <div class="cta-button-box">
                  <button (click)="briefingService.open()" class="btn-primary w-full">
                    <span>Request a Consultation</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                  <a [href]="emailHref" class="btn-secondary w-full">
                    <span>Email {{ contactEmail }}</span>
                  </a>
                  <p class="cta-sla-note">We reply within one business day.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .page-wrapper {
      position: relative;
      overflow-x: hidden;
    }

    /* Clean Hero Section */
    .hero-section {
      position: relative;
      min-height: 85vh;
      display: flex;
      align-items: center;
      padding-top: 140px;
      padding-bottom: 70px;
      background: radial-gradient(circle at 50% 0%, rgba(45, 212, 191, 0.05) 0%, transparent 65%);
    }

    .hero-container {
      position: relative;
      z-index: 2;
    }

    .hero-content {
      max-width: 860px;
      margin: 0 auto;
      text-align: center;
    }

    .hero-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 6px 18px;
      border-radius: 999px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--color-teal);
      margin-bottom: 28px;
    }

    .live-pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--color-teal);
      box-shadow: 0 0 10px var(--color-teal);
      display: inline-block;
      animation: pulseTeal 2s infinite;
    }

    @keyframes pulseTeal {
      0% { transform: scale(0.95); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.6; }
      100% { transform: scale(0.95); opacity: 1; }
    }

    .hero-title {
      font-size: clamp(2.6rem, 5.2vw, 4.2rem);
      font-weight: 800;
      letter-spacing: -0.035em;
      line-height: 1.08;
      color: var(--color-text-heading);
      margin-bottom: 24px;
    }

    .hero-subtitle {
      font-size: clamp(1rem, 1.8vw, 1.2rem);
      line-height: 1.65;
      color: var(--color-text-secondary);
      max-width: 720px;
      margin: 0 auto 36px auto;
      font-weight: 400;
    }

    .hero-cta-group {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    /* Telemetry strip */
    .telemetry-strip {
      margin-top: 60px;
      padding-top: 28px;
      border-top: 1px solid var(--color-border);
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }

    .metric-card {
      padding: 18px 16px;
      background: var(--color-card);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    }

    .metric-val {
      font-family: var(--font-mono);
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .metric-lbl {
      font-size: 0.76rem;
      font-weight: 500;
      color: var(--color-text-muted);
    }

    .text-teal { color: var(--color-teal); }
    .text-teal-light { color: var(--color-teal); }
    .text-amber { color: var(--color-amber); }
    .text-heading { color: var(--color-text-heading); }

    /* About Section */
    .bg-alt-subtle {
      background: var(--color-bg-alt);
      border-top: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 56px;
      align-items: flex-start;
    }

    .section-heading {
      font-size: clamp(2rem, 3.2vw, 2.6rem);
      margin-bottom: 20px;
      line-height: 1.2;
    }

    .story-lead {
      font-size: 1.08rem;
      line-height: 1.65;
      color: var(--color-text-body);
      margin-bottom: 16px;
    }

    .story-body {
      font-size: 0.95rem;
      line-height: 1.65;
      color: var(--color-text-secondary);
      margin-bottom: 24px;
    }

    .philosophy-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .ph-tag {
      padding: 6px 14px;
      border-radius: 8px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--color-text-body);
    }

    .vision-mission-col {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .vm-card {
      padding: 28px;
    }

    .vm-icon-wrap {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
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
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-bottom: 8px;
    }

    .vm-text {
      font-size: 0.92rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }

    /* Pillars */
    .section-header {
      margin-bottom: 48px;
    }

    .section-subtitle {
      font-size: 1.05rem;
      color: var(--color-text-secondary);
      margin-top: 8px;
      max-width: 680px;
    }

    .pillars-grid {
      margin-bottom: 64px;
    }

    .pillar-card {
      padding: 32px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .pillar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .pillar-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pillar-step-badge {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--color-text-muted);
      letter-spacing: 0.08em;
    }

    .targets-footnote {
      margin-top: 14px;
      font-size: 0.78rem;
      color: var(--color-text-muted);
    }

    .inline-link {
      color: var(--color-teal);
      font-weight: 600;
      text-decoration: none;
      white-space: nowrap;
    }

    .inline-link:hover,
    .pillar-title a:hover {
      text-decoration: underline;
    }

    .pillar-title a {
      color: inherit;
      text-decoration: none;
    }

    .pillar-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-bottom: 12px;
    }

    .pillar-desc {
      font-size: 0.92rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .pillar-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding-top: 16px;
      border-top: 1px solid var(--color-border);
    }

    .tech-tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      padding: 4px 10px;
      border-radius: 6px;
      background: rgba(45, 212, 191, 0.08);
      border: 1px solid rgba(45, 212, 191, 0.2);
      color: var(--color-teal);
    }

    /* Live Conversational Space Demo Widget */
    .demo-widget-container {
      background: var(--color-card);
      border: 1px solid var(--color-border);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
    }

    .widget-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      background: var(--color-bg-alt);
      border-bottom: 1px solid var(--color-border);
      flex-wrap: wrap;
      gap: 12px;
    }

    .window-dots {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #475569;
    }

    .dot-active {
      background: var(--color-teal);
    }

    .widget-title-text {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--color-text-secondary);
      margin-left: 8px;
    }

    .status-indicator-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 4px 12px;
      border-radius: 999px;
      background: rgba(45, 212, 191, 0.1);
      border: 1px solid rgba(45, 212, 191, 0.25);
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--color-teal);
    }

    .widget-body {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
    }

    .widget-sidebar {
      padding: 32px;
      border-right: 1px solid var(--color-border);
      background: var(--color-card);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 24px;
    }

    .scenario-eyebrow {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--color-amber);
      letter-spacing: 0.1em;
      display: block;
      margin-bottom: 8px;
    }

    .sidebar-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-bottom: 8px;
    }

    .sidebar-desc {
      font-size: 0.88rem;
      color: var(--color-text-secondary);
      line-height: 1.55;
      margin-bottom: 20px;
    }

    .scenario-buttons {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .scenario-btn {
      width: 100%;
      text-align: left;
      padding: 14px 16px;
      border-radius: 12px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      color: var(--color-text-body);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .scenario-btn:hover {
      border-color: var(--color-teal);
      transform: translateX(2px);
    }

    .scenario-btn.active-scenario {
      border-color: var(--color-teal);
      background: var(--color-surface-hover);
    }

    .scenario-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    .scenario-tag {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .tag-hvac { color: var(--color-teal); }
    .tag-vision { color: #38BDF8; }
    .tag-living { color: var(--color-amber); }
    .tag-industrial { color: #A78BFA; }

    .scenario-arrow {
      color: var(--color-cyan);
      font-size: 0.9rem;
    }

    .scenario-prompt {
      font-size: 0.86rem;
      font-weight: 500;
      color: var(--color-text-body);
    }

    /* Output Stream */
    .widget-output {
      padding: 32px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 420px;
      background: var(--color-bg-alt);
    }

    .query-bubble-wrap {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 20px;
    }

    .query-bubble {
      max-width: 440px;
      padding: 12px 18px;
      border-radius: 16px 16px 4px 16px;
      background: var(--color-card);
      border: 1px solid var(--color-teal);
      font-size: 0.92rem;
      color: var(--color-text-heading);
    }

    .synthesis-loading {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--color-teal);
      padding: 24px 0;
    }

    .dot-bounce {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--color-teal);
      animation: typingBounce 1.4s infinite ease-in-out both;
    }

    .dot-bounce:nth-child(2) { animation-delay: -0.32s; }
    .dot-bounce:nth-child(3) { animation-delay: -0.16s; }

    @keyframes typingBounce {
      0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
      40% { transform: scale(1); opacity: 1; }
    }

    .ai-response-card {
      background: var(--color-card);
      border: 1px solid var(--color-border);
      border-radius: 16px;
      padding: 22px;
      margin-bottom: 20px;
    }

    .response-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      gap: 10px;
      flex-wrap: wrap;
    }

    .response-brand {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--color-teal);
    }

    .synthesis-badge {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.3);
      color: var(--color-amber);
    }

    .response-summary {
      font-size: 0.94rem;
      color: var(--color-text-body);
      line-height: 1.6;
      margin-bottom: 16px;
    }

    .actions-section {
      padding-top: 14px;
      border-top: 1px solid var(--color-border);
    }

    .actions-heading {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-text-muted);
      margin-bottom: 10px;
    }

    .actions-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .action-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 0.88rem;
      color: var(--color-text-secondary);
    }

    .check-icon {
      color: var(--color-teal);
      font-weight: 700;
      margin-top: 1px;
    }

    .telemetry-bar {
      padding-top: 16px;
      border-top: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.74rem;
      color: var(--color-text-muted);
      flex-wrap: wrap;
      gap: 8px;
    }

    .telemetry-data {
      color: var(--color-teal);
    }

    .telemetry-status {
      color: #10B981;
      font-weight: 600;
    }

    /* 4-Step Architecture Blueprint */
    .arch-steps-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }

    .arch-step-card {
      text-align: left;
      padding: 22px;
      border-radius: 16px;
      background: var(--color-card);
      border: 1px solid var(--color-border);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .arch-step-card:hover {
      border-color: var(--color-teal);
    }

    .arch-step-card.active-step {
      border-color: var(--color-teal);
      background: var(--color-surface-hover);
      box-shadow: 0 4px 20px rgba(45, 212, 191, 0.15);
    }

    .arch-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .arch-card-badge {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 6px;
      background: rgba(45, 212, 191, 0.12);
      color: var(--color-teal);
    }

    .arch-card-tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--color-text-muted);
    }

    .arch-card-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-bottom: 6px;
    }

    .arch-card-desc {
      font-size: 0.84rem;
      color: var(--color-text-secondary);
      line-height: 1.5;
    }

    .arch-inspector-card {
      padding: 36px;
      border-color: var(--color-border);
    }

    .inspector-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 36px;
      align-items: center;
    }

    .inspector-step {
      font-family: var(--font-mono);
      font-size: 0.76rem;
      font-weight: 700;
      color: var(--color-teal);
      letter-spacing: 0.1em;
      display: block;
      margin-bottom: 8px;
    }

    .inspector-title {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-bottom: 12px;
    }

    .inspector-desc {
      font-size: 0.95rem;
      color: var(--color-text-secondary);
      line-height: 1.65;
    }

    .inspector-specs-box {
      padding: 20px 24px;
      border-radius: 14px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .spec-row {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--color-border);
    }

    .spec-row:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }

    .spec-label {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      text-transform: uppercase;
      color: var(--color-text-muted);
      letter-spacing: 0.08em;
    }

    .spec-val {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--color-teal);
    }

    /* Industries Showcase */
    .industries-top {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 36px;
      gap: 20px;
      flex-wrap: wrap;
    }

    .industry-tabs {
      display: flex;
      background: var(--color-surface);
      padding: 6px;
      border-radius: 14px;
      border: 1px solid var(--color-border);
      gap: 6px;
      flex-wrap: wrap;
    }

    .ind-tab-btn {
      padding: 8px 16px;
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 600;
      background: transparent;
      border: none;
      color: var(--color-text-secondary);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .ind-tab-btn.tab-active {
      background: var(--color-btn-primary-bg);
      color: var(--color-btn-primary-text);
    }

    .industry-display-card {
      padding: 40px;
      margin-bottom: 64px;
    }

    .industry-grid {
      display: grid;
      grid-template-columns: 1.3fr 0.7fr;
      gap: 40px;
      align-items: center;
    }

    .industry-tag-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 999px;
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.3);
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--color-amber);
      margin-bottom: 14px;
    }

    .industry-headline {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-bottom: 12px;
    }

    .industry-summary {
      font-size: 0.95rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .industry-bullets {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .industry-bullets li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.9rem;
      color: var(--color-text-body);
    }

    .check-bullet {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(45, 212, 191, 0.15);
      color: var(--color-teal);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .stat-impact-box {
      padding: 32px 24px;
      border-radius: 20px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      text-align: center;
    }

    .stat-eyebrow {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--color-text-muted);
      letter-spacing: 0.1em;
      margin-bottom: 12px;
    }

    .stat-big-metric {
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--color-teal);
      margin-bottom: 12px;
    }

    .stat-footnote {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .btn-discuss-usecase {
      padding: 10px 20px;
      border-radius: 10px;
      background: var(--color-card);
      border: 1px solid var(--color-teal);
      color: var(--color-teal);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-discuss-usecase:hover {
      background: var(--color-btn-primary-bg);
      color: var(--color-btn-primary-text);
    }

    /* Why Us */
    .why-us-wrap {
      padding-top: 40px;
      border-top: 1px solid var(--color-border);
    }

    .why-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }

    .why-card {
      padding: 24px;
    }

    .why-num {
      font-family: var(--font-mono);
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--color-teal);
      margin-bottom: 12px;
    }

    .why-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-bottom: 8px;
    }

    .why-desc {
      font-size: 0.88rem;
      color: var(--color-text-secondary);
      line-height: 1.55;
    }

    /* CTA Section */
    .cta-banner-card {
      padding: 48px;
      border-color: var(--color-border);
    }

    .cta-inner-grid {
      display: grid;
      grid-template-columns: 1.25fr 0.75fr;
      gap: 48px;
      align-items: center;
    }

    .cta-banner-title {
      font-size: clamp(1.8rem, 3vw, 2.4rem);
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 16px;
    }

    .cta-banner-desc {
      font-size: 1.05rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .cta-perks {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .perk-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.88rem;
      color: var(--color-text-body);
    }

    .perk-icon {
      color: var(--color-teal);
      font-weight: 700;
    }

    .cta-button-box {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 28px;
      border-radius: 16px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
    }

    .cta-sla-note {
      font-family: var(--font-mono);
      font-size: 0.74rem;
      color: var(--color-text-muted);
      text-align: center;
      margin-top: 4px;
    }

    .w-full {
      width: 100%;
      justify-content: center;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .about-grid, .widget-body, .inspector-grid, .industry-grid, .cta-inner-grid {
        grid-template-columns: 1fr;
      }
      .arch-steps-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .why-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .telemetry-strip {
        grid-template-columns: repeat(2, 1fr);
      }
      .widget-sidebar {
        border-right: none;
        border-bottom: 1px solid var(--color-border);
      }
    }

    @media (max-width: 640px) {
      .arch-steps-grid, .why-grid, .telemetry-strip {
        grid-template-columns: 1fr;
      }
      .cta-banner-card {
        padding: 28px;
      }
    }
  `]
})
export class PlatformComponent {
  readonly briefingService = inject(BriefingService);
  private readonly route = inject(ActivatedRoute);
  readonly targets = TARGETS;
  readonly targetsFootnote = TARGETS_FOOTNOTE;
  readonly contactEmail = CONTACT_EMAIL;
  readonly emailHref = mailtoHref('Consultation enquiry');

  constructor() {
    this.route.queryParams.subscribe(params => {
      if (params['step'] !== undefined) {
        const stepIdx = Number(params['step']);
        if (!isNaN(stepIdx) && stepIdx >= 0 && stepIdx < 4) {
          this.activeStepIndex.set(stepIdx);
        }
      }
    });
    this.route.fragment.subscribe(frag => {
      if (frag && frag.startsWith('arch-step-')) {
        const stepIdx = Number(frag.replace('arch-step-', ''));
        if (!isNaN(stepIdx) && stepIdx >= 0 && stepIdx < 4) {
          this.activeStepIndex.set(stepIdx);
        }
      }
    });
  }

  // Active Interactive Demo state
  activeScenarioKey = signal<'hvac' | 'vision' | 'living' | 'industrial'>('hvac');
  isSynthesizing = signal(false);

  demoScenarios: Record<string, DemoScenario> = {
    hvac: {
      userQuery: 'Check HVAC vibration & energy status on Floor 3',
      synthesisBadge: 'Example · Anomaly model + sensor data',
      summary: 'Floor 3 Chiller Unit B is exhibiting a subtle harmonic vibration shift (+14% above baseline at 120Hz), indicating early bearing wear—while energy draw remains within normal bounds at 18.4 kW.',
      actions: [
        'Predicted remaining optimal bearing life: ~240 operating hours.',
        'Automatically balanced load share by 15% to Unit A to reduce thermal stress.',
        'Drafted Work Order #4092 for routine inspection during Friday low-occupancy window.'
      ],
      telemetry: 'SENSOR_ID: F3-HVAC-02 | VIB: 2.8 mm/s | POWER: 18.4 kW | LATENCY: 11ms'
    },
    vision: {
      userQuery: 'Inspect loading bay thermal cameras & perimeter IP feeds',
      synthesisBadge: 'Example · Object detection + thermal',
      summary: 'Edge video inference processed 4 high-speed IP feeds & 2 radiometric thermal streams at 60 FPS. Detected 1 minor thermal surface anomaly (+9.2°C above ambient) on conveyor drive motor #2; perimeter is clear with 100% PPE compliance.',
      actions: [
        'Isolated thermal anomaly bounding box with pixel-accurate instance mask.',
        'Validated operator safety gear via multi-class classification (Hard hat, Vest: Verified).',
        'Dispatched sub-second edge telemetry alert to maintenance terminal without cloud latency.'
      ],
      telemetry: 'FEEDS: 6 CAMERAS | INFERENCE: 16.8ms | CONFIDENCE: 99.4% | FPS: 60'
    },
    living: {
      userQuery: 'Optimize evening lighting & climate for Zone A',
      synthesisBadge: 'Example · Occupancy radar + comfort control',
      summary: 'Detected 3 occupants in Zone A with ambient sunset lux dropping below 180 lx. Transitioning environment into circadian evening mode without manual wall-switch input.',
      actions: [
        'Dimmed overhead architectural cove lighting to 35% warm 2700K amber tone.',
        'Adjusted thermal setpoint smoothly from 22.5°C to 21.0°C for evening comfort.',
        'Shifted non-essential appliance standby loads to off-peak tariff schedule (-19% kWh).'
      ],
      telemetry: 'ZONE: RES-A | LUX: 165 lx | CO2: 430 ppm | COMFORT_SCORE: 98.6%'
    },
    industrial: {
      userQuery: 'Summarize overnight compressor anomalies & schedule maintenance',
      synthesisBadge: 'Example · Forecasting + manual lookup',
      summary: 'Across 12 rotary compressors overnight, 11 operated at 99.8% efficiency. Compressor #04 experienced two brief pressure micro-drops (02:14 & 04:40 UTC) correlated with intake valve seating lag.',
      actions: [
        'Cross-referenced OEM manual via RAG: confirmed intake gasket seal service interval.',
        'Reserved replacement seal kit #SK-88 in inventory and notified shift lead via webhook.',
        'Adjusted relief valve threshold autonomously to prevent unplanned line stoppage.'
      ],
      telemetry: 'FLEET: 12 UNITS | ANOMALIES: 1 MINOR | UPTIME_FORECAST: 99.94%'
    }
  };

  currentScenario = signal<DemoScenario>(this.demoScenarios['hvac']);

  selectScenario(key: 'hvac' | 'vision' | 'living' | 'industrial'): void {
    this.activeScenarioKey.set(key);
    this.isSynthesizing.set(true);
    setTimeout(() => {
      this.currentScenario.set(this.demoScenarios[key]);
      this.isSynthesizing.set(false);
    }, 280);
  }

  // 4-Step Architecture Steps
  activeStepIndex = signal(0);
  archSteps: ArchStep[] = [
    {
      step: '01 / SENSE',
      title: 'Collect Data from Machines and Spaces',
      desc: 'Connected IoT sensors continuously capture environmental, operational, and behavioral signals—temperature, vibration, acoustics, occupancy radar, and power harmonics—directly from physical spaces.',
      specs: [
        { label: 'Protocols', val: 'MQTT, Matter, Zigbee, Modbus, BLE Mesh' },
        { label: 'Sampling Rate', val: 'Up to 10 kHz for acoustic & vibration diagnostics' },
        { label: 'Hardware Footprint', val: 'Ultra-low-power ARM & NPU edge gateways' }
      ]
    },
    {
      step: '02 / PROCESS',
      title: 'Zero-Trust Edge & Cloud Telemetry Pipelines',
      desc: 'Edge gateways clean, compress, and contextualize raw data streams in real time—filtering out noise locally while preserving end-to-end encryption and strict occupant privacy.',
      specs: [
        { label: 'Security', val: 'mTLS, Hardware Root-of-Trust, On-Edge Anonymization' },
        { label: 'Data Hygiene', val: 'Real-time Kalman filtering & schema normalization' },
        { label: 'Resilience', val: 'Local store-and-forward buffer during WAN outages' }
      ]
    },
    {
      step: '03 / REASON',
      title: 'Deep Learning & Conversational LLM Synthesis',
      desc: 'Specialized deep neural networks detect subtle anomalies and forecast equipment wear, while domain-tuned language models (RAG) translate complex telemetry into plain-English insights.',
      specs: [
        { label: 'AI Models', val: 'Temporal Fusion Transformers, Autoencoders, Quantized LLMs' },
        { label: 'Knowledge Grounding', val: 'Vector RAG indexed on equipment manuals & space policies' },
        { label: 'Accuracy', val: 'Multi-modal cross-validation eliminates false positives' }
      ]
    },
    {
      step: '04 / ACT',
      title: 'Closed-Loop Automation & Human-Centric Guidance',
      desc: 'Systems self-adjust lighting, climate, and equipment loads for optimal efficiency—or notify operators with clear, actionable recommendations—completing a frictionless feedback loop.',
      specs: [
        { label: 'Execution', val: 'Sub-second BMS/PLC actuation & smart scene orchestration' },
        { label: 'Interfaces', val: 'Natural-language chat, voice, mobile & webhook APIs' },
        { label: 'Outcome', val: 'Proactive calm instead of reactive dashboard monitoring' }
      ]
    }
  ];

  // Industry Showcase Data
  activeIndustryKey = signal<'residential' | 'commercial' | 'industrial'>('industrial');
  industryData: Record<string, IndustryInfo> = {
    residential: {
      tag: 'Premium Residential',
      title: 'Homes That Sense, Learn, and Adapt Naturally',
      desc: 'Move beyond rigid schedules and fragmented apps. Subtlmind orchestrates circadian lighting, micro-zone climate, air purity, and perimeter security that quietly adapts to household rhythms.',
      highlights: [
        'Privacy-preserving mmWave presence & wellness sensing (no invasive cameras)',
        'Natural-language home assistant: control scenes and energy budgets conversationally',
        'Predictive leak, HVAC, and appliance health alerts before costly damage occurs'
      ],
      metric: `${TARGETS.residentialEnergy.value} ${TARGETS.residentialEnergy.label.toLowerCase()}`
    },
    commercial: {
      tag: 'Commercial Buildings',
      title: 'Autonomous Facility Intelligence & Tenant Comfort',
      desc: 'Transform multi-floor offices and hospitality properties into self-optimizing assets. Subtlmind links real-time occupancy patterns with predictive HVAC and utility management.',
      highlights: [
        'Demand-driven ventilation and thermal zoning based on live room utilization',
        'Conversational facility copilot for building engineers—zero complex BMS training',
        'Automated ESG & carbon intensity reporting synthesized from sub-meter telemetry'
      ],
      metric: `${TARGETS.commercialEnergy.value} ${TARGETS.commercialEnergy.label.toLowerCase()}`
    },
    industrial: {
      tag: 'Manufacturing & Warehousing',
      title: 'Zero-Surprise Equipment Health & Floor Visibility',
      desc: 'Protect critical motors, chillers, cold-chain storage, and production lines with continuous multi-modal anomaly detection and automated maintenance workflows.',
      highlights: [
        'Edge vibration & thermal neural models catch bearing and valve degradation early',
        'RAG-powered troubleshooting guides technicians with exact repair procedures',
        'Unified API integration with existing ERP, CMMS, and SCADA infrastructure'
      ],
      metric: `${TARGETS.downtime.value} ${TARGETS.downtime.label.toLowerCase()}`
    }
  };

  currentIndustry = computed<IndustryInfo>(() => this.industryData[this.activeIndustryKey()]);
}
