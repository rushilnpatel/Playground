import { ComponentRef, Injectable, OnDestroy } from '@angular/core';
import { OverlayComponent } from '../overlay/overlay.component';
import { Subscription } from 'rxjs';
import { OverlayService } from '../overlay/overlay.service';
import { LoadingIndicatorComponent } from './loading-indicator.component';
import { ComponentPortal } from '../configuration/portal/portal';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService implements OnDestroy {

  private _open = false;
  private _portal: ComponentRef<LoadingIndicatorComponent>;
  private _overlayRef: OverlayComponent;
  private _subscription: Subscription[] = [];

  constructor(private _overlayService: OverlayService) { }

  show() {

    if (this._open) {
      return;
    }

    this._open = true;

    this._overlayRef = this._overlayService.createOverlay(false, true);
    this._portal = this._overlayRef.portalHost.attachComponentPortal(new ComponentPortal(LoadingIndicatorComponent, null));
  }

  hide() {

    if (this._portal) {
      this._portal.destroy();
    }

    if (this._overlayRef) {
      this._overlayService.disposeOverlay(this._overlayRef);
    }

    this._open = false;
  }

  ngOnDestroy() {

    if (this._portal) {
      this._portal.destroy();
    }

    if (this._overlayRef) {
      this._overlayService.disposeOverlay(this._overlayRef);
    }

    this._subscription.map(sub => sub.unsubscribe());
  }

  get isOpen() {
    return this._open;
  }
}
