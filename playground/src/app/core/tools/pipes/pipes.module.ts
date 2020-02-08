import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FillPipe} from './fill.pipe';
import {GroupByPipe} from './group-by.pipe';
import {NumberAbbreviation} from './number-abbreviation.pipe';
import {FileSizePipe} from './file-size.pipe';
import {QueryStringPipe} from './query-string.pipe';

@NgModule({
  declarations: [
    FillPipe,
    GroupByPipe,
    NumberAbbreviation,
    QueryStringPipe,
    FileSizePipe
  ],
  imports: [CommonModule],
  exports: [
    FillPipe,
    GroupByPipe,
    NumberAbbreviation,
    QueryStringPipe,
    FileSizePipe
  ]
})
export class PipesModule {
}
