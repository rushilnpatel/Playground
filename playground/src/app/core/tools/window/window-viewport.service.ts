import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WindowViewportService {

  /** Cached document client rectangle. */
  private _documentRect?: ClientRect;

  constructor(@Inject(DOCUMENT) private _document: Document) {
    // Initially cache the document rectangle.
    this._cacheViewportGeometry();
  }

  /** Gets a ClientRect for the viewport's bounds. */
  getViewportRect(documentRect = this._documentRect): ClientRect {
    // Use the document element's bounding rect rather than the window scroll properties
    // (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
    // properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
    // conceptual viewports. Under most circumstances these viewports are equivalent, but they
    // can disagree when the page is pinch-zoomed (on devices that support touch).
    // See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
    // We use the documentElement instead of the body because, by default (without a css reset)
    // browsers typically give the document body an 8px margin, which is not included in
    // getBoundingClientRect().
    const scrollPosition = this.getViewportScrollPosition(documentRect);
    const height = window.innerHeight;
    const width = window.innerWidth;

    return {
      top: scrollPosition.top,
      left: scrollPosition.left,
      bottom: scrollPosition.top + height,
      right: scrollPosition.left + width,
      height,
      width
    };
  }

  /** Gets the (top, left) scroll position of the viewport. */
  getViewportScrollPosition(documentRect = this._documentRect) {
    // The top-left-corner of the viewport is determined by the scroll position of the document
    // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
    // whether `document.body` or `document.documentElement` is the scrolled element, so reading
    // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
    // `document.documentElement` works consistently, where the `top` and `left` values will
    // equal negative the scroll position.
    const top = -documentRect.top || this._document.body.scrollTop || window.scrollY || 0;
    const left = -documentRect.left || this._document.body.scrollLeft || window.scrollX || 0;

    return { top, left };
  }

  /** Caches the latest client rectangle of the document element. */
  private _cacheViewportGeometry() {
    this._documentRect = this._document.documentElement.getBoundingClientRect();
  }
}
