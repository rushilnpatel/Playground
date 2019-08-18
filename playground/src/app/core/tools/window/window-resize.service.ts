import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { auditTime } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WindowResizeService {

  _resize: Subject<number> = new Subject<number>();

  constructor() {
    fromEvent(window, 'resize').subscribe(() => this._windowResize());
    this._windowResize();
  }

  private _windowResize() {
    this._resize.next(this.getBreakpoint);
  }

  get getBreakpoint() {
    const breakpoints = (environment.breakpoints as number[]).filter(breakpoint => breakpoint <= window.innerWidth);
    return breakpoints.indexOf(breakpoints[breakpoints.length - 1]);
  }

  windowResize(auditTimeInMs: number = 100): Observable<number> {
    // In the case of a 0ms delay, return the observable without auditTime since it does add
    // a perceptible delay in processing overhead.
    if (auditTimeInMs === 0) {
      return this._resize.asObservable();
    }

    return this._resize.asObservable().pipe(auditTime(auditTimeInMs));
  }
}
