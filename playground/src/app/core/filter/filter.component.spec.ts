import { ActivatedRoute } from '@angular/router';
import { DatePipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { FilterSectionComponent } from './filter-section.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { DatePickerModule } from '../date-picker/date-picker.module';
import { Observable } from 'rxjs';
import { FilterDataType } from './filter.types';

class ActivatedRouteMock {
  queryParams = new Observable(observer => {
    const urlParams = {
      param1: 'some',
      param2: 'params',
      filters: 'stateOrCountryFilter: Non- US Locations, supplierNames: AVFUEL CORP, ipAgentNames: AIR TOTAL-A, contractStartDate: 20181202'
    };
    observer.next(urlParams);
    observer.complete();
  });
}
describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ FilterComponent, FilterSectionComponent ],
      imports: [CheckboxModule, DatePickerModule],
      providers: [
        DatePipe,
        CurrencyPipe,
        DecimalPipe,
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;

    component.filterText = '';

    component.rows = JSON.parse('[{"transactionNumber":3067603,"vessel":"EBONY SHINE/1009687","portName":["MIAMI"],"grade":["380CST"],"eta":["2019-01-29T05:00:00.000+0000"],"salesExecutiveName":"Barros da Silva, Alexandra","status":"STEM","customerName":"ROYAL CARIBBEAN CRUISES LTD"}]');

    // tslint:disable-next-line: max-line-length
    component.filters = [{ checked: true, key: 'createdDate', label: 'CREATED DATE', order: 7 }, { checked: true, key: 'customerName', items: [{ type: FilterDataType.DATE, value: 'sd' }], label: 'Account', order: 4 }, { checked: true, countItems: true, label: 'test', order: 1 }, { checked: true, countItems: true, label: 'test', order: 3 }];
    component.config = { filters: component.filters, noDataText: 'No Data', noResultsText: 'no Result', andFiltering: true };
    fixture.detectChanges();
  });

  afterEach(() => {
    spyOn(component, 'ngOnDestroy').and.callFake(() => { });
    fixture.destroy();
  });

  it('should load filter component', () => {
    expect(component).toBeTruthy();
  });

  it('Given close function is called then open property should be falsy', () => {
    component.close();
    expect(component.classOpen).toBeFalsy();
  });

  it('Given toggle function is called and open property is false then open property should be truthy', () => {
    component.toggle();
    expect(component.classOpen).toBeTruthy();
  });

  it('Given that number is clicked then it should invoke onClick function', () => {
    const evt = jasmine.createSpyObj('e', ['preventDefault']);
    const spy = spyOn(component, 'closeClick').and.callThrough();
    component.closeClick(evt);

    expect(spy).toHaveBeenCalled();
    expect(component.classOpen).toBeFalsy();
  });

  it('Given rows property is called then call should go to function', () => {
    const spy = spyOnProperty(component, 'rows', 'get').and.callThrough();

    expect(typeof component.rows).toEqual('object');
    expect(spy).toHaveBeenCalled();
  });

  it('Given filterText property is called then call should go to function', () => {
    const spy = spyOnProperty(component, 'filterText', 'get').and.callThrough();

    expect(typeof component.filterText).toEqual('string');
    expect(spy).toHaveBeenCalled();
  });

/*  it('Given user clicked on showall then call should go to handleSectionShowAllClick function and should open all filters', () => {
    const spy = spyOn<any>(component, '_processData');

    const evt = JSON.parse('{"checked":true,"key":"customerName","value":"NORDIC TANKERS TRADING AS"}');
    component.handleSectionShowAllClick(evt);

    expect(spy).toHaveBeenCalled();
  });*/

  // it('Given user removing filters from chiclets and passed filter has some value then call should go to removeFilter function and should remove filters', () => {
  //   const spy = spyOn<any>(component, '_filterRows');

  //   const filter = JSON.parse('{"checked":true,"key":"customerName","value":"NORDIC TANKERS TRADING AS","label":"Account"}');
  //   component.addCustomFilter(filter);

  //   component.removeFilter(filter);

  //   expect(spy).toHaveBeenCalled();
  // });

  // it('Given user removing filters from chiclets and passed filter has no value then call should go to removeFilter function and should remove filters', () => {
  //   const spy = spyOn<any>(component, '_filterRows');

  //   const filter = JSON.parse('{"checked":true,"key":"customerName", "label":"Account"}');
  //   component.addCustomFilter(filter);

  //   component.removeFilter(filter);

  //   expect(spy).toHaveBeenCalled();
  // });


  // it('Given user removing filters from chiclets and Selected filter array is not having that filter in array then call should go to removeFilter function and should remove filters', () => {
  //   const spy = spyOn<any>(component, '_filterRows');

  //   const filter = JSON.parse('{"checked":true,"key":"customerNameAc", "label":"Account"}');
  //   component.removeFilter(filter);

  //   expect(spy).toHaveBeenCalled();
  // });

  it('Given user clicked on showall then call should go to handleSectionShowAllClick function and should open all filters', () => {
    const spy = spyOn<any>(component, '_filterRows');
    component.removeAllFilters();

    expect(spy).toHaveBeenCalled();
  });

  it('Given processedRows property is called then call should go to function', () => {
    const spy = spyOnProperty(component, 'processedRows$', 'get').and.callThrough();

    expect(typeof component.processedRows$).toEqual('object');
    expect(spy).toHaveBeenCalled();
  });

  it('Given update function is called then it should call _processData function', () => {
    const spy = spyOn<any>(component, '_processData');

    component.update();
    expect(spy).toHaveBeenCalled();
  });

  it('Given #handleCheckboxChange is called with checkbox not checked then it should call removeFilter function', () => {
    const spy = spyOn<any>(component, '_filterRows');
    const spy2 = spyOn<any>(component, '_removeFilter').and.callThrough();

    const evt = JSON.parse('{"checked":false,"value":true,"key":"customerName", "label":"Account"}');
    component.addCustomFilter(evt);
    component.handleCheckboxChange(evt);

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('Given #handleCheckboxChange is called with checkbox checked then it should call removeFilter function', () => {
    const spy = spyOn<any>(component, '_filterRows');
    const spy2 = spyOn<any>(component, '_addFilter').and.callThrough();

    const evt = JSON.parse('{"checked":true,"value":true,"key":"customerName", "label":"Account", "value": "sd"}');
    component.addCustomFilter(evt);
    component.handleCheckboxChange(evt);

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('Given #handleDateChange is called with checkbox as checked then it should call addfilter function', () => {
    const spy = spyOn<any>(component, '_filterRows');
    const spy2 = spyOn<any>(component, '_addFilter');
    const evt = JSON.parse('{"checked":true,"value":true,"key":"customerName", "label":"Account", "calendarSelection": true}');
    component.addCustomFilter(evt);

    component.handleDateChange(evt);

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('Given #addCustomFilter is called then if item is already there in selected filter it should do nothing', () => {
    const filter = JSON.parse('{"key":"createdDate","label":"CREATED DATE","value":"Custom Date Range"}');
    component.addCustomFilter(filter);

    expect(component.addCustomFilter(filter)).toBeUndefined();
  });
});
