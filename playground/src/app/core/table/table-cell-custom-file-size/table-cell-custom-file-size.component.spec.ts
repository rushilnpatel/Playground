import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellCustomFileSizeComponent } from './table-cell-custom-file-size.component';

describe('TableCellCustomFileSizeComponent', () => {
  let component: TableCellCustomFileSizeComponent;
  let fixture: ComponentFixture<TableCellCustomFileSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCellCustomFileSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellCustomFileSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Given #getInstanceOf function is called then function should call and should return instance of component', () => {
    expect(component.getInstanceOf()).toBeTruthy();
  });

  it('Given #matchSearchText is called then call should go to function and should return boolean if string matches it should return true', () => {
    expect(typeof component.matchSearchText([['status', 'ACTIVE'], ['secondaryStatus', '']], 'Act')).toBe('boolean');
  });
});
