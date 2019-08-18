import { deepMerge, deepClone, convertToCSV } from './object';

describe('deepMerge function', () => {
  it('Given that deepMerge function is called then with multiple objects then it should return object with merged data', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 4, c: 5 };
    // let a = deepMerge(target, source);

    expect(typeof deepMerge(target, source)).toBe('object');
  });

  it('Given that deepMerge function is called then with multiple objects with objects in it then it should return object with merged data', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 4, c: 5, d: {e: '5'} };
    // let a = deepMerge(target, source);

    expect(typeof deepMerge(target, source)).toBe('object');
  });
});

describe('deepClone function', () => {
  it('Given that deepClone function is called with object Then it should return cloned object', () => {
    const target = { a: 1, b: 2 };

    expect(typeof deepClone(target)).toBe('object');
  });

  it('Given that deepClone function is called with undefined Then it should return blank object', () => {
    const target = undefined;

    expect(typeof deepClone(target)).toBe('object');
  });
});

describe('convertToCSV function', () => {
  it('Given that convertToCSV function is called with object Then it should return cloned object', () => {
    const target = [ 'a', 1, 'b', 2 ];

    expect(typeof convertToCSV(target)).toBe('string');
  });

  it('Given that convertToCSV function is called with undefined Then it should return blank object', () => {
    const target = ['a', 1, 'b', 2];

    expect(typeof convertToCSV(target)).toBe('string');
  });

  it('Given that convertToCSV function is called with undefined Then it should return blank object', () => {
    const target = ['a', [2, 3, [4, 5, 6]], 3];

    expect(typeof convertToCSV(target)).toBe('string');
  });
});
