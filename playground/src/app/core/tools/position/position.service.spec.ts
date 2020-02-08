import { TestBed, ComponentFixture } from '@angular/core/testing';

import { PositionService } from './position.service';
import { Renderer2, Type } from '@angular/core';

describe('PositionService', () => {
  let renderer2: Renderer2;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [Renderer2]
  }));

  it('should be created', () => {
    const service: PositionService = TestBed.get(PositionService);
    expect(service).toBeTruthy();
  });

  xit('#setQuadrantPosition should be created', () => {
    const service: PositionService = TestBed.get(PositionService);
    let fixture: ComponentFixture<PositionService>;
    renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
    expect(service.setQuadrantPosition(renderer2, fixture.elementRef)).toBeTruthy();
  });
});
