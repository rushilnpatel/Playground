import { IKeyValueLabel } from '../models/data.types';
import { ICalendarSelection } from '../calendar/calendar.types';

export enum FilterDataType {
  CURRENCY = 'currency',
  CUSTOM = 'custom',
  DATE = 'date',
  DATEPICKER = 'datepicker',
  NUMBER = 'number',
  STRING = 'string'
}

export interface IFilterDataGroup {
  checked?: boolean;
  config?: any;
  countItems?: boolean;
  customComponent?: any;
  customComponentId?: string;
  format?: string;
  items?: IFilterDataItem[];
  itemsToShow?: IFilterDataItem[];
  key?: string;
  label: string;
  length?: number;
  order: number;
  type?: FilterDataType;
}

export interface IFilterDataItem {
  checked?: boolean;
  config?: any;
  customComponent?: any;
  label?: string;
  type: FilterDataType;
  value?: string;
}

export interface IFilterData {
  filterCount: number;
  noDataText: string;
  rows: any[];
  selectedFilters: IKeyValueLabel[];
}

export interface IFilterDateSelection {
  calendarSelection: ICalendarSelection;
  dateFormat: string;
  key: string;
  label: string;
  rangeSelection: boolean;
}

export interface IFilterConfig {
  andFiltering?: boolean;
  filters: IFilterDataGroup[];
  noDataText?: string;
  noResultsText?: string;
  trimOptions?: boolean | number;
}

export interface IFilterChangeEvent {
  appliedFilters: {
    [key: string]: string[];
  };
  count: {
    totalRows: number;
    totalFilteredRows: number;
  };
  filteredRows: any[];
}
