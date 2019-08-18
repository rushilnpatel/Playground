import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TableCellCustomComponent } from '../table-cell-custom/table-cell-custom.component';
import { formatBytes } from '../../tools/format/format-data';
import {ComponentType} from '../../configuration/portal/portal.types';

@Component({
  selector: 'wfc-table-cell-custom-file-size',
  templateUrl: './table-cell-custom-file-size.component.html',
  styleUrls: ['./table-cell-custom-file-size.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellCustomFileSizeComponent extends TableCellCustomComponent {

  constructor(public changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  getInstanceOf(): ComponentType<any> {
    return TableCellCustomFileSizeComponent;
  }

  fileSize(cellData: any) {

    if (cellData === null || cellData === undefined) { // We can't use just !cellData because it can be 0
      return '';
    }

    return formatBytes(cellData);
  }

  matchSearchText(dataFormatted: any[], searchTextValue: string): boolean {
    return this.fileSize(dataFormatted).toLowerCase().includes(searchTextValue);
  }
}
