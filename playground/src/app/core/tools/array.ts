import { TableDataType } from '../table/table.types';
import { FilterDataType } from '../filter/filter.types';

export function compareDataType(a, b, columnType: TableDataType | FilterDataType): number {

  // a = a || '';
  // b = b || '';

  if (Array.isArray(a)) {
    a = a[0];
  }

  if (Array.isArray(b)) {
    b = b[0];
  }

  // equal items sort equally
  if (a === b) {
    return 0;
  }

  // we move null and undefined at the beginning
  if (a === null || a === undefined) {
    return -1;
  }

  // we move null and undefined at the beginning
  if (b === null || b === undefined) {
    return 1;
  }

  if (columnType === TableDataType.NUMBER || columnType === TableDataType.CURRENCY) {

    a = parseFloat(a);
    b = parseFloat(b);

    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }
  }

  if (columnType === TableDataType.STRING) {

    if (a !== undefined) {
      a = a.toString().toLowerCase();
    }

    if (b !== undefined) {
      b = b.toString().toLowerCase();
    }

    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }
  }

  if (columnType === TableDataType.DATE) {

    if (typeof a !== 'object') {
      a = new Date(a);
    }

    if (typeof b !== 'object') {
      b = new Date(b);
    }

    return a.getTime() - b.getTime();
  }

  return 0;
}

export function unique(elements: any[]) {
  return elements.filter((value, index, self) => self.indexOf(value) === index);
}

export function addOrRemove(elements: any[], value: string): any[] {
  return elements.indexOf(value) < 0 ? [...elements, value] : elements.filter(el => el !== value);
}
