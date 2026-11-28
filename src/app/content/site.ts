/**
 * Single source of truth for site-wide facts: contact details, company identity and the
 * performance figures we quote. Change a value here and every page picks it up.
 */

export const SITE_URL = 'https://subtlmind.in';

export const CONTACT_EMAIL = 'hello@subtlmind.in';

export const COMPANY = {
  /** Trading name shown across the site. */
  name: 'Subtlmind',
  /**
   * Fill these in once the company is incorporated. They appear in the footer, the
   * privacy policy, the terms page and the Organization structured data.
   */
  legalName: '' as string,
  cin: '' as string,
  registeredAddress: '' as string,
  city: 'Hyderabad',
  region: 'Telangana',
  country: 'India',
  countryCode: 'IN',
  founded: '2026'
};

export const SOCIAL_LINKS = [
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/company/subtlmind' },
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/subtlmind' },
  { id: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@subtlmind' },
  { id: 'github', label: 'GitHub', url: 'https://github.com/subtlmind' }
] as const;

export function mailtoHref(subject: string, body = ''): string {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${CONTACT_EMAIL}?${params.join('&')}`;
}

/**
 * Design targets. These are engineering goals, not measured customer results, and every page
 * that shows them must say so (see TARGETS_FOOTNOTE). Replace a target with a measured result
 * only when there is a pilot or case study to point to.
 */
export const TARGETS = {
  edgeLatency: { value: '< 15 ms', label: 'Edge inference latency' },
  visionLatency: { value: '< 20 ms', label: 'Vision inference per frame' },
  visionFps: { value: '60 FPS', label: 'Per camera on Jetson Orin-class hardware' },
  precision: { value: '≥ 99%', label: 'Anomaly detection precision' },
  downtime: { value: 'Up to 30%', label: 'Less unplanned downtime' },
  leadTime: { value: 'Up to 240 h', label: 'Early warning before failure' },
  commercialEnergy: { value: 'Up to 30%', label: 'Lower HVAC & lighting energy' },
  residentialEnergy: { value: 'Up to 25%', label: 'Lower household energy use' },
  queryLatency: { value: '< 1 s', label: 'Answer time for plain-English questions' }
} as const;

export const TARGETS_FOOTNOTE =
  'Figures shown are design targets, not measured results. We agree success metrics with each client and measure them during the pilot.';

export interface Enquiry {
  name: string;
  email: string;
  segment: string;
  message: string;
}

export const ENQUIRY_SEGMENTS = [
  'Manufacturing & warehousing',
  'Commercial buildings',
  'Premium residential',
  'Product partnership / other'
] as const;

/** Builds the subject and body for an enquiry sent through the visitor's own email app. */
export function enquiryEmail(e: Enquiry, source: string): { subject: string; body: string; href: string } {
  const subject = `${source}: ${e.name} (${e.segment})`;
  const body = `${e.message.trim()}\n\n---\nName: ${e.name}\nEmail: ${e.email}\nIndustry: ${e.segment}\nSent from subtlmind.in`;
  return { subject, body, href: mailtoHref(subject, body) };
}
