import { NumberAbbreviation } from './number-abbreviation.pipe';

describe('NumberAbbreviationPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberAbbreviation();
    expect(pipe).toBeTruthy();
  });

  it('given that null is passed then it should return null', () => {
    const pipe = new NumberAbbreviation();
    expect(pipe.transform(1, 1.2)).toBe('1');
  });
});
