import { HttpClientModule } from '@angular/common/http';
import { IconModule } from '../../icon/icon.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellComponent } from './table-cell.component';

describe('TableCellComponent', () => {
  let component: TableCellComponent;
  let fixture: ComponentFixture<TableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCellComponent ],
      imports: [IconModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellComponent);
    component = fixture.componentInstance;

    component.column = JSON.parse('{"label":"ICAO/IATA","key":"locationCodes","order":0,"isLink":true,"type":"string"}');
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create TableCellComponent', () => {
    expect(component).toBeTruthy();
  });

  it('given canSort property is called then call should go to function and return Boolean', () => {
    const spy = spyOnProperty(component, 'canSort', 'get').and.callThrough();

    expect(typeof component.canSort).toEqual('boolean');
    expect(spy).toHaveBeenCalled();
  });

  it('given #handleHeaderCellClick function is invoked then it should emit', () => {
    spyOn(component.headerCellClick, 'emit');

    const evt = jasmine.createSpyObj('e', ['preventDefault']);
    component.handleHeaderCellClick(evt);

    expect(component.headerCellClick.emit).toHaveBeenCalled();
  });

  it('given #handleCellClick function is invoked then it should emit', () => {
    spyOn(component.cellClick, 'emit');

    const evt = jasmine.createSpyObj('e', ['preventDefault']);
    const row = JSON.parse('[3067684,"NORDIC AQUA/9800116",["TEXAS CITY"],["380CST"],"Jacob, Tina Elizabeth",["2019-04-16T04:00:00.000+0000"],"ACTIVE"]');
    component.handleCellClick(evt, row);

    expect(component.cellClick.emit).toHaveBeenCalled();
  });
});
