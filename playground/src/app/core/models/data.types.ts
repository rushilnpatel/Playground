
export enum SortType {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
  NONE = 'none'
}

export interface IKeyValue {
  [key: string]: string | number;
}

export interface IKeyValueLabel {
  label: string;
  key: string;
  value: any;
}

export interface IFilterKeyValueLabel extends IKeyValueLabel {
  isCustom: boolean;
}
