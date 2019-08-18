import { HttpClientModule } from '@angular/common/http';
import { IconModule } from './../icon/icon.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemComponent } from './menu-item.component';
import { MenuComponent } from './menu.component';

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuItemComponent],
      imports: [IconModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;

    component.icon = 'icon-dashboard';
    component.text = 'Dashboard';
    fixture.detectChanges();
  });

  it('Given that all dpenedencies are there then Menu item component should load', () => {
    expect(component).toBeTruthy();
  });

  it('text-param should be a string', () => {
    expect(typeof component.text).toEqual(jasmine.any(String));
  });

  it('icon-param should be a string', () => {
    expect(typeof component.icon).toEqual(jasmine.any(String));
  });

  it('Given that menu is clicked then it should invoke onClick function', () => {
    const evt = jasmine.createSpyObj('e', ['preventDefault']);
    const spy = spyOn(component, 'onClick').and.callThrough();
    component.onClick(evt);

    expect(spy).toHaveBeenCalled();
  });

  it('Given that menu is clicked then it should invoke onClick function considering triggered from Parent menu component', () => {
    component.parent = new MenuComponent(null, null, null, null);

    const evt = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation']);
    const spy = spyOn(component.parent, 'close');
    component.onClick(evt);

    expect(spy).toHaveBeenCalled();
  });
});
