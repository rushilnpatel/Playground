import { TestBed } from '@angular/core/testing';
import { ComponentPortal } from './portal';
import { PortalService } from './portal.service';

describe('PortalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('PortalService should be created', () => {
    const service: PortalService = TestBed.get(PortalService);
    expect(service).toBeTruthy();
  });
});
