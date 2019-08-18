import { Pipe, PipeTransform } from '@angular/core';
import {formatNumber} from '../format/format-data';

/*
 * Convert big numbers into the abbreviation.
 * Usage:
 *   number | fileSize:decimals
 * Example:
 *   {{ 13568 | numberAbbreviation:1 }}
 *   formats to: 13.5K
 */
@Pipe({
  name: 'numberAbbreviation'
})

export class NumberAbbreviation implements PipeTransform {
  transform(value: number, decimals: number = 1): string {
    return formatNumber(value, decimals);
  }
}
