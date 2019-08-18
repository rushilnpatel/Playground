import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from './loading-indicator.component';
import { OverlayModule } from '../overlay/overlay.module';

@NgModule({
  declarations: [LoadingIndicatorComponent],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [LoadingIndicatorComponent],
  entryComponents: [LoadingIndicatorComponent]
})
export class LoadingIndicatorModule { }
