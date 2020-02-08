import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TableCellCustomComponent } from '../table-cell-custom/table-cell-custom.component';
import {ComponentType} from '../../configuration/portal/portal.types';

@Component({
  selector: 'wfc-table-cell-custom-array',
  templateUrl: './table-cell-custom-array.component.html',
  styleUrls: ['./table-cell-custom-array.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellCustomArrayComponent extends TableCellCustomComponent {

  constructor(public changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  getInstanceOf(): ComponentType<any> {
    return TableCellCustomArrayComponent;
  }

  /**
   * This function is optional. If it's omitted the filter will handle the data as string or string[]
   * When a check box is checked this function says if the row should be included
   * or not in the result based on the selectedFilterValues array.
   */
  matchFilter(data: any[], selectedFilterValues: string[]): boolean {
    return data.some(r => selectedFilterValues.includes(r));
  }

  /**
   * This function is optional. If it's omitted the filter will handle the data as string or string[]
   * When the user type something in the search text field this function says if the row should be included
   * or not in the result based on the searchTextValue.
   * The values in data are already formatted as it was specified in the table column configuration
   */
  matchSearchText(dataFormatted: any[], searchTextValue: string): boolean {
    return dataFormatted.map(d => d.toString().trim().toLowerCase()).join(' ').includes(searchTextValue);

    /** Example if we just want to search in the second element of the array
     * return dataFormatted[1] && dataFormatted[1].toString().trim().toLowerCase().includes(searchTextValue);
     */
  }

  /**
   * This function is optional. If it's omitted the filter will handle the data as string or string[]
   * This is the value that the sorting of the table is going to use to sort.
   * As this is an array we say to the table to sort for the value of the first element of the array.
   */
  getSortValue(data: any[]): any {
    return data[0];
  }

  /**
   * This function is optional. If it's omitted the filter will handle the data as string or string[]
   * This is the value that will be exported as a CVS value.
   * For example: ["red", "blue", "yellow"] should be exported as an string: "red,blue,yellow"
   */
  getExportCVSString(data: any[]): string {
    return data.join(',');
  }
}
