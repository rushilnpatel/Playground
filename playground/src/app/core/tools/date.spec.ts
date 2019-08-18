import { removeTime, convertToDate, monthDiff, YYYYMMDDToDate   } from './date';

describe('removeTime function', () => {
  it('Call made to #removeTime with date then it should return date object', () => {
    expect(typeof removeTime(new Date('2/2/2019'))).toBe('object');
  });

  it('Given #removeTime with null as a parameter then it should return null', () => {
    expect(removeTime(null)).toBeNull();
  });

  it('Given #removeTime with undefined as a parameter then it should return null', () => {
    expect(removeTime(undefined)).toBeNull();
  });
});

describe('convertToDate function', () => {
  it('Call made to #convertToDate with number then it should return date object', () => {
    expect(typeof convertToDate('2012/02/02')).toBe('object');
  });

  it('Call made to #convertToDate with undefined then it should return date object', () => {
    expect(convertToDate(undefined)).toBeNull();
  });

  it('Call made to #convertToDate with null then it should return date object', () => {
    expect(convertToDate(null)).toBeNull();
  });

  it('Call made to #convertToDate with null then it should return date object', () => {
    expect(typeof convertToDate(new Date('2/2/2019'))).toBe('object');
  });
});

describe('monthDiff function', () => {
  it('Call made to #monthDiff with 2 date and include current month as false then it should return date object', () => {
    expect(typeof monthDiff(new Date('2/2/2019'), new Date('2/5/2019'), false)).toBe('number');
  });

  it('Call made to #monthDiff with 2 date and include current month as true then it should return date object', () => {
    expect(typeof monthDiff(new Date('2/5/2019'), new Date('2/2/2019'))).toBe('number');
  });
});

describe('YYYYMMDDToDate function', () => {
  it('Call made to #YYYYMMDDToDate with date and include current month as false then it should return date object', () => {
    expect(typeof YYYYMMDDToDate('2/2/2019')).toBe('object');
  });

  it('Call made to #YYYYMMDDToDate with null then it should return null', () => {
    expect(YYYYMMDDToDate(null)).toBeNull();
  });

  it('Call made to #YYYYMMDDToDate with undefined then it should return null', () => {
    expect(YYYYMMDDToDate(undefined)).toBeNull();
  });
});
