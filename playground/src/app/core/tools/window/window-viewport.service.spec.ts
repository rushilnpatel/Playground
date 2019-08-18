import { TestBed } from '@angular/core/testing';

import { WindowViewportService } from './window-viewport.service';

describe('WindowViewportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowViewportService = TestBed.get(WindowViewportService);
    expect(service).toBeTruthy();
  });

  it('should be created getViewportRect', () => {
    const service: WindowViewportService = TestBed.get(WindowViewportService);
    expect(service.getViewportRect()).toBeTruthy();
  });
});
