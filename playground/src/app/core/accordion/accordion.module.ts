import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { AccordionComponent } from './accordion.component';

@NgModule({
  declarations: [AccordionComponent],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [AccordionComponent]
})
export class AccordionModule {
}
