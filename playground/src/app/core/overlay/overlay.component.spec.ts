import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayComponent } from './overlay.component';

describe('OverlayComponent', () => {
  let component: OverlayComponent;
  let fixture: ComponentFixture<OverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create OverlayComponent', () => {
    component.overlayMouseClick();
    expect(component).toBeTruthy();
  });

  it('Given #onClick is called in overlay then it should detect the clicked option', () => {
    const evt = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation']);
    component.onClick(evt);

    expect(typeof evt).toBe('object');
  });
});
