import { store } from '../store';
import { drawMap } from './draw';

function _animation(store, drawMap) {
  const start = () => {
    drawMap();

    store.subscribe(() => {
      drawMap();
    });
  };

  return {
    start,
  };
}

export const animation = _animation(store, drawMap);
