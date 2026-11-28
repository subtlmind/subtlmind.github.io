import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AnalyticsService } from './analytics.service';
import { ConsentService } from './consent.service';
import { vi } from 'vitest';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])]
    });
    service = TestBed.inject(AnalyticsService);
    TestBed.inject(ConsentService).status.set('granted');
    window.gtag = vi.fn();
  });

  afterEach(() => {
    delete window.gtag;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.trackingId).toBe('G-N7BBG3G3LZ');
  });

  it('should call gtag config on trackPageView', () => {
    service.trackPageView('/solutions');
    expect(window.gtag).toHaveBeenCalledWith('config', 'G-N7BBG3G3LZ', expect.objectContaining({
      page_path: '/solutions'
    }));
  });

  it('should not track anything without consent', () => {
    TestBed.inject(ConsentService).status.set('denied');
    service.trackPageView('/solutions');
    service.trackEvent('generate_lead');
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('should call gtag event on trackEvent', () => {
    service.trackEvent('generate_lead', { method: 'modal' });
    expect(window.gtag).toHaveBeenCalledWith('event', 'generate_lead', { method: 'modal' });
  });
});
