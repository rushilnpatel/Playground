import { MenuTriggerDirective } from './menu-trigger.directive';
import { MenuComponent } from './menu.component';
import { NgZone } from '@angular/core';

xdescribe('MenuTriggerDirective', () => {
  it('should create an instance and call the directive', () => {
    let ngZone = new NgZone(null);
    const directive = new MenuTriggerDirective(null, ngZone);

    expect(directive).toBeTruthy();
  });

  it('Given that #ngAfterContentInit function is invoked then call should go to the function', () => {
    let ngZone = new NgZone(null);
    const directive = new MenuTriggerDirective(null, ngZone);
    directive.menu = new MenuComponent(null, null, null, null);
    const spy = spyOn<any>(directive, '_checkMenu');

    directive.ngAfterContentInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Given that #ngAfterContentInit function is invoked and menu is not available then call should go to the function', () => {
    let ngZone = new NgZone(null);
    const directive = new MenuTriggerDirective(null, ngZone);

    directive.menu = null;
    spyOn<any>(directive, '_checkMenu').and.callThrough();

    expect(function () { directive.ngAfterContentInit(); }).toThrowError('MenuTriggerFor: must pass in an menu instance.');
  });
});
