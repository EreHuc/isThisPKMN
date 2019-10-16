/**
 * check deep object equality between a and b
 * @param {object} a
 * @param {object} b
 * @returns {boolean}
 */
export function objectEquality(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * check function equality between a and b
 * @param {Function} a
 * @param {Function} b
 * @returns {boolean}
 */
export function functionEquality(a, b) {
  return a.toString() === b.toString();
}

/**
 * check equality between a and b
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
export function basicEquality(a, b) {
  const typeA = typeof a;
  const typeB = typeof b;

  if (typeA !== typeB) {
    return false;
  }

  switch (typeA) {
    case 'object':
      return objectEquality(a, b);
    case 'function':
      return functionEquality(a, b);
    default:
      return a === b;
  }
}

/**
 * Check if next arguments in function have change
 * @param {[*]} prev - previous arguments
 * @param {[*]} current - current arguments
 * @param {Function} equalityFn - equality function
 * @returns {boolean}
 */
export function isArgumentsEquals(prev, current, equalityFn = basicEquality) {
  if (prev === null || current === null || prev.length !== current.length) {
    return false;
  }

  const length = prev.length;

  for (let i = 0; i < length; i++) {
    if (!equalityFn(prev[i], current[i])) {
      return false;
    }
  }

  return true;
}

/**
 * Memoize function utils
 * @param {Function} func - function to memoize
 * @param {?Function} equalityFn - equality function
 * @returns {function(): *}
 */
export default function memoize(func, equalityFn = basicEquality) {
  let lastResult = null;
  let lastArgs = null;

  return function() {
    if (!isArgumentsEquals(lastArgs, arguments, equalityFn)) {
      lastResult = func.apply(null, arguments);
      // console.log('\033[37m memoization:\033[0m', ...arguments);
    }

    lastArgs = arguments;
    return lastResult;
  };
}
