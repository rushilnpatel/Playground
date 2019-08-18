import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _closeAllMenus$: Subject<any> = new Subject();

  // Emit this to close all the menus in the screen
  emitCloseAllMenus() {
    this._closeAllMenus$.next();
  }

  // Listen this to catch the event above
  onCloseAllMenus() {
    return this._closeAllMenus$.asObservable();
  }
}
