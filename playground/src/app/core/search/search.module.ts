import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
