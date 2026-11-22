import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly router = inject(Router);
  readonly trackingId = 'G-N7BBG3G3LZ';
  private isInitialized = false;

  init(): void {
    if (this.isInitialized || typeof window === 'undefined') {
      return;
    }
    this.isInitialized = true;

    // Track SPA route changes
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe((event) => {
      this.trackPageView(event.urlAfterRedirects);
    });
  }

  trackPageView(url: string): void {
    if (typeof window === 'undefined') return;

    if (typeof window.gtag === 'function') {
      window.gtag('config', this.trackingId, {
        page_path: url,
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }

  trackEvent(eventName: string, params: Record<string, any> = {}): void {
    if (typeof window === 'undefined') return;

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  }
}
