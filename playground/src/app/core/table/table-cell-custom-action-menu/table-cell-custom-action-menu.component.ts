import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input } from '@angular/core';
import { TableCellCustomComponent } from '../table-cell-custom/table-cell-custom.component';
import { IMenuItem } from '../../menu/menu.types';
import { ITableCellCustomData } from '../table.types';
import {ComponentType} from '../../configuration/portal/portal.types';

@Component({
  selector: 'wfc-table-cell-custom-action-menu',
  templateUrl: './table-cell-custom-action-menu.component.html',
  styleUrls: ['./table-cell-custom-action-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellCustomActionMenuComponent extends TableCellCustomComponent {

  menuUserItems: IMenuItem[] = [];

  @Input()
  set data(value: ITableCellCustomData) {
    if (value.isHeader) {
      for (let extraData of value.columnData.customCellExtraData) {
        this.menuUserItems = [...this.menuUserItems, {
          text: extraData.text,
          value: extraData.value
        }];
      }
    } else {
      this.menuUserItems = [{
        text: value.cellData['text'],
        value: value.cellData['value']
      }];
    }

    this.changeDetectorRef.detectChanges();
  }

  // There is a refresh in the table when the user
  // Click in a custom cell. So this prevent the refresh
  // TODO: Fix this in the future
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.stopPropagation();
  }

  constructor(public changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  getInstanceOf(): ComponentType<any> {
    return TableCellCustomActionMenuComponent;
  }

  handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleMenuItemClick(event: IMenuItem) {
    this.action.emit(event.value);
  }
}
