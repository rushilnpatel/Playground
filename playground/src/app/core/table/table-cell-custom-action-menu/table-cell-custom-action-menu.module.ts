import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCellCustomActionMenuComponent } from './table-cell-custom-action-menu.component';
import { IconModule } from '../../icon/icon.module';
import { MenuModule } from '../../menu/menu.module';

@NgModule({
  declarations: [TableCellCustomActionMenuComponent],
  imports: [
    CommonModule,
    IconModule,
    MenuModule
  ],
  exports: [TableCellCustomActionMenuComponent],
  entryComponents: [TableCellCustomActionMenuComponent]
})
export class TableCellCustomActionMenuModule { }
