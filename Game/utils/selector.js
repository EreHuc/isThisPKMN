import memoize from './memoize';

/**
 * Create selector method
 * @param {Function} memoizedFn
 * @param {*} memoizedOptions
 * @returns {function(...[Function]): Function}
 */
function createSelector(memoizedFn, ...memoizedOptions) {
  return function(...funcs) {
    const resultFunc = funcs.pop();
    const dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

    const memoizedResultFunc = memoizedFn(function() {
      return resultFunc.apply(null, arguments);
    }, ...memoizedOptions);

    return memoizedFn(function() {
      const params = dependencies.reduce((acc, dep) => {
        acc.push(dep.apply(null, arguments));
        return acc;
      }, []);

      return memoizedResultFunc.apply(null, params);
    });
  };
}

export default createSelector(memoize);
