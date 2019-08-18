import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellCustomComponent } from './table-cell-custom.component';

describe('TableCustomCellComponent', () => {
  let component: TableCellCustomComponent;
  let fixture: ComponentFixture<TableCellCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCellCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellCustomComponent);
    component = fixture.componentInstance;

    component.data = { cellData: '', columnData: { key: 'test', label: 'test', order: 2}, isHeader: false, rawRows: []};
    fixture.detectChanges();
  });

  it('should create TableCustomCellComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Given #getInstanceOf function is called then function should call and should return instance of component', () => {
    expect(component.getInstanceOf()).toBeTruthy();
  });
});
