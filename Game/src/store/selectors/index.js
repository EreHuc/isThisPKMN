import store from '../';

export function createSelector(selector) {
  return () => selector(store.state);
}

export * from './player.selectors';
export * from './map.selectors';
export * from './images.selectors';
export * from './contexts.selectors';
