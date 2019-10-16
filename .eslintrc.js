module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    jest: true,
    node: true,
  },
  'plugins': ['prettier'],
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'prettier/prettier': 'error',
    'indent': [
      'error',
      2,
      { 'SwitchCase': 1 }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'no-var': 'error',
    'prefer-const': [
      'error',
      {
        'destructuring': 'any',
        'ignoreReadBeforeAssign': false
      }
    ],
    'prefer-arrow-callback': ['error', {'allowUnboundThis': false}]
  }
};
