import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';

const composeEnhancers =
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'undefined'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      serialize: { options: false },
    });

const middleware = [];

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);
