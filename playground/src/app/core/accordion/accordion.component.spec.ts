import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from './accordion.component';
import { IconModule } from '../icon/icon.module';
import { HttpClientModule } from '@angular/common/http';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccordionComponent
      ],
      imports: [
        IconModule,
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AccordionComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Given #expanded function is called then isExpanded variable should become true if it was false', () => {
    component.isExpanded = false;

    component.expandedClick();
    expect(component.isExpanded).toBeTruthy();
  });

  it('Given #expanded function is called then isExpanded variable should become false if it was true', () => {
    component.isExpanded = true;

    component.expandedClick();
    expect(component.isExpanded).toBeFalsy();
  });
});
