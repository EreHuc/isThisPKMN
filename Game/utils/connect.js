import memoize from './memoize';
import store from '../src/store';

/**
 * Create connect method
 * @param {Function} memoizeFn
 * @param {*} memoizedOptions
 * @returns {function(Function, Function): function(Function): Function}
 */
function connectCreator(memoizeFn, ...memoizedOptions) {
  return function(mapStateToProps, mapDispatchToProps) {
    const memoizedMapStateToProps = memoizeFn(function() {
      return mapStateToProps.apply(null, arguments);
    }, ...memoizedOptions);

    const memoizedMapDispatchToProps = memoizeFn(function() {
      return mapDispatchToProps.apply(null, arguments);
    }, ...memoizedOptions);

    return function(func) {
      return function(ownProps) {
        func.apply(null, [
          {
            ...ownProps,
            ...memoizedMapStateToProps(store.getState(), ownProps),
            ...memoizedMapDispatchToProps(store.dispatch),
          },
        ]);
      };
    };
  };
}

export default connectCreator(memoize);
