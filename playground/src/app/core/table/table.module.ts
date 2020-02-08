import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableRowComponent } from './table-row/table-row.component';
import { TableCellComponent } from './table-cell/table-cell.component';
import { IconModule } from '../icon/icon.module';
import { TableCellCustomDirective } from './table-cell-custom/table-cell-custom.directive';
import { TableCellCustomComponent } from './table-cell-custom/table-cell-custom.component';
import { PortalModule } from '../configuration/portal/portal.module';

@NgModule({
  declarations: [TableComponent, TableRowComponent, TableCellComponent, TableCellCustomDirective, TableCellCustomComponent],
  imports: [
    CommonModule,
    IconModule,
    PortalModule
  ],
  exports: [TableComponent, TableCellCustomDirective]
})
export class TableModule {
}
