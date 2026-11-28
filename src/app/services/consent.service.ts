import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ConsentStatus = 'granted' | 'denied' | 'unset';

export const CONSENT_STORAGE_KEY = 'subtlmind_consent';
export const GA_TRACKING_ID = 'G-N7BBG3G3LZ';

/**
 * Analytics consent. Google Analytics is not loaded at all until the visitor accepts
 * (see the inline script in src/index.html, which applies a stored "granted" choice on page load).
 */
@Injectable({ providedIn: 'root' })
export class ConsentService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly status = signal<ConsentStatus>('unset');
  /** Whether the banner is visible. Always false during pre-rendering. */
  readonly bannerOpen = signal(false);

  constructor() {
    if (!this.isBrowser) return;
    const stored = this.read();
    this.status.set(stored);
    this.bannerOpen.set(stored === 'unset');
  }

  get granted(): boolean {
    return this.status() === 'granted';
  }

  accept(): void {
    this.save('granted');
    if (!this.isBrowser) return;
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    this.loadGtag();
  }

  decline(): void {
    const wasGranted = this.status() === 'granted';
    this.save('denied');
    if (!this.isBrowser) return;
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
    if (wasGranted) this.clearGaCookies();
  }

  openSettings(): void {
    this.bannerOpen.set(true);
  }

  private save(status: Exclude<ConsentStatus, 'unset'>): void {
    this.status.set(status);
    this.bannerOpen.set(false);
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, status);
    } catch {
      // Storage blocked: the choice lasts for this page view only.
    }
  }

  private read(): ConsentStatus {
    try {
      const v = localStorage.getItem(CONSENT_STORAGE_KEY);
      return v === 'granted' || v === 'denied' ? v : 'unset';
    } catch {
      return 'unset';
    }
  }

  private loadGtag(): void {
    if (document.getElementById('gtag-js')) return;
    const s = document.createElement('script');
    s.id = 'gtag-js';
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(s);
  }

  private clearGaCookies(): void {
    const host = location.hostname;
    const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
    for (const c of document.cookie.split(';')) {
      const name = c.split('=')[0].trim();
      if (name === '_ga' || name.startsWith('_ga_') || name === '_gid') {
        for (const d of domains) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ''}`;
        }
      }
    }
  }
}
