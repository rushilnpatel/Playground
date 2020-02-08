import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { ErrorInlineComponent } from './error-inline.component';

@NgModule({
  declarations: [ErrorInlineComponent],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [ErrorInlineComponent]
})
export class ErrorInlineModule { }
