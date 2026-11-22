import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs';

export interface PageSeoConfig {
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  ogImage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);

  private readonly siteBaseUrl = 'https://subtlmind.in';
  private readonly defaultTitle = 'Subtlmind | Ambient Intelligence for Intuitive Modern Living';
  private readonly defaultDescription = 'Subtlmind architects and develops edge-to-cloud AI and IoT solutions that transform raw sensory data into predictive maintenance, smart operations, and effortless everyday experiences.';
  private readonly defaultKeywords = 'ambient intelligence, edge AI, computer vision, video inference, IoT architecture, predictive maintenance, conversational RAG, industrial automation, RT-DETR, NVIDIA Jetson, sensory telemetry, smart spaces';
  private readonly defaultOgImage = 'https://subtlmind.in/assets/og-image-dark-1200x630.png';

  init(): void {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }

      const data = route.snapshot.data as PageSeoConfig;
      const title = route.snapshot.title || data?.title || this.defaultTitle;
      const description = data?.description || this.defaultDescription;
      const keywords = data?.keywords || this.defaultKeywords;
      const path = data?.path || this.router.url.split('?')[0].split('#')[0] || '/';
      const ogImage = data?.ogImage || this.defaultOgImage;

      this.updateMetadata({
        title,
        description,
        keywords,
        path,
        ogImage
      });
    });
  }

  updateMetadata(config: PageSeoConfig): void {
    const title = config.title || this.defaultTitle;
    const description = config.description || this.defaultDescription;
    const keywords = config.keywords || this.defaultKeywords;
    const path = config.path || '/';
    const canonicalUrl = `${this.siteBaseUrl}${path === '/' ? '' : path}`;
    const ogImage = config.ogImage || this.defaultOgImage;

    // Document Title
    this.titleService.setTitle(title);

    // Standard Meta Tags
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });
    this.metaService.updateTag({ name: 'author', content: 'Subtlmind Technologies' });

    // OpenGraph Tags
    this.metaService.updateTag({ property: 'og:site_name', content: 'Subtlmind' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });
    this.metaService.updateTag({ property: 'og:image', content: ogImage });

    // Twitter Card Tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:site', content: '@subtlmind' });
    this.metaService.updateTag({ name: 'twitter:creator', content: '@subtlmind' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: ogImage });

    // Canonical Link
    this.updateCanonicalLink(canonicalUrl);
  }

  private updateCanonicalLink(url: string): void {
    if (!this.document) return;

    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
