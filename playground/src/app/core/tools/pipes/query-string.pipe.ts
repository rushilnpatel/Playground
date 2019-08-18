import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'queryString'
})
export class QueryStringPipe implements PipeTransform {
  transform(params: any, name: string = 'filters' ) {
    let obj = {};
    obj[name] = this._combineString(params);
    return(obj);
  }

  private _combineString(params) {
    const keys = Object.keys(params);
    let stringVal = '';

    keys.forEach((key) => {
      if (params[key] !== undefined || null) stringVal += `${key}:${params[key]},`;
    });

    return stringVal.slice(0, -1);
  }
}
