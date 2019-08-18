import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { IconModule } from '../icon/icon.module';
import { MenuModule } from '../menu/menu.module';

@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule,
    IconModule,
    MenuModule
  ],
  exports: [SelectComponent]
})
export class SelectModule {
}
