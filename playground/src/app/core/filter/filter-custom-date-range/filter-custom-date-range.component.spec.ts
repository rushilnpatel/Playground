import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCustomDateRangeComponent } from './filter-custom-date-range.component';
import { RadioButtonModule } from '../../radio-button/radio-button.module';
import { DatePickerModule } from '../../date-picker/date-picker.module';
import { DatePickerComponent } from '../../date-picker/date-picker.component';

describe('FilterCustomDateRangeComponent', () => {
  let component: FilterCustomDateRangeComponent;
  let fixture: ComponentFixture<FilterCustomDateRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCustomDateRangeComponent ],
      imports: [RadioButtonModule, DatePickerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCustomDateRangeComponent);
    component = fixture.componentInstance;
    component.filterDataGroup = { 'key': 'customFilterDateRange60', 'label': 'Consolidated Date', 'customComponentId': 'customFilterDateRange', 'order': 1};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Given #removeFilter is called Then call should go to removeFilter function and should remove filters', () => {
    component.radioButtons = JSON.parse('[{"key":"customFilterDateRange60","value":"60","label":"Consolidated Date","isCustom":true}, {"checked":true,"key":"","value":"","label":"Custom Date Range"}]');

    const filter = JSON.parse('{"key":"customFilterDateRange60","value":"60","label":"Consolidated Date","isCustom":true}');

    component.removeFilter(filter);
  });

  it('Given #removeAllFilters is called Then call should go to removeAllFilters function and should remove All the filters', () => {
    component.radioButtons = JSON.parse('[{"key":"customFilterDateRange60","value":"60","label":"Consolidated Date","isCustom":true}, {"checked":true,"key":"","value":"","label":"Custom Date Range"}]');

    component.removeAllFilters();
  });


  it('Given #handleRadioButtonChange is called with event passed as filter selected then call should go to function', () => {
    const evt = JSON.parse('{"checked":true,"key":"","label":"Include Marine 2020","value":"MARINE 2020"}');
    // tslint:disable-next-line: max-line-length
    component.radioButtons = JSON.parse('[{"checked":true,"key":"","label":"Include Marine 2020","value":"MARINE 2020"}, {"checked":true,"key":"","value":"","label":"Custom Date Range"},{"checked":true,"key":"eta Custom Date Range","value":"20 APR 2019 - 22 APR 2019","label":""}]');
    const spy1 = spyOn<any>(component, '_removeUncheckedFilters');

    component.handleRadioButtonChange(evt);
    expect(spy1).toHaveBeenCalled();
  });

  it('Given #handleRadioButtonChange is called with event passed for filter customRange selected then call should go to function', () => {
    const evt = JSON.parse('{"checked":true,"key":"","label":"Include Marine 2020","value":"customRange"}');
    // tslint:disable-next-line: max-line-length
    component.radioButtons = JSON.parse('[{"checked":true,"key":"","label":"Include Marine 2020","value":"customRange"}, {"checked":true,"key":"","value":"","label":"Custom Date Range"},{"checked":true,"key":"eta Custom Date Range","value":"20 APR 2019 - 22 APR 2019","label":""}]');
    const spy1 = spyOn<any>(component, '_removeUncheckedFilters');

    component.handleRadioButtonChange(evt);
    expect(spy1).toHaveBeenCalled();
  });

  it('Given #handleDateSelected is called with event passed as null then call should go to function and should not update filter object', () => {
    component.dateRangeDatePicker = new DatePickerComponent(null, null, null, null, null, null, null, null);
    // const spy = spyOn(component, 'customFilterRemoved');
    component.handleDateSelected();

    // expect(spy).toHaveBeenCalled();
  });

  it('Given #handleDateSelected is called Date Range Then call should go to function', () => {
    component.dateRangeDatePicker = new DatePickerComponent(null, null, null, null, null, null, null, null);
    // component.dateRangeDatePicker = {"selectedDate" : {date}}
    // const spy = spyOn(component, 'customFilterRemoved');
    component.handleDateSelected();

    // expect(spy).toHaveBeenCalled();
  });


  // it('Given #handleDateSelected is called with event passed as null then call should go to function and should not update filter object', () => {
  //   component.dateRangeDatePicker = null;
  //   component.handleDateSelected();
  // });

  // it('Given #filterData is called with data Then call should go to function and should return data object', () => {
  // tslint:disable-next-line:max-line-length
  //   let rows = JSON.parse('[{"transactionNumber":"3096860","vessel":"NORWEGIAN JADE / 9304057","portName":["NAPLES"],"grade":["380CST"],"eta":["Jul 9, 2019"],"salesExecutiveName":"Straker, Mr. Stuart","status":"ACTIVE","customerName":"NCL BAHAMAS LTD","createdDate":"2019-06-18T16:49:02.000+0000","customerNumber":"63810","marine2020Flag":"","secondaryStatus":null,"reviewWithStatus":{"status":"ACTIVE","secondaryStatus":"SENT TO CUSTOMER"},"transactionWithMarineFlag":{"transactionNumber":"3096860","marine2020Flag":"MARINE 2020"}}]');
  //   component.radioButtons = JSON.parse('[{"key":"customFilterDateRange60","value":"60","label":"Consolidated Date","isCustom":true}, {"checked":true,"key":"","value":"","label":"Custom Date Range"}]');

  //   expect(typeof component.filterData(rows, [])).toBe('object');
  // });
});
