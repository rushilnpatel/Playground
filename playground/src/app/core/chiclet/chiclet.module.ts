import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChicletComponent } from './chiclet.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [ChicletComponent],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [ChicletComponent]
})
export class ChicletModule {
}
