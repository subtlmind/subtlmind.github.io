import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let titleService: Title;
  let metaService: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])]
    });
    service = TestBed.inject(SeoService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update page metadata and title', () => {
    service.updateMetadata({
      title: 'Test Title | Subtlmind',
      description: 'Test description for SEO verification.',
      keywords: 'test, keywords',
      path: '/solutions'
    });

    expect(titleService.getTitle()).toBe('Test Title | Subtlmind');
    expect(metaService.getTag('name="description"')?.content).toBe('Test description for SEO verification.');
    expect(metaService.getTag('name="keywords"')?.content).toBe('test, keywords');
    expect(metaService.getTag('property="og:url"')?.content).toBe('https://subtlmind.in/solutions');
  });
});
