import { TestBed } from '@angular/core/testing';

import { LoadingIndicatorService } from './loading-indicator.service';
import { OverlayService } from '../overlay/overlay.service';
import { ComponentRef } from '@angular/core';

class MockOverlayService extends OverlayService {
  attachComponentPortal<T>(a): ComponentRef<T> {
    return JSON.parse('{"portalHost": { "transparent":"", "centerContent": ""} }');
  }
}

describe('LoadingIndicatorService', () => {
  let service: LoadingIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: OverlayService, useClass: MockOverlayService }
      ]
    });

    service = TestBed.get(LoadingIndicatorService);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('#show', () => {
  //   expect(service.show()).toBeTruthy();
  // });

  it('Given #hide is called Then Call should go to the function', () => {
    expect(service.hide()).toBeUndefined();
  });
});
