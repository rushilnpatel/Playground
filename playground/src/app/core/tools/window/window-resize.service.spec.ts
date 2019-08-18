import { TestBed } from '@angular/core/testing';

import { WindowResizeService } from './window-resize.service';

describe('WindowResizeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('Given that all dpenedencies are there then WindowResizeService should load', () => {
    const service: WindowResizeService = TestBed.get(WindowResizeService);

    expect(service).toBeTruthy();
  });

  it('Given #windowResize is called with auditTime 0 then it should return true', () => {
    const service: WindowResizeService = TestBed.get(WindowResizeService);

    expect(service.windowResize(0)).toBeTruthy();
  });

  it('Given #windowResize is called with auditTime 100 then it should return true', () => {
    const service: WindowResizeService = TestBed.get(WindowResizeService);

    expect(service.windowResize(100)).toBeTruthy();
  });
});
