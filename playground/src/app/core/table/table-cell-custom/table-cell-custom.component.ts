import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ITableCellCustomData } from '../table.types';
import {ComponentType} from '../../configuration/portal/portal.types';

@Component({
  selector: 'wfc-table-cell-custom',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellCustomComponent {

  protected dataValue: ITableCellCustomData;

  @Input()
  id: string;

  @Input()
  get data(): ITableCellCustomData {
    return this.dataValue;
  }

  set data(value: ITableCellCustomData) {
    this.dataValue = value;
    this._changeDetectorRef.detectChanges();
  }

  @Input()
  parentElement: ElementRef;

  @Output()
  action: EventEmitter<any> = new EventEmitter();

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
  }

  getInstanceOf(): ComponentType<any> {
    return TableCellCustomComponent;
  }
}
