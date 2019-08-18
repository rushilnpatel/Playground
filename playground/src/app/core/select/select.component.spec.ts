import { HttpClientModule } from '@angular/common/http';
import { MenuItemComponent } from './../menu/menu-item.component';
import { IconModule } from './../icon/icon.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent, MenuItemComponent],
      imports: [IconModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;

    component.items = JSON.parse('[{"text":"Jet Blue Airways","value":"jetblue"},{"text":"Test 2","value":"test2"},{"text":"Test 3","value":"test3"}]');
    fixture.detectChanges();
  });

  it('Given that all dpenedencies are there then Select component should load', () => {
    expect(component).toBeTruthy();
  });

  it('Given open property is called then call should go to function and return false', () => {
    const spyOpen = spyOnProperty(component, 'open').and.callThrough();

    expect(component.open).toBeFalsy();
    expect(spyOpen).toHaveBeenCalled();
  });

  it('Given selectedItem property is called then call should go to function ', () => {
    component.items = JSON.parse('[{"id":32949,"value":108550,"text":"ROYAL CARIBBEAN CRUISES MIA","status":"A"}]');
    const spySel = spyOnProperty(component, 'selectedItem').and.callThrough();

    expect(component.selectedItem.text).toEqual(jasmine.any(String));
    expect(component.selectedItem.value).toEqual(jasmine.any(Number));
    expect(spySel).toHaveBeenCalled();
  });

  it('Given we have data for dropdown Items then it should load dropdown', () => {
    // tslint:disable-next-line: max-line-length
    component.items = JSON.parse('[{"id":100,"value":"0","text":"ALL","status":"A"},{"id":36528,"value":132884,"text":"NORDIC TANKERS TRADING AS","status":"A"},{"id":103767,"value":285384,"text":"NORDIC THERESA K/S","status":"A"}]');
    component.ngAfterContentInit();

    expect(component.items.length).toBeGreaterThan(0);
  });

  it('Given #toggleopen function is invoked then it should call #toggleopen function', () => {
    spyOn(component, 'toggleOpen').and.callThrough();
    component.toggleOpen();
    expect(component.toggleOpen).toHaveBeenCalled();
  });

  it('Given #close function is invoked then it should call #close function', () => {
    spyOn(component, 'close').and.callThrough();
    component.close();
    expect(component.close).toHaveBeenCalled();
  });

  it('Given Dropdown Selectbox is clicked then a click handler should exist', () => {
    const item = JSON.parse('{"id":36528,"value":132884,"text":"NORDIC TANKERS TRADING AS","status":"A"}');
    const evt = jasmine.createSpyObj('e', ['preventDefault', 'stopImmediatePropagation']);
    const spy = spyOn(component, 'handleItemClick').and.callThrough();
    component.handleItemClick(evt, item);

    expect(spy).toHaveBeenCalled();
  });

  it('Given that select box is clicked then it should invoke onClick function', () => {
    const evt = jasmine.createSpyObj('e', ['preventDefault']);
    const spy = spyOn(component, 'onClick').and.callThrough();
    component.onClick(evt);

    expect(spy).toHaveBeenCalled();
    expect(component.open).toBeTruthy();
  });
});
