import { TestBed } from '@angular/core/testing';

import { IconCacheService } from './icon-cache.service';

describe('IconCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('IconCacheService should be created', () => {
    const service: IconCacheService = TestBed.get(IconCacheService);
    expect(service).toBeTruthy();
  });
});
