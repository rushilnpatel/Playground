import { IconModule } from '../icon/icon.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item.component';


describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent, MenuItemComponent],
      imports: [IconModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('Given that all dpenedencies are there then Menu component should load', () => {
    expect(component).toBeTruthy();
  });

  it('Given open property is called then call should go to function and return fasle', () => {
    const spy = spyOnProperty(component, 'open').and.callThrough();

    expect(component.open).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  it('Given #toggleopen function is invoked then it should call #toggleopen function', () => {
    const spy = spyOn<any>(component, '_addOrRemoveClass');
    component.toggleOpen();

    expect(spy).toHaveBeenCalled();
  });

  it('Given #close function is invoked then it should call #close function', () => {
    const spy = spyOn<any>(component, '_addOrRemoveClass');
    component.close();
    expect(spy).toHaveBeenCalled();
  });

  it('Given a menu item is clicked then handleItemClick function should be called and do the functionality', () => {
    const spy = spyOn(component.itemClicked, 'emit').and.callThrough();

    const evt = JSON.parse('{"isTrusted":true,"__zone_symbol__propagationStopped":true}');
    const item = JSON.parse('{ "text": "Dashboard", "value": "/dashboard", "icon": "icon-dashboard" }');
    component.handleItemClick(evt, item);

    expect(spy).toHaveBeenCalled();
  });

  it('Given we have data for Menu Items then it should match the interface MenuItemComponent', () => {
    // tslint:disable-next-line: max-line-length
    component.items = JSON.parse('[{ "text": "Dashboard", "value": "/dashboard", "icon": "icon-dashboard" }]');

    component.ngAfterContentInit();

    expect(component.items[0].text).toEqual(jasmine.any(String));
    expect(component.items[0].value).toEqual(jasmine.any(String));
    expect(component.items[0].icon).toEqual(jasmine.any(String));
  });

  it('Given we have data for Menu Items then it should load the menu Items', () => {
    // tslint:disable-next-line: max-line-length
    component.items = JSON.parse('[{ "text": "Dashboard", "value": "/dashboard", "icon": "icon-dashboard" }, { "text": "My Orders", "value": "/myorders", "icon": "icon-fuel-order" }]');
    component.ngAfterContentInit();

    expect(component.items.length).toBeGreaterThan(0);
  });

  it('Given we dont have data for Menu Items then it should throw error', async() => {
    component.items = JSON.parse('[{}]');

    expect(function () {
      component.ngAfterContentInit();
    }).toThrowError(`MenuItem: must have a value.`);
  });
});
