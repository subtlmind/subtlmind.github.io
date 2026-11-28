import { inject } from '@angular/core';
import { CanMatchFn, ResolveFn, Router, Routes, UrlSegment } from '@angular/router';
import { PlatformComponent } from './pages/platform/platform';
import { SolutionsComponent } from './pages/solutions/solutions';
import { SolutionDetailComponent } from './pages/solution-detail/solution-detail';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';
import { LegalComponent } from './pages/legal/legal';
import { findSolution } from './content/solutions';
import { PageSeoConfig } from './services/seo.service';
import { SITE_URL } from './content/site';

/** Only match /solutions/:slug for slugs that exist; anything else falls through to '**'. */
const knownSolution: CanMatchFn = (_route, segments: UrlSegment[]) => {
  if (findSolution(segments[1]?.path)) return true;
  return inject(Router).parseUrl('/solutions');
};

const solutionSeo: ResolveFn<PageSeoConfig> = (route) => {
  const s = findSolution(route.paramMap.get('slug'))!;
  const path = `/solutions/${s.slug}`;
  return {
    title: s.seoTitle,
    description: s.seoDescription,
    keywords: s.keywords,
    path,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          '@id': `${SITE_URL}${path}#service`,
          name: s.title,
          description: s.seoDescription,
          serviceType: s.title,
          url: `${SITE_URL}${path}`,
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: { '@type': 'Country', name: 'India' }
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${SITE_URL}/solutions` },
            { '@type': 'ListItem', position: 3, name: s.title, item: `${SITE_URL}${path}` }
          ]
        }
      ]
    }
  };
};

const solutionTitle: ResolveFn<string> = (route) =>
  findSolution(route.paramMap.get('slug'))!.seoTitle;

export const routes: Routes = [
  {
    path: '',
    component: PlatformComponent,
    title: 'Subtlmind | Predictive Maintenance & Vision AI for Factories and Buildings',
    data: {
      description:
        'Subtlmind builds predictive maintenance, computer vision and building automation systems for factories, warehouses and commercial buildings, running on your own edge hardware.',
      keywords:
        'predictive maintenance, computer vision, industrial IoT, edge AI, building automation, video analytics, Hyderabad AI company, Subtlmind',
      path: '/'
    }
  },
  {
    path: 'platform',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'solutions',
    component: SolutionsComponent,
    title: 'Solutions | Predictive Maintenance, Computer Vision & Building Automation | Subtlmind',
    data: {
      description:
        'IoT sensor networks, computer vision, predictive maintenance, an AI operations assistant and smart building automation, deployed on edge hardware at your site.',
      keywords:
        'industrial IoT, computer vision, predictive maintenance, building automation, AI operations assistant, edge AI, Subtlmind',
      path: '/solutions'
    }
  },
  {
    path: 'solutions/:slug',
    component: SolutionDetailComponent,
    canMatch: [knownSolution],
    title: solutionTitle,
    resolve: { seo: solutionSeo }
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Subtlmind | Team, Principles & Approach',
    data: {
      description:
        'Subtlmind is a Hyderabad engineering company building edge AI and IoT systems for industrial and commercial operators. Meet the team and how we work.',
      keywords:
        'about Subtlmind, edge AI company Hyderabad, industrial AI team, privacy-first IoT',
      path: '/about'
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact Subtlmind | Request a Consultation',
    data: {
      description:
        'Talk to Subtlmind engineers about predictive maintenance, computer vision or building automation for your site. We reply within one business day.',
      keywords: 'contact Subtlmind, edge AI consultation, industrial IoT Hyderabad, hello@subtlmind.in',
      path: '/contact'
    }
  },
  {
    path: 'privacy',
    component: LegalComponent,
    title: 'Privacy Policy | Subtlmind',
    data: {
      doc: 'privacy',
      description: 'How Subtlmind collects, uses and protects personal data, in line with India’s DPDP Act, 2023.',
      path: '/privacy'
    }
  },
  {
    path: 'terms',
    component: LegalComponent,
    title: 'Terms of Use | Subtlmind',
    data: {
      doc: 'terms',
      description: 'Terms governing the use of the Subtlmind website.',
      path: '/terms'
    }
  },
  { path: '**', redirectTo: '' }
];
