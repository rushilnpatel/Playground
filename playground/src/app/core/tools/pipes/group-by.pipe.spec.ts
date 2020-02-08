import { GroupByPipe } from './group-by.pipe';

describe('GroupByPipe', () => {
  const pipe = new GroupByPipe();

  it('create an instance of GroupByPipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('given that null is passed then it should return null', () => {
    const row = null;
    expect(pipe.transform(row, 'port')).toBeNull();
  });

  it('given that Data is passed with grouped property then it should return data object in grouping', () => {
    // tslint:disable-next-line: max-line-length
    const row = JSON.parse('[{"port":"a","grade":"b","spec":"d","eta":"","etd":"","minQuantity":"","maxQuantity":"","units":"","comments":""}, {"port":"a","grade":"a","spec":"b","eta":"","etd":"","minQuantity":"","maxQuantity":"","units":"","comments":""}, {"port":"a","grade":"a","spec":"c","eta":"","etd":"","minQuantity":"","maxQuantity":"","units":"","comments":""}]');
    expect(typeof pipe.transform(row, 'port')).toBe('object');
  });
});
