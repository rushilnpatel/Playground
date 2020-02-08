import { FilterComponent } from './../filter/filter.component';
import { TestBed } from '@angular/core/testing';

import { OverlayService } from './overlay.service';
import { OverlayComponent } from './overlay.component';
import { PortalService } from '../configuration/portal/portal.service';
import { ComponentRef } from '@angular/core';
import { TableComponent } from '../table/table.component';

class MockPortalService extends PortalService {
  attachComponentPortal<T>(a): ComponentRef<T> {
    return JSON.parse('{"instance": { "transparent":"", "centerContent": ""} }');
  }
}

describe('OverlayService', () => {
  let service: OverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PortalService, useClass: MockPortalService }
      ]
    });
    service = TestBed.get(OverlayService);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Given #createOverlay is called Then call should got to function', () => {
    expect(service.createOverlay()).toBeTruthy();
  });

  it('Given #disposeOverlay is called Then call should go to the function', () => {
    expect(service.disposeOverlay(new OverlayComponent(null, null))).toBeUndefined();
  });
});
