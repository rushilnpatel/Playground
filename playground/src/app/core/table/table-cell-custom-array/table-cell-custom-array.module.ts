import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '../../configuration/portal/portal.module';
import { TableCellCustomArrayComponent } from './table-cell-custom-array.component';

@NgModule({
  declarations: [TableCellCustomArrayComponent],
  imports: [
    CommonModule,
    PortalModule
  ],
  exports: [TableCellCustomArrayComponent],
  entryComponents: [TableCellCustomArrayComponent]
})
export class TableCellCustomArrayModule {
}
