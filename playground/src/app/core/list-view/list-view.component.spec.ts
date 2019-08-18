import { TableCellComponent } from '../table/table-cell/table-cell.component';
import { HttpClientModule } from '@angular/common/http';
import { IconModule } from './../icon/icon.module';
import { ActivatedRoute } from '@angular/router';
import { FilterModule } from './../filter/filter.module';
import { PaginatorModule } from './../paginator/paginator.module';
import { ChicletModule } from './../chiclet/chiclet.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewComponent } from './list-view.component';
import { TableModule } from '../table/table.module';
import { SortType } from '../models/data.types';
import { Observable } from 'rxjs';
import { SearchComponent } from '../search/search.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { ErrorInlineModule } from '../error-inline/error-inline.module';

class ActivatedRouteMock {
  queryParams = new Observable(observer => {
    const urlParams = { param1: 'some', param2: 'params' };
    observer.next(urlParams);
    observer.complete();
  });
}

describe('ListViewComponent', () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListViewComponent],
      imports: [ ChicletModule, TableModule, PaginatorModule, ErrorInlineModule, FilterModule, IconModule, HttpClientModule ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;

    // tslint:disable-next-line: max-line-length
    const rows = JSON.parse('[{"label":"Transaction #","key":"transactionNumber","order":0,"type":"number","isLink":true},{"label":"Account","key":"customerName","order":1,"type":"string"},{"label":"Vessel #","key":"vessel","order":1,"type":"string"},{"label":"Port","key":"portName","order":2,"type":"string"},{"label":"Grade","key":"grade","order":3,"type":"string"},{"label":"Sales Executive","key":"salesExecutiveName","order":4,"type":"string"},{"label":"ETA","key":"eta","order":5,"type":"string"},{"label":"Status","key":"status","order":6,"type":"string"}]');

    component.configTable = { columns: rows, sort: { column: 2, order: SortType.ASCENDING }, scrollable: false };

    fixture.detectChanges();
  });

  afterEach(() => {
    spyOn(component, 'ngOnDestroy').and.callFake(() => { });
    fixture.destroy();
  });

  it('should create ListViewComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Given #filterButtonClick is called then it should call toggle function of filter component', () => {
    const spy = spyOn(component.filterSidebar, 'toggle');
    component.filterButtonClick();

    expect(spy).toHaveBeenCalled();
  });

  it('Given #searchChange is called then it should set passed string to filterText', () => {
    component.searchChange('test');
    expect(component.filterSidebar.filterText).toEqual('test');
  });

  it('Given #removeFilter is called then it should remove that item from filter array and chiclet', () => {
    const fil = JSON.parse('{"checked":true,"key":"customerName","value":"NORDIC TANKERS TRADING AS","label":"Account"}');

    const spy = spyOn(component.filterSidebar, 'removeFilter');
    const spy2 = spyOn(component.filterRemoved, 'emit');

    component.handleRemoveChiclet(fil);

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('Given #tableSortChange is called and paginator is not set then it should call reset pagination', () => {
    component.paginator = null;
    expect(component.tableSortChange()).toBeUndefined();
  });

  it('Given #tableSortChange is called and paginator is set then it should call reset pagination', () => {
    component.paginator = new PaginatorComponent();
    const spy = spyOn(component.paginator, 'reset');
    component.tableSortChange();

    expect(spy).toHaveBeenCalled();
  });

  it('Given #handleTableCellClick function is called then it should emit click event to parent component', () => {
    const spy = spyOn(component.tableCellClick, 'emit');
    // tslint:disable-next-line: max-line-length
    const rowData = { 'cell': new TableCellComponent(null, null, null), 'rowData': [{ 'label': 'ICAO/IATA', 'key': 'locationCodes', 'order': 0, 'isLink': true, 'type': 'string', 'value': 'KABQ/ABQ' }, ] };
    component.handleTableCellClick(rowData);

    expect(spy).toHaveBeenCalled();
  });

  it('Given #errorButtonClick is called then it should clear all filters and search criteria', () => {
    component.searchComponent = new SearchComponent();
    const spy = spyOn(component.filterSidebar, 'removeAllFilters');
    const spy2 = spyOn(component.searchComponent, 'reset');

    component.handleClearSearchButtonClick();

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('Given #update is called then it should call filter components update functiop', () => {
    const spy = spyOn(component.filterSidebar, 'update');
    component.update();
    expect(spy).toHaveBeenCalled();
  });

  it('Given #handleCustomCellAction is called then it should emit event for customCellAction', () => {
    const spy = spyOn(component.customCellAction, 'emit');
    component.handleCustomCellAction('');
    expect(spy).toHaveBeenCalled();
  });

  it('Given #removeFilter is called then it should call filter components removeFilter function', () => {
    const spy = spyOn(component.filterSidebar, 'removeFilter');
    const filterData = JSON.parse('{"key":"7","label":"Uplift Date","value":"Last 7 Days"}');
    component.removeFilter(filterData);
    expect(spy).toHaveBeenCalled();
  });

  it('Given #ngOnInit is called and filtersidebar component is not there then it should return undefined', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });

  it('Given #removeFilter is called and filtersidebar component is not there then it should return undefined', () => {
    component.filterSidebar = null;
    const filterData = JSON.parse('{"key":"7","label":"Uplift Date","value":"Last 7 Days"}');
    expect(component.removeFilter(filterData)).toBeUndefined();
  });
});
