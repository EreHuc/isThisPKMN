import memoize from './memoize';
import selector from './selector';
import connect from './connect';

/**
 * Mocked store
 * @param {object} initialState
 * @returns {{getState: (function(): {}), dispatch: dispatch, setState: setState}}
 */
const createStore = (initialState = {}) => {
  let state = { ...initialState };

  return {
    getState: () => ({ ...state }),
    setState: newState => {
      state = newState;
    },
    dispatch: function(...props) {
      // eslint-disable-next-line no-console
      console.log(...props);
      // console.log('\033[31mdispatch:\033[0m', ...props)
    },
  };
};

const initialState = {
  a: 'e',
  b: 'b',
  c: 'c',
  d: 'd',
  e: 'e',
};

const store = createStore(initialState);

function toBeConnected({ isEqual, selectedKey, dispatchFromStore }) {
  dispatchFromStore(`${selectedKey} is ${isEqual ? '' : 'not'} equal to e`);
}

const isEqualESelector = selector(
  [(state, { selectedKey }) => state[selectedKey], state => state.e],
  (selectedKey, e) => ({ isEqual: selectedKey === e }),
);

const isConnected = connect(
  isEqualESelector,
  dispatch => ({ dispatchFromStore: (...props) => dispatch(...props) }),
)(toBeConnected);

function useMemoContext() {
  let a = 1;
  const func = memoize(a => {
    return a * a * a;
  });

  // eslint-disable-next-line no-console
  console.log(func(a));
  // eslint-disable-next-line no-console,no-console
  console.log(func(a));
  // eslint-disable-next-line no-console,no-console
  console.log(func(a));
  a = 2;
  // eslint-disable-next-line no-console,no-console
  console.log(func(a));
  // eslint-disable-next-line no-console,no-console
  console.log(func(a));
  // eslint-disable-next-line no-console
  console.log(func(a));
}

isConnected({ selectedKey: 'a' });
isConnected({ selectedKey: 'a' });
isConnected({ selectedKey: 'e' });
isConnected({ selectedKey: 'e' });
isConnected({ selectedKey: 'e' });
isConnected({ selectedKey: 'b' });
isConnected({ selectedKey: 'b' });
store.setState({
  ...initialState,
  e: 'b',
});
isConnected({ selectedKey: 'b' });
isConnected({ selectedKey: 'b' });

useMemoContext();
