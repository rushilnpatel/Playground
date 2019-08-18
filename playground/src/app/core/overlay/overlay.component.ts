import { AfterViewInit, Component, ComponentRef, ElementRef, HostBinding, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PortalHostDirective } from '../configuration/portal/portal.directive';

@Component({
  selector: 'wcf-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements AfterViewInit {

  private _overlayMouseClick$: Subject<any> = new Subject();

  zIndex = 1;
  portal: ComponentRef<OverlayComponent>;

  /** The portal host inside of this container into which the overlay content will be loaded. */
  @ViewChild(PortalHostDirective, {static: false})
  portalHost: PortalHostDirective;

  @HostBinding('style.zIndex')
  get styleZIndex() {
    return this.zIndex;
  }

  @Input()
  transparent = false;

  @Input()
  centerContent = false;

  @HostBinding('class.overlay')
  get classOverlay() {
    return !this.transparent;
  }

  @HostBinding('class.center')
  get classCenterContent() {
    return this.centerContent;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this._overlayMouseClick$.next(this);
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._renderer.addClass(this._elementRef.nativeElement, 'open');
    });
  }

  /**
   * Returns an observable that emits when the overlay has been clicked.
   */
  overlayMouseClick(): Observable<OverlayComponent> {
    return this._overlayMouseClick$.asObservable();
  }
}
