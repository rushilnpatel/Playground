import { AfterContentInit, Directive, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';
import { MenuComponent } from './menu.component';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
// tslint:disable-next-line: directive-selector
  selector: '[menuTriggerFor]',
  exportAs: 'menuTriggerFor'
})
export class MenuTriggerDirective implements AfterContentInit, OnDestroy {

  private _clickSub: Subscription;

  constructor(private _elementRef: ElementRef, private _ngZone: NgZone) {
  }

  /** References the menu instance that the trigger is associated with. */
  @Input('menuTriggerFor')
  menu: MenuComponent;

  ngAfterContentInit() {
    this._checkMenu();
    this.menu.triggerElement = this._elementRef;

    this._ngZone.runOutsideAngular(() => {
      this._clickSub = fromEvent(this._elementRef.nativeElement, 'click')
        .subscribe((event: Event) => {
          // event.preventDefault();
          this.menu.toggleOpen();
        });
    });
  }

  ngOnDestroy() {
    this._clickSub.unsubscribe();
  }

  /**
   * This method checks that a valid instance of Menu has been passed into
   * menuTriggerFor. If not, an exception is thrown.
   */
  private _checkMenu() {
    if (!this.menu) {
      throw Error(`MenuTriggerFor: must pass in an menu instance.`);
    }
  }
}


