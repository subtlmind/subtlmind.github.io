import { RenderMode, ServerRoute } from '@angular/ssr';
import { SOLUTIONS } from './content/solutions';

/**
 * Every page is pre-rendered to static HTML at build time, so search engines, link
 * previews (LinkedIn, WhatsApp) and AI crawlers see the full content without running JavaScript.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'solutions/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SOLUTIONS.map((s) => ({ slug: s.slug }));
    }
  },
  { path: '**', renderMode: RenderMode.Prerender }
];
