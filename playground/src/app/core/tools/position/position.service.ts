import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { WindowViewportService } from '../window/window-viewport.service';
import { PositionTypes } from './position.types';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private _windowViewportService: WindowViewportService) {
  }

  setQuadrantPosition(renderer: Renderer2, elementRef: ElementRef, viewportElementRef?: ElementRef): PositionTypes {

    const viewportRect = viewportElementRef ? viewportElementRef.nativeElement.getBoundingClientRect() : this._windowViewportService.getViewportRect();

    const { nativeElement } = elementRef;

    renderer.setStyle(nativeElement, 'visibility', 'hidden');

    this._removePositionClasses(renderer, nativeElement);

    renderer.addClass(nativeElement, 'left');
    renderer.addClass(nativeElement, 'bottom');

    if (this._isOutOfViewport(nativeElement.getBoundingClientRect(), viewportRect).all) {
      renderer.removeStyle(nativeElement, 'visibility');
      return PositionTypes.LEFTBOTTOM;
    }

    this._removePositionClasses(renderer, nativeElement);

    renderer.addClass(nativeElement, 'left');
    renderer.addClass(nativeElement, 'top');

    if (this._isOutOfViewport(nativeElement.getBoundingClientRect(), viewportRect).all) {
      renderer.removeStyle(nativeElement, 'visibility');
      return PositionTypes.LEFTTOP;
    }

    this._removePositionClasses(renderer, nativeElement);

    renderer.addClass(nativeElement, 'right');
    renderer.addClass(nativeElement, 'bottom');

    if (this._isOutOfViewport(nativeElement.getBoundingClientRect(), viewportRect).all) {
      renderer.removeStyle(nativeElement, 'visibility');
      return PositionTypes.RIGHTBOTTOM;
    }

    this._removePositionClasses(renderer, nativeElement);

    renderer.addClass(nativeElement, 'right');
    renderer.addClass(nativeElement, 'top');

    if (this._isOutOfViewport(nativeElement.getBoundingClientRect(), viewportRect).all) {
      renderer.removeStyle(nativeElement, 'visibility');
      return PositionTypes.RIGHTTOP;
    }

    this._removePositionClasses(renderer, nativeElement);

    renderer.addClass(nativeElement, 'left');
    renderer.addClass(nativeElement, 'bottom');
    renderer.removeStyle(nativeElement, 'visibility');

    return PositionTypes.LEFTBOTTOM;
  }

  private _isOutOfViewport (elementRect, viewportRect) {

    // Check if it's out of the viewport on each side
    let out: any = {};

    out.top = elementRect.top > viewportRect.top;
    out.left = elementRect.left > viewportRect.left;
    out.bottom = elementRect.bottom < viewportRect.bottom;
    out.right = elementRect.right < viewportRect.right;
    out.any = out.top || out.left || out.bottom || out.right;
    out.all = out.top && out.left && out.bottom && out.right;

    return out;
  }

  private _removePositionClasses(renderer, nativeElement) {
    renderer.removeClass(nativeElement, 'left');
    renderer.removeClass(nativeElement, 'right');
    renderer.removeClass(nativeElement, 'bottom');
    renderer.removeClass(nativeElement, 'top');
  }
}
