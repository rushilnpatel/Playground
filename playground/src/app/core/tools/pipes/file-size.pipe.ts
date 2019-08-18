import { Pipe, PipeTransform } from '@angular/core';
import {formatBytes} from '../format/format-data';

/*
   * Convert bytes into largest possible unit.
   * Usage:
   *   bytes | fileSize:decimals
   * Example:
   *   {{ 13568 |  fileSize:1 }}
   *   formats to: 13.25 KB
   */

@Pipe({
  name: 'fileSize'
})

export class FileSizePipe implements PipeTransform {
  transform (bytes: any, decimals: any = 1): string {
    return formatBytes(bytes, decimals);
  }
}
