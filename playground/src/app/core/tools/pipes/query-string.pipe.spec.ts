import { QueryStringPipe } from './query-string.pipe';

describe('QueryStringPipe', () => {
  it('create an instance', () => {
    const pipe = new QueryStringPipe();
    expect(pipe).toBeTruthy();
  });

  it('given that null is passed then it should return null', () => {
    const pipe = new QueryStringPipe();
    const param = {'id': 5, 'status': 'Active'};
    expect(typeof pipe.transform(param)).toBe('object');
  });
});
