import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      serialize: { options: false },
    })
    : compose;

const middleware = [];

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);
