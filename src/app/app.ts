import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { BriefingModalComponent } from './components/briefing-modal/briefing-modal';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner';
import { BriefingService } from './services/briefing.service';
import { SeoService } from './services/seo.service';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, BriefingModalComponent, CookieBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  readonly briefingService = inject(BriefingService);
  private readonly seoService = inject(SeoService);
  private readonly analyticsService = inject(AnalyticsService);

  ngOnInit(): void {
    this.seoService.init();
    this.analyticsService.init();
  }
}
