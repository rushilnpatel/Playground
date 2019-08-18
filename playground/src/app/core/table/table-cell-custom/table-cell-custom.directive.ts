import { AfterContentInit, Directive, Host, Input, Self } from '@angular/core';
import {ListViewComponent} from '../../list-view/list-view.component';
import {TableCellCustomComponent} from './table-cell-custom.component';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[customTableCell]'
})
export class TableCellCustomDirective implements AfterContentInit {

  private _customCells: TableCellCustomComponent[] = [];

  /** References the custom filters instances. */
  @Input('customTableCell')
  get customCells(): TableCellCustomComponent | TableCellCustomComponent[] {
    return this._customCells;
  }

  set customCells(value: TableCellCustomComponent | TableCellCustomComponent[]) {

    if (value && !Array.isArray(value)) {
      this._customCells = [value];
      return;
    }

    this._customCells = (value as TableCellCustomComponent[]);
  }

  constructor(@Host() @Self() private _listViewComponent: ListViewComponent) {
  }

  ngAfterContentInit() {
    this._listViewComponent.customTableCellComponents = (this.customCells as TableCellCustomComponent[]);
  }
}
