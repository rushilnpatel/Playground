import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input, OnDestroy,
  Output,
  QueryList,
  Renderer2
} from '@angular/core';
import { MenuItemComponent } from './menu-item.component';
import { IMenuItem } from './menu.types';
import { fromEvent, Subscription } from 'rxjs';
import { MenuService } from './menu.service';
import { PositionService } from '../tools/position/position.service';
import { PositionTypes } from '../tools/position/position.types';

@Component({
  selector: '[wfc-menu]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterContentInit, OnDestroy {

  private _open = false;
  private _subscriptions: Subscription[] = [];

  triggerElement: ElementRef;

  @ContentChildren(MenuItemComponent)
  contentItems: QueryList<MenuItemComponent>;

  @Input()
  items: IMenuItem[] = [];

  @Input()
  closeSiblings = true;

  @Input()
  parentElementToFit: ElementRef;

  @Output()
  itemClicked: EventEmitter<IMenuItem> = new EventEmitter();

  constructor(private _elementRef: ElementRef,
              public renderer: Renderer2,
              private _menuService: MenuService,
              private _positionService: PositionService) {
  }

  ngAfterContentInit() {

    this.contentItems.map((element: MenuItemComponent) => {
      this.items = [...this.items, {
        text: element.text,
        value: element.value,
        icon: element.icon
      }];
    });

    this._checkItemsValue();

    // We close the menu if the user click outside the menu
    this._subscriptions = [...this._subscriptions, fromEvent(document, 'click')
      .subscribe((event: any) => {

        const targetElement = event.target;

        const needToClose = !this._elementRef.nativeElement.contains(targetElement)
          && targetElement !== this.triggerElement.nativeElement
          && !this.triggerElement.nativeElement.contains(targetElement)
          && this.open;

        if (needToClose) {
          this.close();
        }
      })];

    // If the user click in another menu we close all the menus that are open in the
    // screen if it's needed. This happens if a menu with the property closeSiblings is true (that is the default)
    this._subscriptions = [...this._subscriptions, this._menuService.onCloseAllMenus()
      .subscribe(() => this.close())];
  }

  ngOnDestroy() {
    this._subscriptions.map(sub => sub.unsubscribe());
  }

  get open() {
    return this._open;
  }

  private _addOrRemoveClass() {

    const openClassName = 'open';

    if (this.open) {
      this.renderer.addClass(this.triggerElement.nativeElement, openClassName);
      this.renderer.addClass(this._elementRef.nativeElement, openClassName);
      this._positionService.setQuadrantPosition(this.renderer, this._elementRef, this.parentElementToFit);
    } else {
      this.renderer.removeClass(this.triggerElement.nativeElement, openClassName);
      this.renderer.removeClass(this._elementRef.nativeElement, openClassName);
    }
  }

  toggleOpen() {

    if (!this._open && this.closeSiblings) {
      this._menuService.emitCloseAllMenus();
    }

    this._open = !this._open;
    this._addOrRemoveClass();
  }

  close() {
    this._open = false;
    this._addOrRemoveClass();
  }

  /**
   * This method checks that all the menu items has a value
   * If not, an exception is thrown.
   */
  private _checkItemsValue() {
    this.items.map((menuItem: IMenuItem) => {
      if (!menuItem.value) {
        throw new Error(`MenuItem: must have a value.`);
      }
    });
  }

  handleItemClick(event: MouseEvent, item: IMenuItem) {
    this.itemClicked.emit(item);
  }
}
