import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [PaginatorComponent]
})
export class PaginatorModule { }
