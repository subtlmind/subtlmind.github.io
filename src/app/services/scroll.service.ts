import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private readonly router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(() => {
      const tree = this.router.parseUrl(this.router.url);
      if (tree.fragment) {
        this.scrollToElement(tree.fragment);
      }
    });
  }

  scrollToElement(id: string, retries = 10): void {
    if (typeof document === 'undefined') return;

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (retries > 0) {
      setTimeout(() => this.scrollToElement(id, retries - 1), 50);
    }
  }

  navigateTo(targetRoute: string, fragment?: string, queryParams?: Record<string, any>): void {
    const currentUrl = this.router.url.split('?')[0].split('#')[0];
    const isSameRoute = currentUrl === targetRoute || (currentUrl === '' && targetRoute === '/') || (currentUrl === '/' && targetRoute === '');

    if (isSameRoute && fragment) {
      // Same-page click: navigate (updates url/history) and trigger smooth scroll immediately
      this.router.navigate([targetRoute], { fragment, queryParams }).then(() => {
        this.scrollToElement(fragment);
      });
    } else {
      // Cross-page navigation
      this.router.navigate([targetRoute], { fragment, queryParams }).then(() => {
        if (fragment) {
          this.scrollToElement(fragment);
        } else {
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      });
    }
  }
}
