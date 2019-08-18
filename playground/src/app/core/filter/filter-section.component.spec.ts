import { CheckboxModule } from '../checkbox/checkbox.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSectionComponent } from './filter-section.component';
// import { Key } from 'protractor';
import { DatePickerModule } from '../date-picker/date-picker.module';

describe('FilterSectionComponent', () => {
  let component: FilterSectionComponent;
  let fixture: ComponentFixture<FilterSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSectionComponent ],
      imports: [CheckboxModule, DatePickerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    spyOn(component, 'ngOnDestroy').and.callFake(() => { });
    fixture.destroy();
  });

  it('should load filter selection component', () => {
    component.ngAfterViewInit();
    expect(component).toBeTruthy();
  });

  it('Given that filter checkbox is clicked then it should invoke handleCheckboxChange function', () => {
    const evt = JSON.parse('{"checked":true,"key":"customerName","value":"NORDIC TANKERS TRADING AS"}');
    const spy = spyOn(component.checkboxChange, 'emit').and.callThrough();
    component.handleCheckboxChange(evt);

    expect(spy).toHaveBeenCalled();
  });

  it('Given that show all is clicked then it should invoke handleShowAllClick function', () => {
    const evt = jasmine.createSpyObj('e', ['preventDefault']);

    spyOn(component.showAllClick, 'emit').and.callThrough();
    component.handleShowAllClick(evt, 'customerName');

    expect(component.showAllClick.emit).toHaveBeenCalled();
  });

  it('Given that #handleDateChange is called then it should emit dateChange Event', () => {
    const evt = JSON.parse('{"checked":true,"key":"customerName","value":"NORDIC TANKERS TRADING AS"}');
    const spy = spyOn(component.dateChange, 'emit').and.callThrough();
    component.handleDateChange(evt, 'last 7 Days', 'last 7 Days', 'YYY-M-D', true);

    expect(spy).toHaveBeenCalled();
  });
});
