import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BriefingService } from '../../services/briefing.service';

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
            <div class="tag-eyebrow">CORE SOLUTIONS &amp; CAPABILITIES</div>
            <h1 class="hero-title">
              Full-Stack Ambient Intelligence<br />
              <span class="text-gradient">From Telemetry &amp; Vision to Autonomy</span>
            </h1>
            <p class="hero-subtitle">
              Subtlmind transforms continuous physical sensory streams, real-time video inference, and predictive machine intelligence into effortless modern living and self-optimizing operations.
            </p>
          </div>
        </div>
      </section>

      <!-- SOLUTIONS DEEP DIVE SECTIONS -->
      <div class="container solutions-list">
        <!-- 1. SENSORY DATA & IOT ARCHITECTURE -->
        <section id="iot" class="solution-block">
          <div class="solution-grid">
            <div class="solution-info">
              <div class="tag-eyebrow no-dot">— PILLAR 01: TELEMETRY &amp; EDGE</div>
              <h2 class="solution-title">Sensory Data &amp; IoT Architecture</h2>
              <p class="solution-desc">
                Subtlmind designs and deploys end-to-end sensor networks, ruggedized edge gateways, and real-time telemetry pipelines. We capture continuous high-frequency environmental and equipment data with sub-15ms latency, giving operators and spaces 24/7 ambient awareness.
              </p>
              <ul class="bullet-list">
                <li>Multi-protocol edge ingestion: MQTT, Modbus, BLE Mesh, Zigbee, and Matter</li>
                <li>Sub-15ms edge processing with on-device Kalman filtering and schema normalization</li>
                <li>Local store-and-forward buffers ensuring zero telemetry loss during WAN outages</li>
                <li>Hardware root-of-trust, mTLS encryption, and on-edge privacy anonymization</li>
              </ul>
              <div class="solution-stats-strip">
                <div class="mini-stat">
                  <span class="stat-number">&lt; 15ms</span>
                  <span class="stat-label">Ingest Latency</span>
                </div>
                <div class="mini-stat">
                  <span class="stat-number">100%</span>
                  <span class="stat-label">Offline Resilience</span>
                </div>
                <div class="mini-stat">
                  <span class="stat-number">10 kHz</span>
                  <span class="stat-label">Sampling Rate</span>
                </div>
              </div>
            </div>

            <!-- Simplified High-Level Architecture Blueprint -->
            <div class="blueprint-card-wrap">
              <div class="blueprint-header-bar">
                <div class="blueprint-title-wrap">
                  <span class="blueprint-dot"></span>
                  <span class="blueprint-title">ARCHITECTURE BLUEPRINT // SENSORY DATA &amp; EDGE</span>
                </div>
                <span class="blueprint-pill">HIGH-LEVEL TOPOLOGY</span>
              </div>
              <div class="blueprint-viewport">
                <img 
                  src="/assets/solutions/iot-sensory-architecture.svg" 
                  alt="Subtlmind IoT Sensory Data &amp; Edge Architecture Blueprint" 
                  class="blueprint-img"
                  loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <!-- 2. REAL-TIME VIDEO INFERENCE & COMPUTER VISION (Flipped) -->
        <section id="vision" class="solution-block">
          <div class="solution-grid reverse">
            <!-- Simplified High-Level Architecture Blueprint -->
            <div class="blueprint-card-wrap">
              <div class="blueprint-header-bar">
                <div class="blueprint-title-wrap">
                  <span class="blueprint-dot"></span>
                  <span class="blueprint-title">ARCHITECTURE BLUEPRINT // REAL-TIME VIDEO INFERENCE</span>
                </div>
                <span class="blueprint-pill">HIGH-LEVEL TOPOLOGY</span>
              </div>
              <div class="blueprint-viewport">
                <img 
                  src="/assets/solutions/video-inference-architecture.svg" 
                  alt="Subtlmind Real-Time Video Inference &amp; Computer Vision Architecture Blueprint" 
                  class="blueprint-img"
                  loading="lazy" />
              </div>
            </div>

            <div class="solution-info">
              <div class="tag-eyebrow no-dot">— PILLAR 02: REAL-TIME VISION &amp; INFERENCE</div>
              <h2 class="solution-title">Real-Time Video Inference &amp; Computer Vision</h2>
              <p class="solution-desc">
                Deploy ultra-low latency deep learning computer vision directly on IP cameras, industrial machine vision systems, and radiometric thermal cameras. Subtlmind edge runtimes execute real-time object detection, instance segmentation, and classification on-device—extracting spatial, behavioral, and thermal intelligence with zero cloud latency.
              </p>
              <ul class="bullet-list">
                <li>Deployments across standard RTSP/ONVIF IP cameras, high-speed GigE/USB3 machine vision, and radiometric thermal cameras</li>
                <li>Real-time object detection tracking personnel, machinery, vehicles, and spatial perimeter hazards via accelerated YOLO and RT-DETR backbones</li>
                <li>Instance and semantic segmentation generating pixel-accurate masks for thermal hotspots, chemical leaks, and material surface flaws</li>
                <li>Multi-class state classification sorting equipment operating modes, safety gear compliance (PPE), and automated quality grading</li>
                <li>Sub-20ms edge hardware acceleration on NVIDIA Jetson Orin and edge NPUs delivering 60 FPS local processing with on-device anonymization</li>
              </ul>
              <div class="solution-stats-strip">
                <div class="mini-stat">
                  <span class="stat-number">&lt; 20ms</span>
                  <span class="stat-label">Inference / Frame</span>
                </div>
                <div class="mini-stat">
                  <span class="stat-number">60 FPS</span>
                  <span class="stat-label">Edge Throughput</span>
                </div>
                <div class="mini-stat">
                  <span class="stat-number">99.2%</span>
                  <span class="stat-label">Detection Precision</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. DEEP LEARNING & PREDICTIVE MAINTENANCE -->
        <section id="predictive" class="solution-block">
          <div class="solution-grid">
            <div class="solution-info">
              <div class="tag-eyebrow no-dot">— PILLAR 03: PREDICTION &amp; FORECASTING</div>
              <h2 class="solution-title">Deep Learning &amp; Predictive Maintenance</h2>
              <p class="solution-desc">
                Identify mechanical wear and failure risks days or weeks before breakdowns occur. Trained on multi-modal sensory inputs—vibration, thermal, acoustic, and electrical power harmonics—our deep neural models eliminate unplanned downtime and drastically reduce emergency repair spend.
              </p>
              <ul class="bullet-list">
                <li>Multi-modal cross-validation eliminating 99.4% of false alarms and alert fatigue</li>
                <li>Time-series forecasting models identifying bearing and valve wear up to 240 operating hours in advance</li>
                <li>Quantized neural runtimes optimized for low-power edge accelerators and industrial PLCs</li>
                <li>Continuous self-calibrating baselines adapting dynamically to seasonal shifts and load variations</li>
              </ul>
              <div class="solution-stats-strip">
                <div class="mini-stat">
                  <span class="stat-number">99.4%</span>
                  <span class="stat-label">Precision Rate</span>
                </div>
                <div class="mini-stat">
                  <span class="stat-number">-40%</span>
                  <span class="stat-label">Unplanned Downtime</span>
                </div>
                <div class="mini-stat">
                  <span class="stat-number">240h</span>
                  <span class="stat-label">Lead Warning</span>
                </div>
              </div>
            </div>

            <!-- Simplified High-Level Architecture Blueprint -->
            <div class="blueprint-card-wrap">
              <div class="blueprint-header-bar">
                <div class="blueprint-title-wrap">
                  <span class="blueprint-dot"></span>
                  <span class="blueprint-title">ARCHITECTURE BLUEPRINT // PREDICTIVE DEEP LEARNING</span>
                </div>
                <span class="blueprint-pill">HIGH-LEVEL TOPOLOGY</span>
              </div>
              <div class="blueprint-viewport">
                <img 
                  src="/assets/solutions/predictive-maintenance-dl.svg" 
                  alt="Subtlmind Deep Learning &amp; Predictive Maintenance Blueprint" 
                  class="blueprint-img"
                  loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <!-- 4. LANGUAGE MODELS & CONVERSATIONAL CONTROL (Flipped) -->
        <section id="conversational" class="solution-block">
          <div class="solution-grid reverse">
            <!-- Simplified High-Level Architecture Blueprint -->
            <div class="blueprint-card-wrap">
              <div class="blueprint-header-bar">
                <div class="blueprint-title-wrap">
                  <span class="blueprint-dot"></span>
                  <span class="blueprint-title">ARCHITECTURE BLUEPRINT // CONVERSATIONAL RAG</span>
                </div>
                <span class="blueprint-pill">HIGH-LEVEL TOPOLOGY</span>
              </div>
              <div class="blueprint-viewport">
                <img 
                  src="/assets/solutions/conversational-rag-pipeline.svg" 
                  alt="Subtlmind Language Models &amp; Conversational Control Blueprint" 
                  class="blueprint-img"
                  loading="lazy" />
              </div>
            </div>

            <div class="solution-info">
              <div class="tag-eyebrow no-dot">— PILLAR 04: NATURAL LANGUAGE REASONING</div>
              <h2 class="solution-title">Language Models &amp; Conversational Control</h2>
              <p class="solution-desc">
                Eliminate complex, fragmented dashboards. Subtlmind deploys specialized domain language models and agentic workflows that let operators and occupants interact with their physical spaces through simple dialogue, natural voice, or plain-English diagnostics.
              </p>
              <ul class="bullet-list">
                <li>Retrieval-Augmented Generation (RAG) grounded in OEM equipment manuals and facility policies</li>
                <li>Instant conversational diagnostics: ask why a chiller spiked in energy and receive immediate plain-English answers</li>
                <li>Automated work order drafting, inventory check, and maintenance scheduling</li>
                <li>Private on-premise or edge LLM deployment ensuring internal telemetry never leaves your firewall</li>
              </ul>
              <div class="solution-stats-strip">
                <div class="mini-stat">
                  <span class="stat-number">0</span>
                  <span class="stat-label">Complex Dashboards</span>
                </div>
                <div class="mini-stat">
                  <span class="stat-number">&lt; 1s</span>
                  <span class="stat-label">Query Synthesis</span>
                </div>
                <div class="mini-stat">
                  <span class="stat-number">100%</span>
                  <span class="stat-label">Data Privacy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 5. SMART OPERATIONS & AUTOMATION -->
        <section id="automation" class="solution-block">
          <div class="solution-grid">
            <div class="solution-info">
              <div class="tag-eyebrow no-dot">— PILLAR 05: CLOSED-LOOP AUTONOMY</div>
              <h2 class="solution-title">Smart Operations &amp; Automation</h2>
              <p class="solution-desc">
                Close the loop between sensing and action. Subtlmind autonomous decision engines coordinate HVAC, circadian lighting, air filtration, and equipment loads in real time, delivering peak occupant comfort while cutting unnecessary kilowatt-hours and carbon waste.
              </p>
              <ul class="bullet-list">
                <li>Seamless BACnet, Modbus, and cloud-native API integration with existing Building Management Systems</li>
                <li>Non-invasive mmWave radar and ambient lux sensing that learns occupant routines without invasive cameras</li>
                <li>Up to 35% lower commercial utility operational spend and 28% residential energy optimization</li>
                <li>Autonomous demand-response shedding during peak tariff cycles without disrupting occupant comfort</li>
              </ul>
              <div class="solution-stats-strip">
                <div class="mini-stat">
                  <span class="stat-number">-35%</span>
                  <span class="stat-label">Utility Spend</span>
                </div>
                <div class="mini-stat">
                  <span class="stat-number">Sub-sec</span>
                  <span class="stat-label">BMS Actuation</span>
                </div>
                <div class="mini-stat">
                  <span class="stat-number">98.6%</span>
                  <span class="stat-label">Comfort Score</span>
                </div>
              </div>
            </div>

            <!-- Simplified High-Level Architecture Blueprint -->
            <div class="blueprint-card-wrap">
              <div class="blueprint-header-bar">
                <div class="blueprint-title-wrap">
                  <span class="blueprint-dot"></span>
                  <span class="blueprint-title">ARCHITECTURE BLUEPRINT // CLOSED-LOOP AUTONOMY</span>
                </div>
                <span class="blueprint-pill">HIGH-LEVEL TOPOLOGY</span>
              </div>
              <div class="blueprint-viewport">
                <img 
                  src="/assets/solutions/smart-operations-loop.svg" 
                  alt="Subtlmind Smart Operations &amp; Closed-Loop Autonomy Blueprint" 
                  class="blueprint-img"
                  loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- CTA BANNER -->
      <section class="section-padding">
        <div class="container">
          <div class="glass-card cta-banner-card">
            <div class="cta-inner-grid">
              <div class="cta-text-col">
                <h2 class="cta-banner-title">Architect the Future of Your Spaces</h2>
                <p class="cta-banner-desc">
                  Our solution architects will scope the ideal edge-to-cloud IoT, video inference, and conversational AI blueprint for your ecosystem.
                </p>
              </div>
              <div class="cta-action-col">
                <button (click)="briefingService.open()" class="btn-primary w-full">
                  <span>Schedule a Consultation</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
                <a routerLink="/platform" class="btn-secondary w-full">
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

    .solution-block {
      scroll-margin-top: 100px;
    }

    .solution-grid {
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      align-items: center;
      gap: 60px;
    }

    .solution-grid.reverse {
      grid-template-columns: 0.95fr 1.05fr;
    }

    .solution-title {
      font-size: clamp(1.8rem, 3vw, 2.3rem);
      margin-bottom: 18px;
    }

    .solution-desc {
      font-size: 0.98rem;
      color: var(--color-text-secondary);
      line-height: 1.65;
    }

    .solution-stats-strip {
      display: flex;
      gap: 20px;
      margin-top: 28px;
      padding-top: 20px;
      border-top: 1px solid var(--color-border);
    }

    .mini-stat {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .stat-number {
      font-family: var(--font-mono);
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--color-teal);
    }

    .stat-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--color-text-muted);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    /* Simplified High-Level Architecture Blueprint Card */
    .blueprint-card-wrap {
      width: 100%;
      min-width: 0;
      border-radius: 16px;
      overflow: hidden;
      background: #080D1A;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
      border: 1px solid var(--color-border);
      transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    }

    .blueprint-card-wrap:hover {
      border-color: rgba(45, 212, 191, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 20px 48px rgba(45, 212, 191, 0.12);
    }

    .blueprint-header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 18px;
      background: rgba(10, 16, 28, 0.95);
      border-bottom: 1px solid var(--color-border);
      gap: 12px;
      flex-wrap: wrap;
    }

    .blueprint-title-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .blueprint-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #2DD4BF;
      box-shadow: 0 0 8px #2DD4BF;
    }

    .blueprint-title {
      font-family: var(--font-mono);
      font-size: 0.74rem;
      font-weight: 700;
      color: #CBD5E1;
      letter-spacing: 0.08em;
    }

    .blueprint-pill {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      color: #2DD4BF;
      background: rgba(45, 212, 191, 0.12);
      border: 1px solid rgba(45, 212, 191, 0.3);
      padding: 3px 10px;
      border-radius: 9999px;
      letter-spacing: 0.06em;
    }

    .blueprint-viewport {
      background: #070B14;
      line-height: 0;
      overflow: hidden;
    }

    .blueprint-img {
      width: 100%;
      height: auto;
      display: block;
      aspect-ratio: 16 / 9.6;
      object-fit: contain;
      background-color: #070B14;
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
      .solution-grid, .solution-grid.reverse {
        grid-template-columns: 1fr;
        gap: 36px;
      }
      .cta-inner-grid {
        grid-template-columns: 1fr;
      }
      .solutions-list {
        gap: 70px;
      }
    }
  `]
})
export class SolutionsComponent {
  readonly briefingService = inject(BriefingService);
}
