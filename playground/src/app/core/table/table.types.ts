import { TableCellComponent } from './table-cell/table-cell.component';
import { SortType } from '../models/data.types';

export enum TableDataType {
  CURRENCY = 'currency',
  DATE = 'date',
  NONE = 'none',
  NUMBER = 'number',
  STRING = 'string'
}

export enum TableCellAlign {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface ITableColumn {
  alignText?: TableCellAlign;
  customCellExtraData?: any; // Used to pass specific data to the custom cell. Useful for example for a custom header cell.
  customCellId?: string;
  customHeaderCellId?: string;
  excludeFromExport?: boolean; // When we have a custom cell with no text and we want to exclude the column from the export.
  format?: any;
  isLink?: boolean;
  key: string;
  label: string;
  order: number;
  type?: TableDataType;
}

export interface ITableSort {
  column: number;
  order: SortType;
}

export interface ITableConfig {
  columns: ITableColumn[];
  sort?: ITableSort;
  scrollable?: boolean;
}

export interface ITableCellClickEvent {
  cell: TableCellComponent;
  rowData: any[];
}

export interface ITableCellCustomData {
  cellData: any | any[];
  columnData: ITableColumn;
  isHeader: boolean;
  rawRows: any[];
}
