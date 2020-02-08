import { TestBed } from '@angular/core/testing';

import { FormatDataService } from './format-data.service';
import { TableDataType } from '../../table/table.types';

describe('TransformDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormatDataService = TestBed.get(FormatDataService);
    expect(service).toBeTruthy();
  });

  it('Given #transform Function is called with Numbers Then Call should go to function', () => {
    const service: FormatDataService = TestBed.get(FormatDataService);
    expect(service.transform(TableDataType.NUMBER, '1.2-2' , [1, 2, 2.5])).toBeTruthy();
  });

  it('Given #transform Function is called with Decimal Numbers Then Call should go to function and return formatted decimal', () => {
    const service: FormatDataService = TestBed.get(FormatDataService);
    expect(service.transform(TableDataType.NUMBER, '1.2-2', 2.5)).toBe('2.50');
  });

  it('Given #transform Function is called with null but type as Integer Numbers Then Call should go to function and return formatted decimal', () => {
    const service: FormatDataService = TestBed.get(FormatDataService);
    expect(service.transform(TableDataType.NUMBER, '1.2-2', 1)).toBe('1.00');
  });

  it('Given #transform Function is called with CURRENCY Then Call should go to function', () => {
    const service: FormatDataService = TestBed.get(FormatDataService);
    expect(service.transform(TableDataType.CURRENCY, '1.2-2', 'USD')).toBeTruthy();
  });

  it('Given #transform Function is called with Array of CURRENCY Then Call should go to function', () => {
    const service: FormatDataService = TestBed.get(FormatDataService);
    expect(service.transform(TableDataType.CURRENCY, '1.2-2', ['USD', 'INR'])).toBeTruthy();
  });

  it('Given #transform Function is called with Date Then Call should go to function', () => {
    const service: FormatDataService = TestBed.get(FormatDataService);
    expect(service.transform(TableDataType.DATE, 'short', ['2019-09-09', '2020-01-01'])).toBeTruthy();
  });
});
