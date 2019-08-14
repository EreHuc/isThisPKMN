/* eslint-disable prettier/prettier */
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';

const composeEnhancers =
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      serialize: { options: false },
    })
    : compose;

const middleware = [];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

export default {
  ...store,
  get state() {
    return this.getState();
  }
};

export * from './actions';
export * from './selectors';
