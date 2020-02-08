import { WindowResizeService } from '../tools/window/window-resize.service';
import { HttpClientModule } from '@angular/common/http';
import { TableCellComponent } from './table-cell/table-cell.component';
import { TableRowComponent } from './table-row/table-row.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { IconModule } from '../icon/icon.module';
import { Observable } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { SortType } from '../models/data.types';

class MockWindowResizeService extends WindowResizeService {
  constructor() {
    super(); // null is the http in service's constructor
  }
  windowResize(auditTimeInMs: number = 100): Observable<number> {
    if (auditTimeInMs === 0) {
      return this._resize.asObservable();
    }
    return this._resize.asObservable().pipe(auditTime(auditTimeInMs));
  }
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let mockWindowResizeService: MockWindowResizeService;

  beforeEach(async(() => {
    mockWindowResizeService = new MockWindowResizeService();

    TestBed.configureTestingModule({
      declarations: [TableComponent, TableRowComponent, TableCellComponent ],
      imports: [IconModule, HttpClientModule],
      providers: [
        { provide: WindowResizeService, useClass: MockWindowResizeService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    // tslint:disable-next-line: max-line-length
    component.rows = JSON.parse('[{"label":"Transaction #","key":"transactionNumber","order":0,"type":"number","isLink":true},{"label":"Account","key":"customerName","order":1,"type":"string"},{"label":"Vessel #","key":"vessel","order":1,"type":"string"},{"label":"Port","key":"portName","order":2,"type":"string"},{"label":"Grade","key":"grade","order":3,"type":"string"},{"label":"Sales Executive","key":"salesExecutiveName","order":4,"type":"string"},{"label":"ETA","key":"eta","order":5,"type":"string"},{"label":"Status","key":"status","order":6,"type":"string"}]');
    component.columns = component.rows;
    component.config = {
      columns: component.rows, sort: { column: 2, order: SortType.ASCENDING },  scrollable: false };

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should load table component when all dependencies are loaded', () => {
    expect(component).toBeTruthy();
  });

  it('given orderedColumns property is called then call should go to function and return object', () => {
    const spy = spyOnProperty(component, 'orderedColumns', 'get').and.callThrough();

    expect(typeof component.orderedColumns).toEqual('object');
    expect(spy).toHaveBeenCalled();
  });

  it('given columns property is called then call should go to function', () => {
    const spy = spyOnProperty(component, 'columns', 'get').and.callThrough();

    expect(typeof component.columns).toEqual('object');
    expect(spy).toHaveBeenCalled();
  });

  it('given processedRows property is called then call should go to function and return object', () => {
    const spy = spyOnProperty(component, 'processedRows', 'get').and.callThrough();

    expect(typeof component.processedRows).toEqual('object');
    expect(spy).toHaveBeenCalled();
  });

  it('given processedRows property is called with pagination then call should go to function and return object', () => {
    component.pagination = JSON.parse('{ "from": 0, "to": 0, "length": 1 }');
    const spy = spyOnProperty(component, 'processedRows', 'get').and.callThrough();

    expect(typeof component.processedRows).toEqual('object');
    expect(spy).toHaveBeenCalled();
  });

  it('Given table header is clickable for sorting then a click handler should exist', () => {
    spyOn(component.sortChange, 'emit');
    const columnData = JSON.parse('{"label":"Port","key":"port","order":2,"type":"string","data":["TEXAS CITY"]}');
    component.headerClick(columnData);

    expect(component.sortChange.emit).toHaveBeenCalled();
  });

  it('given isScrollable property is called then call should go to function and return boolean', () => {
    const spy = spyOnProperty(component, 'isScrollable', 'get').and.callThrough();

    expect(typeof component.isScrollable).toBe('boolean');
    expect(typeof component.isSmallView).toBe('boolean');
    expect(spy).toHaveBeenCalled();
  });

  it('given handleCellClick function is called then call should go to function ', () => {
    spyOn<any>(component.cellClick, 'emit');
    const evt = {cell: new TableCellComponent(null, null, null), rowData: component.rows};
    component.handleCellClick(evt);

    expect(component.cellClick.emit).toHaveBeenCalled();
  });

   it('given processedRows property is called & data is not available then call should go to function and return object without values', () => {
    component.rows = [];
    fixture.detectChanges();
    const spy = spyOnProperty(component, 'processedRows', 'get').and.callThrough();

    expect(component.processedRows.length).toEqual(0);
    expect(spy).toHaveBeenCalled();
  });

  it('Given #processedRows property is called and column is null in sort object then it should return data object', () => {
    component.sort = {
      column: null,
      order: SortType.NONE
    };
    fixture.detectChanges();
    const spy = spyOnProperty(component, 'processedRows', 'get').and.callThrough();

    expect(typeof component.processedRows).toEqual('object');
    expect(spy).toHaveBeenCalled();
  });

  it('Given Component is resized to mobile view then component should load', () => {
    window.dispatchEvent(new Event('resize'));
    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('given processedRows property is called and data is not there then call should go to function and return object', () => {
    component.rows = null;

    const spy = spyOnProperty(component, 'processedRows', 'get').and.callThrough();

    expect(typeof component.processedRows).toEqual('object');
    expect(spy).toHaveBeenCalled();
  });
});

describe('TableComponent 2', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let mockWindowResizeService: MockWindowResizeService;

  beforeEach(async(() => {
    mockWindowResizeService = new MockWindowResizeService();

    TestBed.configureTestingModule({
      declarations: [TableComponent, TableRowComponent, TableCellComponent],
      imports: [IconModule, HttpClientModule],
      providers: [
        { provide: WindowResizeService, useClass: MockWindowResizeService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    // tslint:disable-next-line: max-line-length
    component.rows = JSON.parse('[{"label":"Transaction #","key":"transactionNumber","order":0,"type":"number","isLink":true},{"label":"Account","key":"customerName","order":1,"type":"string"},{"label":"Vessel #","key":"vessel","order":1,"type":"string"},{"label":"Port","key":"portName","order":2,"type":"string"},{"label":"Grade","key":"grade","order":3,"type":"string"},{"label":"Sales Executive","key":"salesExecutiveName","order":4,"type":"string"},{"label":"ETA","key":"eta","order":5,"type":"string"},{"label":"Status","key":"status","order":6,"type":"string"}]');
    component.columns = component.rows;
    component.config = null;

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should load table component when all dependencies are loaded', () => {
    expect(component).toBeTruthy();
  });
});
