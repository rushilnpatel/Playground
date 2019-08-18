import {compareDataType, unique, addOrRemove} from './array';
import { TableDataType } from '../table/table.types';

describe('compareDataType function', () => {
  it('Given that compareDataType function is called then with value as blank then it should return false', () => {
    expect(compareDataType('', '', TableDataType.STRING)).toBeFalsy();
  });

  it('Given that compareDataType function is called then with value(string) as Arrays then it should return Negative', () => {
    const a = ['a', 'b', 'c', 'd'];
    const b = ['x', 'y', 'z'];

    expect(compareDataType(a, b, TableDataType.STRING)).toBeLessThan(0);
  });
  it('Given that compareDataType function is called then with value(string) as Arrays then it should return Negative', () => {
    const a = ['x', 'y', 'z'];
    const b = ['a', 'b', 'c', 'd'];

    expect(compareDataType(a, b, TableDataType.STRING)).toBeGreaterThan(0);
  });

  it('Given that compareDataType function is called then with value as Number then it should return Negative', () => {
    const a = 10;
    const b = 20.22;

    expect(compareDataType(a, b, TableDataType.NUMBER)).toBeLessThan(0);
  });

  it('Given that compareDataType function is called then with value as Number then it should return Negative', () => {
    const a = 40;
    const b = 20.22;

    expect(compareDataType(a, b, TableDataType.NUMBER)).toBeGreaterThan(0);
  });

  it('Given that compareDataType function is called then with value as Number and datatype as none then it should return Negative', () => {
    const a = 40;
    const b = 20.22;

    expect(compareDataType(a, b, TableDataType.NONE)).toBeFalsy();
  });

  it('Given that compareDataType function is called then with value as Date and datatype as Date then it should return Negative', () => {
    const a = '2012/02/02';
    const b = '2012/05/02';

    expect(compareDataType(a, b, TableDataType.DATE)).toBeLessThan(0);
  });

  it('Given that compareDataType function is called then with value as Date and datatype as Date then it should return Positive', () => {
    const a = '2012/05/02';
    const b = '2012/01/02';

    expect(compareDataType(a, b, TableDataType.DATE)).toBeGreaterThan(0);
  });

  it('Given that compareDataType function is called with first param as null Then it should return -1', () => {
    expect(typeof compareDataType(null, '', TableDataType.STRING)).toBe('number');
  });

  it('Given that compareDataType function is called with first param as undefined Then it should return -1', () => {
    expect(typeof compareDataType(undefined, '', TableDataType.STRING)).toBe('number');
  });

  it('Given that compareDataType function is called with second param as null Then it should return -1', () => {
    expect(typeof compareDataType('2012/05/02', null, TableDataType.STRING)).toBe('number');
  });

  it('Given that compareDataType function is called with second param as undefined Then it should return -1', () => {
    expect(typeof compareDataType('2012/05/02', undefined, TableDataType.STRING)).toBe('number');
  });
});

describe('unique Function', () => {
  it('Given that unique function is called then it should filter duplicate values from the array', () => {
    const arrayVal = [1, 2, 3, 2, 4, 5, 6, 7, 2, 3, 4, 98];
    const filteredArray = [1, 2, 3, 4, 5, 6, 7, 98];
    expect(unique(arrayVal).length).toEqual(8);

    expect(unique(arrayVal)).toEqual(filteredArray);
  });
});

describe('addOrRemove function', () => {
  it('Given that addOrRemove function is called with new value then it should add second passed parameter in first passed array in the function', () => {
    const arrayVal = [1, 2, 3, 98];
    const testString = 'this is test';

    const newArray = [1, 2, 3, 98, 'this is test'];
    // let b = addOrRemove(arrayVal, testString);

    expect(addOrRemove(arrayVal, testString).length).toBe(5);
    expect(addOrRemove(arrayVal, testString)).toEqual(newArray);
  });

  it('Given that addOrRemove function is called with existing value then it should remove second passed parameter from first passed array in the function', () => {
    const arrayVal = ['a', 'b', 'c', 'd'];
    const testNumber = 'b';

    const newArray = ['a', 'c', 'd'];

    expect(addOrRemove(arrayVal, testNumber).length).toBe(3);
    expect(addOrRemove(arrayVal, testNumber)).toEqual(newArray);
  });
});
