import { ComponentRef, Injectable } from '@angular/core';
import { OverlayComponent } from './overlay.component';
import { PortalService } from '../configuration/portal/portal.service';
import { ComponentPortal } from '../configuration/portal/portal';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  private _overlayInstances: OverlayComponent[] = [];
  private _portal: ComponentRef<OverlayComponent>;

  constructor(private _portalService: PortalService) {
  }

  createOverlay(transparent = false, centerContent = false): OverlayComponent {

    this._portal = this._portalService.attachComponentPortal(
      new ComponentPortal(OverlayComponent, this._portalService.viewContainerRef));

    this._portal.instance.transparent = transparent;
    this._portal.instance.centerContent = centerContent;

    this._overlayInstances = [...this._overlayInstances, this._portal.instance];

    const last: OverlayComponent = this._overlayInstances[this._overlayInstances.length - 1];

    last.zIndex = this._overlayInstances.length + 100;
    last.portal = this._portal;

    return this._portal.instance;
  }

  disposeOverlay(overlayRef: OverlayComponent) {

    let index: number = this._overlayInstances.indexOf(overlayRef);

    if (index > -1) {
      this._overlayInstances[index].portal.destroy();
      this._overlayInstances[index] = null;
      this._overlayInstances.splice(index, 1);
    }
  }
}
