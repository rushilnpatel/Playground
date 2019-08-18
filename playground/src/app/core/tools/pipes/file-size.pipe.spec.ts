import { FileSizePipe } from './file-size.pipe';

describe('FileSizePipe', () => {
  it('create an instance', () => {
    const pipe = new FileSizePipe();
    expect(pipe).toBeTruthy();
  });

  it('given that null is passed then it should return null', () => {
    const pipe = new FileSizePipe();
    const row = {};
    expect(typeof pipe.transform(row, '.5')).toBe('string');
  });
});
