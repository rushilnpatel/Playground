import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay.component';
import { PortalModule } from '../configuration/portal/portal.module';

@NgModule({
  declarations: [OverlayComponent],
  imports: [
    CommonModule,
    PortalModule
  ],
  exports: [OverlayComponent],
  entryComponents: [OverlayComponent]
})
export class OverlayModule { }
