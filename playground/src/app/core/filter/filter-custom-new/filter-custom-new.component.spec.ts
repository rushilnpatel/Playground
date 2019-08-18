import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCustomNewComponent } from './filter-custom-new.component';

describe('FilterCustomNewComponent', () => {
  let component: FilterCustomNewComponent;
  let fixture: ComponentFixture<FilterCustomNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCustomNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCustomNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Given #getInstanceOf function is called then function should call and should return instance of component', () => {
    expect(component.getInstanceOf()).toBeTruthy();
  });
});
