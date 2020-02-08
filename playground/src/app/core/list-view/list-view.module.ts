import { IconModule } from 'src/app/core/icon/icon.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewComponent } from './list-view.component';
import { SearchModule } from '../search/search.module';
import { ChicletModule } from '../chiclet/chiclet.module';
import { FilterModule } from '../filter/filter.module';
import { TableModule } from '../table/table.module';
import { PaginatorModule } from '../paginator/paginator.module';
import { ErrorInlineModule } from '../error-inline/error-inline.module';

@NgModule({
  declarations: [ListViewComponent],
  imports: [
    CommonModule,
    SearchModule,
    ChicletModule,
    FilterModule,
    TableModule,
    IconModule,
    ErrorInlineModule,
    PaginatorModule,
  ],
  exports: [ListViewComponent]
})
export class ListViewModule { }
