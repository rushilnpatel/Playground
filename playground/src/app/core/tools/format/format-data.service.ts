import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { TableDataType } from '../../table/table.types';
import { formatCurrency, formatDate, formatNumber } from '@angular/common';
import * as ObjectTools from '../object';

@Injectable({
  providedIn: 'root'
})

// todo: lets adjust this
export class FormatDataService {

  constructor(@Inject(LOCALE_ID) private _locale) {
  }

  transform(type: TableDataType, format: any, value: any): any | any[] {

    if (value === undefined || value === null) {
      return '';
    }

    switch (type) {

      case TableDataType.DATE:

        if (Array.isArray(value)) {
          return value.map(v => formatDate(v, format || 'short', this._locale));
        }

        return formatDate(value, format, this._locale);

      case TableDataType.NUMBER:

        if (Array.isArray(value)) {
          return value.map(v => formatNumber(v, this._locale, format));
        }

        return formatNumber(value, this._locale, format);

      case TableDataType.CURRENCY:

        const currencyDefault = {
          currency: '$',
          currencyCode: 'USD',
          digitsInfo: '1.2-2'
        };

        format = ObjectTools.deepMerge({ ...currencyDefault }, format);

        if (Array.isArray(value)) {
          return value.map(v => formatCurrency(v, this._locale, format.currency, format.currencyCode, format.digitsInfo));
        }

        return formatCurrency(value, this._locale, format.currency, format.currencyCode, format.digitsInfo);

      default:
        return value;
    }
  }
}
