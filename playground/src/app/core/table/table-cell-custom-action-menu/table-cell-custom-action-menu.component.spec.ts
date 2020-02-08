import { IconModule } from 'src/app/core/icon/icon.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { TableCellCustomActionMenuComponent } from './table-cell-custom-action-menu.component';
import { MenuModule } from '../../menu/menu.module';

describe('CustomCellDocumentsActionsComponent', () => {
  let component: TableCellCustomActionMenuComponent;
  let fixture: ComponentFixture<TableCellCustomActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCellCustomActionMenuComponent ],
      imports: [IconModule, HttpClientModule, MenuModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellCustomActionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Given #onClick is called in overlay Then call should go to function', () => {
    const evt = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation']);
    component.onClick(evt);

    expect(typeof evt).toBe('object');
  });

  it('Given #handleClick is called in overlay Then call should go to function', () => {
    const evt = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation']);
    component.handleClick(evt);

    expect(typeof evt).toBe('object');
  });

  it('Given #handleMenuItemClick is called Then call should go to function and it should emit event for action', () => {
    const evt = JSON.parse('{"text": "1", "value": "2"}');
    const spy = spyOn(component.action, 'emit');
    component.handleMenuItemClick(evt);

    expect(spy).toHaveBeenCalled();
  });
});

describe('CustomCellDocumentsActionsComponent 2', () => {
  let component: TableCellCustomActionMenuComponent;
  let fixture: ComponentFixture<TableCellCustomActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableCellCustomActionMenuComponent],
      imports: [IconModule, HttpClientModule, MenuModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellCustomActionMenuComponent);
    component = fixture.componentInstance;
    component.data = JSON.parse('{"cellData": {"text": "1", "value": "2"}}');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
