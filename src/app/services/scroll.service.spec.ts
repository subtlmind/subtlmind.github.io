import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ScrollService } from './scroll.service';
import { vi } from 'vitest';

describe('ScrollService', () => {
  let service: ScrollService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([])
      ]
    });
    service = TestBed.inject(ScrollService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to target route', async () => {
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    service.navigateTo('/solutions', 'vision');
    expect(navSpy).toHaveBeenCalledWith(['/solutions'], { fragment: 'vision', queryParams: undefined });
  });

  it('should scroll to element when element exists in DOM', () => {
    const dummyEl = document.createElement('div');
    dummyEl.id = 'test-section';
    dummyEl.scrollIntoView = vi.fn();
    document.body.appendChild(dummyEl);

    service.scrollToElement('test-section');
    expect(dummyEl.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });

    document.body.removeChild(dummyEl);
  });
});
