import { memoize } from '../../../Game/utils';

describe('memoize file', () => {
  describe('memoize fn', () => {
    const funcToMemo = jest.fn();

    beforeEach(() => {
      funcToMemo.mockReset();
    });

    it('should exec memoize func at the beginning', () => {
      const memoizedFunc = memoize(funcToMemo);

      memoizedFunc(1, 2);

      expect(funcToMemo).toHaveBeenCalledWith(1, 2);
    });

    it('should exec memoize func only one time', () => {
      const memoizedFunc = memoize(funcToMemo);

      memoizedFunc(1, 2);
      memoizedFunc(1, 2);
      memoizedFunc(1, 2);

      expect(funcToMemo).toHaveBeenCalledTimes(1);
    });

    it('should exec memoize func multiple time', () => {
      const memoizedFunc = memoize(funcToMemo);

      memoizedFunc(1, 2);
      memoizedFunc(1, 2);

      expect(funcToMemo).toHaveBeenCalledWith(1, 2);
      expect(funcToMemo).toHaveBeenCalledTimes(1);

      memoizedFunc([2, 2]);
      expect(funcToMemo).toHaveBeenCalledWith([2, 2]);
      expect(funcToMemo).toHaveBeenCalledTimes(2);

      memoizedFunc({});
      memoizedFunc({});
      memoizedFunc({});
      expect(funcToMemo).toHaveBeenCalledWith({});
      expect(funcToMemo).toHaveBeenCalledTimes(3);
    });
  });
});
