import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellCustomArrayComponent } from './table-cell-custom-array.component';

describe('TableCellCustomArrayComponent', () => {
  let component: TableCellCustomArrayComponent;
  let fixture: ComponentFixture<TableCellCustomArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCellCustomArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellCustomArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TableCellCustomArrayComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Given #getInstanceOf function is called then function should call and should return instance of component', () => {
    expect(component.getInstanceOf()).toBeTruthy();
  });

  it('Given #matchSearchText is called then call should go to function and should return boolean if string matches it should return true', () => {
    expect(component.matchSearchText([['status', 'ACTIVE'], ['secondaryStatus', '']], 'ac')).toBeTruthy();
    expect(typeof component.matchSearchText([['status', 'ACTIVE'], ['secondaryStatus', '']], 'Act')).toBe('boolean');
  });

  it('Given #matchSearchText is called then call should go to function and should return boolean if string doesnot matches it should return false', () => {
    expect(component.matchSearchText([['status', 'ACTIVE'], ['secondaryStatus', '']], 'offer')).toBeFalsy();
    expect(typeof component.matchSearchText([['status', 'ACTIVE'], ['secondaryStatus', '']], 'Act')).toBe('boolean');
  });

  it('Given #getSortValue is called then call should go to function and should return first key name', () => {
    expect(component.getSortValue(['status', 'secondaryStatus'])).toBe('status');
  });

  it('Given #matchFilter is called then call should go to function and should return boolean', () => {
    expect(typeof component.matchFilter([['status', 'ACTIVE'], ['secondaryStatus', '']], ['Act'])).toBe('boolean');
  });

  it('Given #getExportCVSString is called then call should go to function and should return string instead of array', () => {
    expect(typeof component.getExportCVSString([['status', 'ACTIVE'], ['secondaryStatus', '']])).toBe('string');
  });
});
